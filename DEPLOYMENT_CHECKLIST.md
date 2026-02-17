# ✅ Deployment Checklist

## Before Deploying:

- [x] Created `vercel.json` for SPA routing
- [x] Cleaned `.env.local` (removed hidden newlines)
- [x] Verified `_redirects` file exists in public folder
- [x] Firebase config uses environment variables

## Required Actions:

### 1. ⚙️ Set Vercel Environment Variables
Go to: https://vercel.com/dashboard → Your Project → Settings → Environment Variables

Add these (from `.env.local`):
```
VITE_API_BASE_URL
VITE_FIREBASE_API_KEY
VITE_FIREBASE_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID
VITE_FIREBASE_MEASUREMENT_ID
```

### 2. 🔥 Configure Firebase Console
Go to: https://console.firebase.google.com/ → Your Project

**Authentication → Settings → Authorized domains**

Add:
- ✅ `jtechvision.com`
- ✅ `www.jtechvision.com`
- ✅ `jtech-84a60.firebaseapp.com`
- ✅ Your Vercel domain (e.g., `jtech-rho.vercel.app`)

### 3. 🚀 Deploy

```bash
git add .
git commit -m "Fix: SPA routing and Firebase config for production"
git push origin main
```

### 4. 🧪 Test After Deployment

1. Visit: `https://jtechvision.com/register`
2. **Hard refresh** (Ctrl+Shift+R or Cmd+Shift+R)
3. Try Google Sign-In
4. Navigate to `/courses` and refresh
5. Test all routes

## If Issues Persist:

### Clear Vercel Build Cache:
```bash
vercel --prod --force
```

### Check Vercel Logs:
Dashboard → Deployments → Click deployment → View Function Logs

### Verify Environment Variables Loaded:
Add temporary console log in `firebase.config.js`:
```javascript
console.log('Firebase Auth Domain:', import.meta.env.VITE_FIREBASE_AUTH_DOMAIN);
```

### Common Issues:
- ❌ Environment variables not set in Vercel
- ❌ Domain not authorized in Firebase Console
- ❌ Browser cached old version (hard refresh needed)
- ❌ Vercel build cache (force rebuild)

## ✨ Expected Result:
- ✅ All routes work after refresh
- ✅ Google Sign-In works without iframe errors
- ✅ No 404 errors on any page reload
- ✅ Firebase authentication works correctly
