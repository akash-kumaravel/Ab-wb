# FILES FOR HUGGING FACE DEPLOYMENT

## 📁 Server Files Location
All server files are in: `server/` directory

### Required Files to Upload to Hugging Face:

1. **app.py** - Main Flask application
   - Location: `server/app.py`
   - Contains all API endpoints and database logic

2. **requirements.txt** - Python dependencies
   - Location: `server/requirements.txt`
   - Lists: Flask, Flask-CORS, Werkzeug

3. **Dockerfile** - Container configuration
   - Location: `server/Dockerfile`
   - For deployment to Hugging Face Spaces

4. **.gitignore** (optional but recommended)
   ```
   __pycache__/
   *.pyc
   *.pyo
   *.pyd
   .Python
   venv/
   products.db
   ```

## 🚀 Hugging Face Deployment Steps

### Quick Deploy (5 minutes):

1. Go to: https://huggingface.co/spaces/create
2. Fill in:
   - Space name: `autima-admin-api`
   - License: OpenRAIL
   - Space SDK: Docker
3. Click: Create Space
4. Upload files:
   - Upload `server/app.py`
   - Upload `server/requirements.txt`
   - Upload `server/Dockerfile`
5. Hugging Face automatically builds and deploys!

### Your Server URL Will Be:
`https://YOUR_USERNAME-autima-admin-api.hf.space`

## ⚙️ Update Frontend After Deployment

Edit `src/pages/AdminDashboard.tsx` and replace:
```
http://localhost:5000
```

With:
```
https://YOUR_USERNAME-autima-admin-api.hf.space
```

Find and replace in these places:
- Line 42: `fetch('http://localhost:5000/api/products')`
- Line 59: `fetch(url, ...` (inside fetch calls)
- Line 158: Message text

Or use Find & Replace:
- Open Find in Files: `Ctrl+Shift+H`
- Find: `http://localhost:5000`
- Replace: `https://YOUR_USERNAME-autima-admin-api.hf.space`

## 📋 File Contents Summary

### app.py Contents:
- Flask application setup with CORS
- SQLite database initialization
- CRUD API endpoints:
  - GET /api/products
  - GET /api/products/:id
  - POST /api/products
  - PUT /api/products/:id
  - DELETE /api/products/:id
  - GET /api/health

### requirements.txt Contents:
```
Flask==2.3.3
Flask-CORS==4.0.0
Werkzeug==2.3.7
```

### Dockerfile Contents:
- Python 3.9 slim base image
- Installs dependencies
- Runs Flask on port 5000
- Production-ready configuration

## ✅ Verification Checklist

- [ ] Downloaded `app.py` from server folder
- [ ] Downloaded `requirements.txt` from server folder
- [ ] Downloaded/created `Dockerfile` from server folder
- [ ] Uploaded all 3 files to Hugging Face Space
- [ ] Space shows "Running" status
- [ ] Can access: `https://YOUR_USERNAME-autima-admin-api.hf.space/api/health`
- [ ] Updated AdminDashboard.tsx with new URL
- [ ] Frontend connects to backend successfully
- [ ] Can login with Admin/Admin@123
- [ ] Can add/edit/delete products

## 🔗 Reference Links

- Hugging Face Spaces: https://huggingface.co/spaces
- Flask Docs: https://flask.palletsprojects.com/
- Docker Docs: https://docs.docker.com/

## 💡 Pro Tips

1. **Test locally first:**
   ```bash
   cd server
   pip install -r requirements.txt
   python app.py
   ```

2. **Check health endpoint:**
   ```
   GET https://YOUR_USERNAME-autima-admin-api.hf.space/api/health
   ```

3. **Monitor Space logs:**
   - Go to Space Settings → Logs
   - Check for any errors

4. **Database persistence:**
   - Hugging Face Spaces have ephemeral storage
   - For long-term storage, consider:
     - Using a cloud database (MongoDB, PostgreSQL)
     - Or use Hugging Face Hub file storage

---

**Ready to deploy?** 🎯
Follow the steps above and your admin system will be live in minutes!
