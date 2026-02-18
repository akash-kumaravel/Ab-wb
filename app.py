import os
import json
import uuid
import base64
import requests
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from huggingface_hub import HfApi

app = Flask(__name__, static_folder='static')
CORS(app)

# Configuration
HF_TOKEN = os.environ.get("HF_TOKEN")
REPO_ID = os.environ.get("HF_REPO_ID", "akashkumaravel/abweb")
GITHUB_TOKEN = os.environ.get("GITHUB_TOKEN")
GITHUB_USERNAME = os.environ.get("GITHUB_USERNAME", "akash-kumaravel")
GITHUB_REPO_NAME = os.environ.get("GITHUB_REPO", "Ab-wb")
GITHUB_BRANCH = os.environ.get("GITHUB_BRANCH", "main")
GITHUB_REPO_FULL = f"{GITHUB_USERNAME}/{GITHUB_REPO_NAME}"

DATA_FILE = "products.json"
UPLOAD_FOLDER = "static/uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# GitHub API headers
GITHUB_API_HEADERS = {
    "Authorization": f"token {GITHUB_TOKEN}",
    "Accept": "application/vnd.github.v3+json"
} if GITHUB_TOKEN else {}

# Diagnostic logs
print(f"Server starting...")
print(f"Repo ID: {REPO_ID}")
if HF_TOKEN:
    print(f"HF_TOKEN found: {HF_TOKEN[:4]}...{HF_TOKEN[-4:]}")
else:
    print("WARNING: HF_TOKEN is not set!")

if GITHUB_TOKEN:
    print(f"GITHUB_TOKEN found: {GITHUB_TOKEN[:4]}...{GITHUB_TOKEN[-4:]}")
    print(f"GitHub Repo: {GITHUB_REPO_FULL} (Branch: {GITHUB_BRANCH})")
else:
    print("WARNING: GITHUB_TOKEN is not set! Changes will not be synced to GitHub.")

# Initialize Hugging Face API
api = HfApi()

def get_file_from_github(file_path):
    """Get file content and SHA from GitHub"""
    if not GITHUB_TOKEN:
        return None, None
    
    try:
        url = f"https://api.github.com/repos/{GITHUB_REPO_FULL}/contents/{file_path}?ref={GITHUB_BRANCH}"
        response = requests.get(url, headers=GITHUB_API_HEADERS, timeout=10)
        
        if response.status_code == 200:
            data = response.json()
            content = base64.b64decode(data['content']).decode('utf-8')
            return content, data['sha']
        elif response.status_code == 404:
            return None, None
        else:
            print(f"Error getting {file_path} from GitHub: {response.status_code}")
            return None, None
    except Exception as e:
        print(f"Failed to get {file_path} from GitHub: {e}")
        return None, None

def get_binary_file_from_github(file_path):
    """Get binary file (like images) from GitHub"""
    if not GITHUB_TOKEN:
        return None, None
    
    try:
        url = f"https://api.github.com/repos/{GITHUB_REPO_FULL}/contents/{file_path}?ref={GITHUB_BRANCH}"
        response = requests.get(url, headers=GITHUB_API_HEADERS, timeout=10)
        
        if response.status_code == 200:
            data = response.json()
            # For binary files, GitHub returns base64 encoded content
            content = base64.b64decode(data['content'])
            return content, data['sha']
        elif response.status_code == 404:
            return None, None
        else:
            print(f"Error getting binary file {file_path} from GitHub: {response.status_code}")
            return None, None
    except Exception as e:
        print(f"Failed to get binary file {file_path} from GitHub: {e}")
        return None, None

