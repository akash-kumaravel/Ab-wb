import os
import json
from flask import Flask, request, jsonify
from flask_cors import CORS
from huggingface_hub import HfApi

app = Flask(__name__)
CORS(app)

# Configuration
HF_TOKEN = os.environ.get("HF_TOKEN")
REPO_ID = "akashkumaravel/abweb"  # Hardcoded repo ID as per user request context
DATA_FILE = "products.json"

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
    
    # Sync with Hugging Face Hub if token is present
    if HF_TOKEN:
        try:
            api.upload_file(
                path_or_fileobj=DATA_FILE,
                path_in_repo=DATA_FILE,
                repo_id=REPO_ID,
                repo_type="space",
                token=HF_TOKEN
            )
            print("Synced with Hugging Face Hub")
        except Exception as e:
            print(f"Failed to sync with Hugging Face Hub: {e}")

@app.route("/")
def home():
    return "Server is running!"

@app.route("/api/products", methods=["GET"])
def get_products():
    products = load_products()
    return jsonify(products)

@app.route("/api/products", methods=["POST"])
def add_product():
    products = load_products()
    new_product = request.json
    
    # Generate simple ID if not provided
    if "id" not in new_product:
        new_product["id"] = max([p.get("id", 0) for p in products], default=0) + 1
        
    products.append(new_product)
    save_products(products)
    return jsonify(new_product), 201

@app.route("/api/products/<int:id>", methods=["PUT"])
def update_product(id):
    products = load_products()
    updated_data = request.json
    
    for i, product in enumerate(products):
        if product.get("id") == id:
            products[i] = {**product, **updated_data, "id": id}
            save_products(products)
            return jsonify(products[i])
            
    return jsonify({"error": "Product not found"}), 404

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
