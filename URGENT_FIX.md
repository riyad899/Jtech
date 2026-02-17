# 🔥 URGENT FIX: Firebase Iframe Error with %0A

## ⚠️ The Problem
Your Vercel environment variables have hidden newline characters (`%0A`).

## ✅ SOLUTION (Choose One):

---

### **Option 1: Manual Fix (Recommended - Most Reliable)**

1. **Go to Vercel Dashboard:**
   - Visit: https://vercel.com/dashboard
   - Select your project
   - Go to **Settings** → **Environment Variables**

2. **DELETE ALL Firebase variables:**
   - Click trash icon on each `VITE_FIREBASE_*` variable
   - Delete them completely

3. **Re-add them ONE BY ONE:**

   **Copy each value EXACTLY (no extra spaces/newlines):**

   ```
   VITE_FIREBASE_API_KEY
   Value: AIzaSyBHmI0_1-0O9KUMi1GOFw3JlxRhxHEP9R8
   ```

   ```
   VITE_FIREBASE_AUTH_DOMAIN
   Value: jtech-84a60.firebaseapp.com
   ```

   ```
   VITE_FIREBASE_PROJECT_ID
   Value: jtech-84a60
   ```

   ```
   VITE_FIREBASE_STORAGE_BUCKET
   Value: jtech-84a60.firebasestorage.app
   ```

   ```
   VITE_FIREBASE_MESSAGING_SENDER_ID
   Value: 169602955371
   ```

   ```
   VITE_FIREBASE_APP_ID
   Value: 1:169602955371:web:96e0232bf0e1efe3bd992e
   ```

   ```
   VITE_FIREBASE_MEASUREMENT_ID
   Value: G-KZ4RJCQ2DQ
   ```

   ```
   VITE_API_BASE_URL
   Value: https://jtech-rho.vercel.app
   ```

4. **Important:**
   - ⚠️ Type each value manually, don't copy-paste if possible
   - ⚠️ Make sure cursor is at END of text (no trailing spaces)
   - ⚠️ Press DELETE/BACKSPACE a few times at end to remove hidden chars
   - ✅ Set environment: **Production, Preview, Development**

5. **Redeploy:**
   ```bash
   vercel --prod --force
   ```

---

### **Option 2: Using Vercel CLI (Automated)**

1. **Make the script executable:**
   ```bash
   chmod +x update-vercel-env.sh
   ```

2. **Run the script:**
   ```bash
   ./update-vercel-env.sh
   ```

3. **Redeploy:**
   ```bash
   vercel --prod --force
   ```

---

## 🔍 Verify the Fix:

After deploying, check browser console:

```javascript
// Should print clean URLs without %0A
console.log('Auth Domain:', import.meta.env.VITE_FIREBASE_AUTH_DOMAIN);
```

Should see:
```
Auth Domain: jtech-84a60.firebaseapp.com
```

NOT:
```
Auth Domain: jtech-84a60.firebaseapp.com
(with newline after)
```

---

## 🚀 Quick Fix Applied in Code:

I've updated `firebase.config.js` to use `.trim()` on all values. This will remove newlines from environment variables.

**But you MUST still fix the Vercel environment variables themselves!**

---

## ✅ After Fix Checklist:

- [ ] All Vercel environment variables re-added without newlines
- [ ] Code has `.trim()` added (already done)
- [ ] Redeployed with `vercel --prod --force`
- [ ] Tested Google Sign-In on production
- [ ] No `%0A` in Firebase iframe URL
- [ ] Sign-in works without errors

---

## 💡 Why This Happens:

When you copy-paste from Firebase Console or text editor:
- Hidden newline characters get copied
- Vercel stores them as part of the value
- Firebase sees: `"jtech-84a60.firebaseapp.com\n"`
- URL becomes: `firebaseapp.com%0A` ← Invalid!

---

## 🔥 Still Not Working?

1. **Hard refresh browser:** Ctrl+Shift+R (Cmd+Shift+R on Mac)
2. **Clear Vercel cache:** Already done with `--force`
3. **Check Vercel logs:** Dashboard → Deployments → Latest → Function Logs
4. **Verify authorized domains in Firebase Console**
5. **Try incognito/private window**

---

## ⚡ Final Command:

```bash
# After fixing environment variables in Vercel Dashboard:
git add .
git commit -m "Fix: Add trim() to Firebase config"
git push
vercel --prod --force
```

Then test at: https://www.jtechvision.com
