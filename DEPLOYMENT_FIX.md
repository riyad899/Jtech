# Deployment Fix Instructions

## ✅ Problem 1: 404 After Reload (FIXED)
Created `vercel.json` to handle SPA routing.

## ✅ Problem 2: Firebase Configuration (FIXED)
Cleaned up `.env.local` to remove hidden newline characters.

## 🚀 Next Steps:

### 1. Set Environment Variables in Vercel

Go to your Vercel project dashboard:
1. Click on your project
2. Go to **Settings** → **Environment Variables**
3. Add all these variables (copy from `.env.local`):

```
VITE_API_BASE_URL=https://jtech-rho.vercel.app
VITE_FIREBASE_API_KEY=AIzaSyBHmI0_1-0O9KUMi1GOFw3JlxRhxHEP9R8
VITE_FIREBASE_AUTH_DOMAIN=jtech-84a60.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=jtech-84a60
VITE_FIREBASE_STORAGE_BUCKET=jtech-84a60.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=169602955371
VITE_FIREBASE_APP_ID=1:169602955371:web:96e0232bf0e1efe3bd992e
VITE_FIREBASE_MEASUREMENT_ID=G-KZ4RJCQ2DQ
```

⚠️ **IMPORTANT**: Make sure there are NO spaces or newlines after each value!

### 2. Configure Firebase Console

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `jtech-84a60`
3. Go to **Authentication** → **Settings** → **Authorized domains**
4. Make sure these domains are added:
   - `jtechvision.com`
   - `www.jtechvision.com`
   - `jtech-84a60.firebaseapp.com`
   - Your Vercel preview domains (e.g., `your-project.vercel.app`)

### 3. Deploy to Vercel

```bash
git add .
git commit -m "Fix: Add vercel.json for SPA routing and clean Firebase config"
git push
```

Vercel will automatically deploy.

### 4. Test After Deployment

1. Visit: `https://jtechvision.com/register`
2. Reload the page (F5 or Cmd+R)
3. Try Google Sign-In

## 🔍 If Issues Persist:

### Check for Hidden Characters:
```bash
# In terminal, check for hidden characters in auth domain
cat .env.local | grep AUTH_DOMAIN | od -c
```

Should show NO `\n` or spaces after `.com`

### Check Vercel Logs:
1. Go to Vercel Dashboard → Your Project → Deployments
2. Click on latest deployment → View Function Logs
3. Check for any errors

### Clear Browser Cache:
1. Open DevTools (F12)
2. Right-click Reload button → "Empty Cache and Hard Reload"

## 📝 What Was Fixed:

1. **Created `vercel.json`**: Tells Vercel to serve `index.html` for all routes
2. **Cleaned `.env.local`**: Removed hidden newline after `VITE_API_BASE_URL`
3. **Proper Firebase Config**: Ensured no spaces or newlines in any Firebase environment variables

## ⚠️ Common Mistakes to Avoid:

- ❌ Don't copy-paste Firebase config from Firebase Console directly (may contain hidden chars)
- ❌ Don't leave blank lines between env variables
- ❌ Don't add quotes around env variable values
- ❌ Don't forget to add environment variables in Vercel dashboard
- ✅ Type Firebase domains manually if copy-paste causes issues
- ✅ Always redeploy after changing environment variables