def sync_image_from_github(image_path):
    """Download image from GitHub if it doesn't exist locally"""
    try:
        # Check if file already exists locally
        if os.path.exists(image_path):
            return True
        
        # Try to download from GitHub
        if GITHUB_TOKEN:
            print(f"Downloading {image_path} from GitHub...")
            image_content, _ = get_binary_file_from_github(image_path)
            
            if image_content:
                # Create directory if needed
                os.makedirs(os.path.dirname(image_path), exist_ok=True)
                # Write the image file
                with open(image_path, "wb") as f:
                    f.write(image_content)
                print(f"Successfully synced {image_path} from GitHub")
                return True
        
        return False
    except Exception as e:
        print(f"Error syncing image from GitHub: {e}")
        return False

def push_file_to_github(file_path, content, commit_message):
    """Push file to GitHub using API"""
    if not GITHUB_TOKEN:
        print("GitHub token not set, skipping push")
        return False
    
    try:
        print(f"Pushing {file_path} to GitHub...")
        
        # Get current file SHA (if exists)
        _, sha = get_file_from_github(file_path)
        
        # Prepare request
        url = f"https://api.github.com/repos/{GITHUB_REPO_FULL}/contents/{file_path}"
        
        # For binary files (images), encode as base64
        if isinstance(content, bytes):
            file_content = base64.b64encode(content).decode('utf-8')
        else:
            file_content = base64.b64encode(content.encode('utf-8')).decode('utf-8')
        
        payload = {
            "message": commit_message,
            "content": file_content,
            "branch": GITHUB_BRANCH
        }
        
        # Include SHA if file exists (for update)
        if sha:
            payload["sha"] = sha
        
        response = requests.put(url, headers=GITHUB_API_HEADERS, json=payload, timeout=30)
        
        if response.status_code in [201, 200]:
            print(f"Successfully pushed {file_path} to GitHub")
            return True
        else:
            print(f"Failed to push {file_path}: {response.status_code} - {response.text}")
            return False
            
    except Exception as e:
        print(f"Error pushing to GitHub: {e}")
        return False

def load_products():
    """Load products from GitHub first, fallback to local"""
    # Try to load from GitHub
    if GITHUB_TOKEN:
        github_content, _ = get_file_from_github(DATA_FILE)
        if github_content:
            try:
                products = json.loads(github_content)
                
                # Sync all product images from GitHub
                print("Syncing product images from GitHub...")
                for product in products:
                    if "image" in product and product["image"].startswith("/static/uploads/"):
                        image_path = product["image"].lstrip("/")  # Remove leading slash
                        sync_image_from_github(image_path)
                
                return products
            except Exception as e:
                print(f"Error parsing products.json from GitHub: {e}")
    
    # Fallback to local file
    if os.path.exists(DATA_FILE):
        try:
            with open(DATA_FILE, "r") as f:
                return json.load(f)
        except Exception as e:
            print(f"Error loading local products.json: {e}")
    
    return []

# Sync images on startup
print("Syncing images from GitHub on startup...")
try:
    startup_products = load_products()
    print(f"Startup complete: Loaded {len(startup_products)} products")
except Exception as e:
    print(f"Error during startup sync: {e}")

def save_products(products):
    with open(DATA_FILE, "w") as f:
        json.dump(products, f, indent=2)
    
    # Sync products.json with GitHub
    with open(DATA_FILE, "r") as f:
        content = f.read()
    push_file_to_github(DATA_FILE, content, "Update products.json from server")
    
    # Sync products.json with Hugging Face Hub
    if HF_TOKEN:
        print(f"Syncing products.json to repo {REPO_ID}...")
        try:
            api.upload_file(
                path_or_fileobj=DATA_FILE,
                path_in_repo=DATA_FILE,
                repo_id=REPO_ID,
                repo_type="space",
                token=HF_TOKEN
            )
            print("Synced products.json with Hugging Face Hub")
        except Exception as e:
            print(f"Failed to sync products.json: {e}")
            import traceback
            traceback.print_exc()
    else:
        print("HF_TOKEN is not set, skipping sync to Hugging Face Hub.")

