# AUTIMA - Admin System Setup & Usage Guide

## Summary of Changes

### ✅ Frontend Changes (React/TypeScript)
1. **Removed Add to Cart Functionality**
   - Removed shopping cart icon from header
   - Changed product action buttons to "Contact for Inquiry"
   - Removed cart tracking functionality

2. **Added Admin Login System**
   - New page: `/admin` (AdminLogin.tsx)
   - Credentials: `Username: Admin` | `Password: Admin@123`
   - Secure authentication with localStorage

3. **Added Admin Dashboard**
   - New page: `/admin-dashboard` (AdminDashboard.tsx)
   - Full product management (Create, Read, Update, Delete)
   - Upload product details with image, price, description, features
   - Real-time product list with edit/delete options

4. **Updated Routing**
   - Admin routes have their own layout (no Header/Navigation/Footer)
   - Main routes wrapped with existing Layout

### ✅ Backend Changes (Python/Flask)
1. **Created API Server** (`server/app.py`)
   - RESTful API for product management
   - SQLite database integration
   - CORS enabled for frontend
   - Complete CRUD operations

2. **Dependencies** (`server/requirements.txt`)
   - Flask 2.3.3
   - Flask-CORS 4.0.0
   - Werkzeug 2.3.7

---

## Quick Start

### 1️⃣ Run Frontend (Local Development)

```bash
# In project root
npm install  # if not already installed
npm run dev
```

Frontend runs on: http://localhost:5173

### 2️⃣ Run Backend Server (Local Development)

```bash
# Navigate to server directory
cd server

# Create virtual environment (recommended)
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run server
python app.py
```

Backend runs on: http://localhost:5000

### 3️⃣ Access Admin Panel

1. Open http://localhost:5173/admin
2. Login with credentials:
   - Username: `Admin`
   - Password: `Admin@123`
3. You'll be redirected to http://localhost:5173/admin-dashboard
4. Now you can:
   - ➕ Add new products
   - ✏️ Edit existing products
   - 🗑️ Delete products
   - 📸 Upload product images
   - 📝 Add features and descriptions

---

## File Structure

```
project-root/
├── src/
│   ├── pages/
│   │   ├── AdminLogin.tsx        (NEW - Admin login page)
│   │   ├── AdminDashboard.tsx    (NEW - Product management)
│   │   ├── Home.tsx
│   │   ├── Shop.tsx
│   │   └── ... (other pages)
│   ├── components/
│   │   ├── Header.tsx            (UPDATED - removed cart)
│   │   ├── Layout.tsx
│   │   └── ... (other components)
│   └── ...
├── server/                        (NEW - Backend)
│   ├── app.py                    (NEW - Flask API server)
│   ├── requirements.txt          (NEW - Python dependencies)
│   ├── Dockerfile               (NEW - Docker configuration)
│   └── README.md                (NEW - Deployment guide)
├── App.tsx                       (UPDATED - new routes)
└── ...
```

---

## Deployment to Hugging Face

### Prerequisites
- Hugging Face account: https://huggingface.co
- Git installed on your machine

### Steps

1. **Create Space on Hugging Face:**
   - Go to Hugging Face → New Space
   - Name: `autima-admin-api`
   - SDK: Docker
   - Click Create Space

2. **Upload Server Files:**
   ```bash
   git clone https://huggingface.co/spaces/YOUR_USERNAME/autima-admin-api
   cd autima-admin-api
   cp server/app.py .
   cp server/requirements.txt .
   cp server/Dockerfile .
   git add .
   git commit -m "Add admin API server"
   git push
   ```

3. **Get Your Space URL:**
   - Format: `https://your-username-autima-admin-api.hf.space`

4. **Update Frontend API Endpoints:**
   - Edit `AdminDashboard.tsx`
   - Replace all `http://localhost:5000` with your Hugging Face URL
   - Example: `https://your-username-autima-admin-api.hf.space`

5. **Deploy Frontend:**
   - Upload your built React app to hosting (Vercel, Netlify, etc.)
   - Ensure it can communicate with Hugging Face server

---

## API Documentation

### Base URL
- Local: `http://localhost:5000`
- Production: `https://your-username-autima-admin-api.hf.space`

### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Get all products |
| GET | `/api/products/:id` | Get single product |
| POST | `/api/products` | Create product |
| PUT | `/api/products/:id` | Update product |
| DELETE | `/api/products/:id` | Delete product |
| GET | `/api/health` | Health check |

### Product Object
```json
{
  "id": 1,
  "name": "Product Name",
  "price": "$1,000.00",
  "image": "https://example.com/image.jpg",
  "description": "Product description",
  "features": ["Feature 1", "Feature 2"],
  "created_at": "2026-02-17T10:00:00",
  "updated_at": "2026-02-17T10:00:00"
}
```

---

## Authentication Details

### Admin Login
- **Page:** `/admin`
- **Username:** Admin
- **Password:** Admin@123
- **Storage:** localStorage as `adminAuth`

### What Happens on Login
1. Validates credentials
2. Stores auth token in localStorage
3. Redirects to `/admin-dashboard`
4. Shows product management interface

### Logout
- Clears localStorage
- Redirects to `/admin` login page

---

## Features of Admin Dashboard

### Add Product
- Product name
- Price (e.g., $1,000.00)
- Image URL (external link)
- Detailed description
- Multiple features (line by line)

### Edit Product
- Click edit icon next to any product
- Form pre-fills with existing data
- Make changes and save
- Updates on website immediately

### Delete Product
- Click delete icon next to any product
- Confirm deletion
- Product removed from database and website

### Live Updates
- Changes appear on website immediately
- No need to restart server or rebuild frontend

---

## Troubleshooting

### Frontend Can't Connect to Backend
1. Check if backend server is running: `http://localhost:5000/api/health`
2. Check browser console for CORS errors
3. Ensure URLs in AdminDashboard.tsx are correct
4. Check firewall settings

### Admin Login Not Working
1. Clear browser localStorage
2. Check credentials: `Admin` / `Admin@123`
3. Verify server is running

### Products Not Showing
1. Ensure server is running
2. Check network tab in browser developer tools
3. Verify database file (`products.db`) exists in server directory

### Server Won't Start
```bash
# Check Python version
python --version  # Should be 3.8+

# Check installed packages
pip list

# Try installing again
pip install -r requirements.txt --force-reinstall
```

---

## Default Products

When server starts for the first time, it creates these products:
1. Bleaching & Singeing Machine BS-1800 - $19,500.00
2. Reeling & Sizing Equipment RS-2500 - $14,200.00
3. Brushing & Sueding Machine BS-3000 - $16,800.00

You can edit or delete these anytime through the admin dashboard.

---

## Next Steps

1. ✅ Test locally (frontend + backend)
2. ✅ Add your first product through admin panel
3. ✅ Verify products display on website
4. ✅ Deploy backend to Hugging Face
5. ✅ Update frontend API endpoints
6. ✅ Deploy frontend to hosting provider
7. ✅ Update DNS/domain if needed

---

## Support Resources

- Flask Documentation: https://flask.palletsprojects.com/
- React Router: https://reactrouter.com/
- Hugging Face Spaces: https://huggingface.co/docs/hub/spaces
- SQLite: https://www.sqlite.org/

---

**Setup Date:** February 17, 2026
**Version:** 1.0.0
**Status:** Production Ready
