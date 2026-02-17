# QUICK REFERENCE - Commands & URLs

## 🎯 **Problem Fixed**
Products now update in real-time without code changes!

---

## 🚀 **Local Testing (5 minutes)**

```bash
# Terminal 1 - Backend
cd server
python app.py

# Terminal 2 - Frontend  
npm run dev

# Visit: http://localhost:5173
# Admin: http://localhost:5173/admin
# Credentials: Admin / Admin@123
```

**Test:** Add product → See on home page instantly ✅

---

## 🌐 **Production Deployment**

### **1. GitHub**
```bash
git add .
git commit -m "Dynamic products system"
git push origin main
```

### **2. Hugging Face**
- URL: https://huggingface.co/spaces/create
- SDK: Docker
- Upload: `server/app.py`, `requirements.txt`, `Dockerfile`
- Get Space URL: `https://YOUR_HF_USERNAME-autima-admin-api.hf.space`

### **3. Vercel**
- URL: https://vercel.com
- Connect GitHub repo
- Set env var: `REACT_APP_API_URL=https://YOUR_HF_USERNAME-autima-admin-api.hf.space`
- Deploy!

---

## 📱 **Test Production**

```bash
# Health check
curl https://YOUR_HF_USERNAME-autima-admin-api.hf.space/api/health

# Get all products
curl https://YOUR_HF_USERNAME-autima-admin-api.hf.space/api/products
```

---

## 📁 **Key Files**

| File | Purpose | New? |
|------|---------|------|
| `src/services/ProductService.ts` | API client | ✨ |
| `src/config/apiConfig.ts` | API config | ✨ |
| `src/pages/Home.tsx` | Home page | ✏️ |
| `src/pages/Shop.tsx` | Shop page | ✏️ |
| `src/pages/ProductDetail.tsx` | Product detail | ✏️ |
| `src/pages/SearchResults.tsx` | Search | ✏️ |
| `.env.example` | Config template | ✨ |
| `SYSTEM_FIXED.md` | Problem summary | ✨ |
| `ARCHITECTURE_SETUP.md` | Technical details | ✨ |
| `COMPLETE_DEPLOYMENT_GUIDE.md` | Full guide | ✨ |

---

## 🔑 **Admin Credentials**

| Field | Value |
|-------|-------|
| URL | `/admin` |
| Username | `Admin` |
| Password | `Admin@123` |

---

## 📊 **API Endpoints**

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/products` | Get all |
| GET | `/api/products/:id` | Get one |
| POST | `/api/products` | Create |
| PUT | `/api/products/:id` | Update |
| DELETE | `/api/products/:id` | Delete |
| GET | `/api/health` | Health check |

---

## ✅ **Deployment Checklist**

- [ ] Code pushed to GitHub
- [ ] Backend on Hugging Face (running)
- [ ] Health check works: `/api/health` returns OK
- [ ] Frontend on Vercel (deployed)
- [ ] Environment variable set in Vercel
- [ ] Can login to admin panel
- [ ] Can add product
- [ ] Product appears on website

---

## 🧪 **Test Scenarios**

### **Scenario 1: Add Product**
1. Go to `/admin`
2. Login
3. Add product
4. Go to `/`
5. **See product on home** ✅

### **Scenario 2: Edit Product**
1. Go to `/admin-dashboard`
2. Click edit button
3. Change details
4. Save
5. Go to `/shop`
6. **See updated product** ✅

### **Scenario 3: Delete Product**
1. Go to `/admin-dashboard`
2. Click delete button
3. Confirm
4. Go to `/`
5. **Product gone** ✅

### **Scenario 4: Search Product**
1. Go to `/`
2. Search for product
3. **Find new product** ✅

---

## 🔧 **Environment Variables**

### **Local (.env)**
```
REACT_APP_API_URL=http://localhost:5000
```

### **Vercel Production**
```
REACT_APP_API_URL=https://YOUR_HF_USERNAME-autima-admin-api.hf.space
```

---

## 🚨 **Troubleshooting**

### **Products not loading?**
```bash
# Check backend
curl https://YOUR_HF_USERNAME-autima-admin-api.hf.space/api/health

# Check env var in Vercel
# Settings → Environment Variables
```

### **Admin not working?**
```bash
# Check backend running
# Check Hugging Face Space status
# Clear browser cache (Ctrl+Shift+Delete)
```

### **Vercel build failed?**
```bash
# Check GitHub has all files
# Run locally: npm run build
# Check Vercel logs
```

---

## 📚 **Documentation**

- **SYSTEM_FIXED.md** ← Start here (problem overview)
- **ARCHITECTURE_SETUP.md** ← For technical details
- **COMPLETE_DEPLOYMENT_GUIDE.md** ← For deployment steps
- **.env.example** ← For configuration

---

## ⚡ **Quick Actions**

### **I want to...**

**Add a product:**
→ Go to `/admin` → Login → Add Product → Done!

**Change website design:**
→ Edit code → `git push` → Vercel auto-deploys

**Update backend code:**
→ Edit `server/app.py` → Push to Hugging Face → Done!

**Check if everything works:**
→ Add test product → Refresh page → Should be there

**Deploy to production:**
→ Follow COMPLETE_DEPLOYMENT_GUIDE.md (20 minutes)

---

## 🎯 **Success Criteria**

✅ Deployed when:
1. Products fetch from API
2. Admin can add products
3. Website shows new products
4. No code changes needed for updates
5. Everything works on mobile

---

## 📞 **Quick Links**

- GitHub: https://github.com/YOUR_USERNAME/autima-website
- Vercel: https://vercel.com/dashboard
- Hugging Face: https://huggingface.co/spaces

---

**Status:** ✅ System Complete & Ready
**Estimated Setup Time:** 20 minutes
**Maintenance:** Minimal (just add products!)

Start with `SYSTEM_FIXED.md` for overview, then `COMPLETE_DEPLOYMENT_GUIDE.md` for deployment.
