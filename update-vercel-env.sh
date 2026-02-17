#!/bin/bash

# Script to update Vercel environment variables without newlines

echo "🔧 Updating Vercel Environment Variables..."
echo "⚠️  Make sure you have Vercel CLI installed: npm i -g vercel"
echo ""

# Read from .env.local and set in Vercel
vercel env rm VITE_FIREBASE_API_KEY production -y 2>/dev/null
vercel env add VITE_FIREBASE_API_KEY production << EOF
AIzaSyBHmI0_1-0O9KUMi1GOFw3JlxRhxHEP9R8
EOF

vercel env rm VITE_FIREBASE_AUTH_DOMAIN production -y 2>/dev/null
vercel env add VITE_FIREBASE_AUTH_DOMAIN production << EOF
jtech-84a60.firebaseapp.com
EOF

vercel env rm VITE_FIREBASE_PROJECT_ID production -y 2>/dev/null
vercel env add VITE_FIREBASE_PROJECT_ID production << EOF
jtech-84a60
EOF

vercel env rm VITE_FIREBASE_STORAGE_BUCKET production -y 2>/dev/null
vercel env add VITE_FIREBASE_STORAGE_BUCKET production << EOF
jtech-84a60.firebasestorage.app
EOF

vercel env rm VITE_FIREBASE_MESSAGING_SENDER_ID production -y 2>/dev/null
vercel env add VITE_FIREBASE_MESSAGING_SENDER_ID production << EOF
169602955371
EOF

vercel env rm VITE_FIREBASE_APP_ID production -y 2>/dev/null
vercel env add VITE_FIREBASE_APP_ID production << EOF
1:169602955371:web:96e0232bf0e1efe3bd992e
EOF

vercel env rm VITE_FIREBASE_MEASUREMENT_ID production -y 2>/dev/null
vercel env add VITE_FIREBASE_MEASUREMENT_ID production << EOF
G-KZ4RJCQ2DQ
EOF

vercel env rm VITE_API_BASE_URL production -y 2>/dev/null
vercel env add VITE_API_BASE_URL production << EOF
https://jtech-rho.vercel.app
EOF

echo ""
echo "✅ Environment variables updated!"
echo "🚀 Now redeploy with: vercel --prod --force"
