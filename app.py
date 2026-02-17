import os
import json
import uuid
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from huggingface_hub import HfApi

app = Flask(__name__, static_folder='static')
CORS(app)

# Configuration
HF_TOKEN = os.environ.get("HF_TOKEN")
REPO_ID = os.environ.get("HF_REPO_ID", "akashkumaravel/abweb")
DATA_FILE = "products.json"
UPLOAD_FOLDER = "static/uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Initialize Hugging Face API
api = HfApi()

def load_products():
    if os.path.exists(DATA_FILE):
        with open(DATA_FILE, "r") as f:
            return json.load(f)
    return []

def save_products(products):
    with open(DATA_FILE, "w") as f:
        json.dump(products, f, indent=2)
    
    # Sync products.json with Hugging Face Hub
    if HF_TOKEN:
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

def upload_image(file):
    if not file:
        return None
    
    filename = f"{uuid.uuid4()}_{file.filename}"
    filepath = os.path.join(UPLOAD_FOLDER, filename)
    file.save(filepath)
    
    # Sync image with Hugging Face Hub
    if HF_TOKEN:
        try:
            api.upload_file(
                path_or_fileobj=filepath,
                path_in_repo=filepath, # Keeps directory structure: static/uploads/filename
                repo_id=REPO_ID,
                repo_type="space",
                token=HF_TOKEN
            )
            print(f"Uploaded {filename} to Hugging Face Hub")
        except Exception as e:
            print(f"Failed to upload image: {e}")
            
    # Return the full URL for the image
    # In HF Spaces, relative URLs usually work if served correctly, but full URL is safer for external access
    # We'll use relative path for client to resolve against API base URL
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
        description = request.form.get("description")
        # Features come as a list of strings, but FormData sends them as individual entries or a single string?
        # Let's assume frontend sends a JSON string or we handle repeated keys
        features_json = request.form.get("features")
        features = json.loads(features_json) if features_json else []

        # Handle Image Upload
        image_file = request.files.get("image")
        image_url = request.form.get("image") # Fallback if URL provided
        
        if image_file:
            uploaded_url = upload_image(image_file)
            if uploaded_url:
                image_url = uploaded_url
        
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
        image_url = existing_product["image"] # Default to existing
        
        if image_file:
            uploaded_url = upload_image(image_file)
            if uploaded_url:
                image_url = uploaded_url
        elif request.form.get("image"): # If URL string passed
             image_url = request.form.get("image")

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
