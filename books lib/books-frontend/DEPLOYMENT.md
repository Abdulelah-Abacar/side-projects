# Deployment Guide

## Complete Stack Deployment

This guide covers deploying both the **API backend** and the **frontend** to production.

## Architecture

```
Frontend (Static HTML/JS)  →  API Backend (FastAPI)  →  External APIs
     Netlify/Vercel              Railway/Render         Open Library, etc.
```

## 🔧 Backend Deployment

### Option 1: Railway.app (Recommended)

**Why Railway?**
- Free tier available
- Automatic deployments from Git
- Built-in environment variables
- Easy to use

**Steps:**
1. Push your `legitimate-books-api` to GitHub
2. Go to [railway.app](https://railway.app)
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. Railway auto-detects the Python app
6. Your API will be live at: `https://your-app.up.railway.app`

**Important:** Note your Railway URL - you'll need it for the frontend!

### Option 2: Render.com

**Steps:**
1. Push to GitHub
2. Go to [render.com](https://render.com)
3. New → Web Service
4. Connect GitHub repo
5. Settings:
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
6. Deploy!

### Option 3: Heroku

**Steps:**
```bash
# Install Heroku CLI
heroku login

# Create app
heroku create your-books-api

# Add Procfile to your repo:
echo "web: uvicorn main:app --host 0.0.0.0 --port \$PORT" > Procfile

# Deploy
git push heroku main
```

## 🌐 Frontend Deployment

### Option 1: Netlify (Easiest)

**Steps:**
1. Go to [netlify.com](https://netlify.com)
2. Drag and drop your `books-frontend` folder
3. Done!

**Update API URL:**
Before deploying, edit `index.html`:
```javascript
const API_BASE_URL = 'https://your-api.railway.app';  // Your Railway URL
```

### Option 2: Vercel

**Steps:**
1. Install Vercel CLI: `npm install -g vercel`
2. In frontend folder: `vercel`
3. Follow prompts
4. Done!

### Option 3: GitHub Pages

**Steps:**
1. Push frontend to GitHub repo
2. Go to Settings → Pages
3. Select branch and `/` root
4. Save

**Important:** Update API URL before pushing!

## 🔗 Connecting Frontend to Backend

### Step-by-Step:

1. **Deploy Backend First**
   ```bash
   # Deploy to Railway, Render, or Heroku
   # Get your API URL (e.g., https://your-api.railway.app)
   ```

2. **Test Backend**
   ```bash
   curl https://your-api.railway.app/health
   # Should return: {"status": "healthy", ...}
   ```

3. **Update Frontend**
   Edit `index.html`:
   ```javascript
   // Change this line:
   const API_BASE_URL = 'http://localhost:8000';
   
   // To:
   const API_BASE_URL = 'https://your-api.railway.app';
   ```

4. **Deploy Frontend**
   - Upload to Netlify/Vercel
   - Your site will be live!

## ⚠️ CORS Configuration

If you get CORS errors:

1. **Update API CORS settings** in `main.py`:
   ```python
   app.add_middleware(
       CORSMiddleware,
       allow_origins=["https://your-frontend.netlify.app"],  # Add your frontend URL
       allow_credentials=True,
       allow_methods=["*"],
       allow_headers=["*"],
   )
   ```

2. **Redeploy API** after changes

## 🔒 Environment Variables

### Backend (.env)
```env
HOST=0.0.0.0
PORT=8000
CORS_ORIGINS=https://your-frontend.netlify.app
```

### Railway/Render
Add these in the dashboard under "Environment Variables"

## 📊 Monitoring

### Check API Health
```bash
curl https://your-api.railway.app/health
```

### Check API Docs
Visit: `https://your-api.railway.app/docs`

### Check Frontend
Visit your Netlify URL

## 🚀 Quick Deploy Commands

### Full Stack Deployment

**Terminal 1 (Backend):**
```bash
cd legitimate-books-api
git init
git add .
git commit -m "Initial commit"
gh repo create books-api --public --push --source=.
# Then deploy via Railway dashboard
```

**Terminal 2 (Frontend):**
```bash
cd books-frontend
# Update API_BASE_URL in index.html first!
vercel
```

## 📝 Deployment Checklist

### Before Deploying:
- [ ] Backend tests passing
- [ ] Frontend connects to local API
- [ ] API_BASE_URL updated in frontend
- [ ] CORS configured correctly
- [ ] Environment variables set
- [ ] Git repos created

### After Deploying:
- [ ] API health check passes
- [ ] API docs accessible
- [ ] Frontend loads
- [ ] Search works
- [ ] Book details load
- [ ] Comments system works

## 🐛 Troubleshooting

### "API is not responding"
1. Check API is deployed and running
2. Visit `/health` endpoint
3. Check Railway/Render logs
4. Verify API URL in frontend

### "CORS Error"
1. Update CORS origins in API
2. Redeploy API
3. Clear browser cache
4. Try again

### "Books not loading"
1. Check API endpoints work directly
2. Check browser console for errors
3. Verify API returns data: `/api/v1/gutenberg/popular`
4. Check network tab in DevTools

### "Deployment fails"
1. Check build logs
2. Verify all dependencies in requirements.txt
3. Check start command is correct
4. Verify Python version compatibility

## 💡 Pro Tips

1. **Use Railway for API** - Easiest deployment
2. **Use Netlify for Frontend** - Instant deploys
3. **Keep URLs in environment variables** - Easier updates
4. **Test locally first** - Saves debugging time
5. **Monitor logs** - Railway/Render have great logging
6. **Use custom domains** - Professional appearance

## 🎯 Production Checklist

- [ ] API deployed and healthy
- [ ] Frontend deployed
- [ ] CORS configured
- [ ] Environment variables set
- [ ] SSL/HTTPS enabled (automatic on all platforms)
- [ ] Error monitoring set up
- [ ] Backup plan documented

## 📈 Scaling

### When you get more traffic:

**Backend:**
- Upgrade Railway/Render plan
- Add Redis for caching
- Implement rate limiting
- Use CDN for static assets

**Frontend:**
- Enable CDN (Netlify/Vercel do this automatically)
- Optimize images
- Implement lazy loading
- Add service worker for offline support

## 🌟 Example Deployed URLs

After deployment, you'll have:
- **API**: `https://books-api.up.railway.app`
- **Frontend**: `https://bibliotheque.netlify.app`
- **Docs**: `https://books-api.up.railway.app/docs`

---

**Need Help?**
- Railway Docs: https://docs.railway.app
- Netlify Docs: https://docs.netlify.com
- Render Docs: https://render.com/docs

Good luck with your deployment! 🚀