def upload_image(file):
    if not file:
        return None
    
    filename = f"{uuid.uuid4()}_{file.filename}"
    filepath = os.path.join(UPLOAD_FOLDER, filename)
    file.save(filepath)
    
    # Sync image with GitHub
    github_sync_path = filepath.replace("\\", "/")  # Normalize path for GitHub
    with open(filepath, "rb") as f:
        image_content = f.read()
    push_file_to_github(github_sync_path, image_content, f"Upload product image: {filename}")
    
    # Sync image with Hugging Face Hub
    if HF_TOKEN:
        try:
            api.upload_file(
                path_or_fileobj=filepath,
                path_in_repo=github_sync_path,
                repo_id=REPO_ID,
                repo_type="space",
                token=HF_TOKEN
            )
            print(f"Uploaded {filename} to Hugging Face Hub")
        except Exception as e:
            print(f"Failed to upload image to HF: {e}")
            
    # Return the full URL for the image
    return f"/static/uploads/{filename}"

@app.route("/")
def home():
    return "Server is running!"

@app.route("/api/products", methods=["GET"])
def get_products():
    products = load_products()
    return jsonify(products)

@app.route("/api/products", methods=["POST"])
def add_product():
    try:
        products = load_products()
        
        # Determine product ID
        new_id = max([p.get("id", 0) for p in products], default=0) + 1
        
        name = request.form.get("name")
        price = request.form.get("price")
        description = request.form.get("description", "")
        # Features come as a list of strings, but FormData sends them as individual entries or a single string?
        # Let's assume frontend sends a JSON string or we handle repeated keys
        features_json = request.form.get("features")
        features = json.loads(features_json) if features_json else []

        # Handle Image Upload
        image_file = request.files.get("image")
        image_url = request.form.get("image")  # Fallback if URL provided
        
        if image_file:
            uploaded_url = upload_image(image_file)
            if uploaded_url:
                image_url = uploaded_url
        
        # Provide default image if none provided
        if not image_url:
            image_url = "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80"
        
        if not name or not price:
             return jsonify({"error": "Name and price are required"}), 400

        new_product = {
            "id": new_id,
            "name": name,
            "price": price,
            "image": image_url,
            "description": description,
            "features": features
        }
            
        products.append(new_product)
        save_products(products)
        return jsonify(new_product), 201
    except Exception as e:
        print(f"Error adding product: {e}")
        return jsonify({"error": str(e)}), 500

@app.route("/api/products/<int:id>", methods=["PUT"])
def update_product(id):
    try:
        products = load_products()
        product_index = next((i for i, p in enumerate(products) if p["id"] == id), None)
        
        if product_index is None:
            return jsonify({"error": "Product not found"}), 404
            
        existing_product = products[product_index]
        
        # Get form data (use existing values if not provided)
        name = request.form.get("name", existing_product["name"])
        price = request.form.get("price", existing_product["price"])
        description = request.form.get("description", existing_product.get("description", ""))
        
        features_json = request.form.get("features")
        features = json.loads(features_json) if features_json else existing_product.get("features", [])

        # Handle Image
        image_file = request.files.get("image")
        image_url = existing_product["image"]  # Default to existing
        
        if image_file:
            uploaded_url = upload_image(image_file)
            if uploaded_url:
                image_url = uploaded_url
        elif request.form.get("image"):  # If URL string passed
             image_url = request.form.get("image")
        
        # Ensure image URL is always set
        if not image_url:
            image_url = "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80"

        updated_product = {
            **existing_product,
            "name": name,
            "price": price,
            "image": image_url,
            "description": description,
            "features": features
        }
        
        products[product_index] = updated_product
        save_products(products)
        return jsonify(updated_product)
    except Exception as e:
        print(f"Error updating product: {e}")
        return jsonify({"error": str(e)}), 500

@app.route("/api/products/<int:id>", methods=["DELETE"])
def delete_product(id):
    products = load_products()
    filtered_products = [p for p in products if p.get("id") != id]
    
    if len(products) == len(filtered_products):
        return jsonify({"error": "Product not found"}), 404
        
    save_products(filtered_products)
    return jsonify({"message": "Product deleted"})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=7860)
