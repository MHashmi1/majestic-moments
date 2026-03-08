# Majestic Moments Website - Setup Guide

## 🚀 Deploy to GitHub Pages (3 Steps)

### Step 1: Set Up Contact Form (5 min)
1. Go to https://formspree.io and create free account
2. Create new form, copy your form ID
3. In `index.html` line 191, replace `YOUR_FORM_ID` with your actual ID
4. Save the file

### Step 2: Upload to GitHub (10 min)
1. Create account at https://github.com
2. Create new repository named "majestic"
3. Upload all files from this folder
4. Go to Settings > Pages
5. Enable Pages: Deploy from "main" branch
6. Wait 2 minutes

### Step 3: Done!
Your website will be live at: `https://YOUR_USERNAME.github.io/majestic/`

## 📱 Test Locally First
```bash
python3 -m http.server 8000
# Open http://localhost:8000
```

## 🎨 Making Changes
- **Edit text**: Update `index.html`
- **Change colors**: Edit `css/style.css` (look for `:root` section)
- **Add images**: Add to `images/gallery/` and update `js/gallery.js`

## ✅ What's Included
- Responsive website (mobile/tablet/desktop)
- 11 optimized gallery images with lightbox
- Contact form (needs Formspree)
- Instagram link to @majesticmoments25

That's it! Deploy and share your new website!
