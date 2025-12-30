# 🚀 GitHub Pages Deployment Guide

Complete step-by-step instructions for deploying your Angular portfolio to GitHub Pages.

## 📋 Prerequisites

Before you begin, ensure you have:
- ✅ Git installed on your system
- ✅ A GitHub account
- ✅ Node.js and npm installed
- ✅ Angular CLI installed globally (`npm install -g @angular/cli`)

## 🎯 Step-by-Step Deployment

### Step 1: Initialize Git Repository

If you haven't already initialized git:

```bash
cd jeffrey-portfolio

# Initialize git repository
git init

# Configure git user (if not already done)
git config user.email "jeffreykirigo75@gmail.com"
git config user.name "Jeffrey Kirigo"
```

### Step 2: Create GitHub Repository

1. Go to [GitHub](https://github.com)
2. Click the **"+"** icon in the top right corner
3. Select **"New repository"**
4. Fill in the details:
   - **Repository name**: `jeffrey-portfolio` (or your preferred name)
   - **Description**: "Modern Terminal-Themed Portfolio Website"
   - **Visibility**: Public (required for free GitHub Pages)
   - ⚠️ **DO NOT** check "Initialize with README" (we already have files)
5. Click **"Create repository"**

### Step 3: Add Your Profile Picture (Optional)

Add your LinkedIn profile picture to make it appear in the header:

```bash
# Create the images directory if it doesn't exist
mkdir -p src/assets/images

# Copy your profile picture
# (Download from LinkedIn and save as profile.jpg)
cp /path/to/your/linkedin-photo.jpg src/assets/images/profile.jpg
```

### Step 4: Commit Your Code

```bash
# Add all files to git
git add .

# Create your first commit
git commit -m "Initial commit: Modern terminal portfolio with PDF/MD download support"

# Add remote repository (replace with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/jeffrey-portfolio.git

# Push to GitHub
git branch -M main
git push -u origin main
```

> Replace `YOUR_USERNAME` with your actual GitHub username

### Step 5: Install Angular GitHub Pages Deployment Tool

```bash
# Install angular-cli-ghpages globally
npm install -g angular-cli-ghpages
```

### Step 6: Build for Production

Build the application with the correct base href:

```bash
# Build with production configuration
ng build --configuration production --base-href /jeffrey-portfolio/
```

> Note: Replace `/jeffrey-portfolio/` with `/YOUR_REPO_NAME/` if you used a different repository name

### Step 7: Deploy to GitHub Pages

```bash
# Deploy the dist folder to gh-pages branch
npx angular-cli-ghpages --dir=dist/jeffrey-portfolio
```

**Alternative method using ngh:**

```bash
# Install ngh if you haven't already
npm install -g angular-cli-ghpages

# Deploy
ngh --dir=dist/jeffrey-portfolio
```

### Step 8: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click on **"Settings"** tab
3. Scroll down to **"Pages"** section (in the left sidebar under "Code and automation")
4. Under **"Source"**, select:
   - Branch: `gh-pages`
   - Folder: `/ (root)`
5. Click **"Save"**

### Step 9: Wait for Deployment

GitHub Pages will build your site. This usually takes 1-3 minutes.

You'll see a message like:
```
Your site is live at https://YOUR_USERNAME.github.io/jeffrey-portfolio/
```

### Step 10: Visit Your Live Site! 🎉

Open your browser and navigate to:
```
https://YOUR_USERNAME.github.io/jeffrey-portfolio/
```

---

## 🔄 Updating Your Portfolio

When you make changes to your portfolio:

```bash
# 1. Make your changes to the code

# 2. Test locally
ng serve

# 3. Commit changes
git add .
git commit -m "Update: Description of changes"
git push origin main

# 4. Rebuild and redeploy
ng build --configuration production --base-href /jeffrey-portfolio/
npx angular-cli-ghpages --dir=dist/jeffrey-portfolio
```

---

## 🛠️ Alternative Deployment Methods

### Method A: Using Package.json Scripts

Add these scripts to your `package.json`:

```json
{
  "scripts": {
    "build:prod": "ng build --configuration production --base-href /jeffrey-portfolio/",
    "deploy": "npx angular-cli-ghpages --dir=dist/jeffrey-portfolio",
    "build:deploy": "npm run build:prod && npm run deploy"
  }
}
```

Then deploy with:
```bash
npm run build:deploy
```

### Method B: Manual Deployment

```bash
# 1. Build the project
ng build --configuration production --base-href /jeffrey-portfolio/

# 2. Navigate to dist folder
cd dist/jeffrey-portfolio

# 3. Initialize git
git init
git add .
git commit -m "Deploy to GitHub Pages"

# 4. Force push to gh-pages branch
git push -f https://github.com/YOUR_USERNAME/jeffrey-portfolio.git main:gh-pages

# 5. Go back to project root
cd ../..
```

### Method C: Using GitHub Actions (CI/CD)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v3

    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'

    - name: Install dependencies
      run: npm ci

    - name: Build
      run: ng build --configuration production --base-href /jeffrey-portfolio/

    - name: Deploy
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist/jeffrey-portfolio
```

---

## ❗ Troubleshooting

### Issue: Page shows 404 error

**Solution:**
- Ensure the base-href matches your repository name
- Check that GitHub Pages is enabled in Settings
- Wait a few minutes for GitHub to process the deployment

### Issue: Styles not loading

**Solution:**
```bash
# Rebuild with correct base-href
ng build --configuration production --base-href /jeffrey-portfolio/
npx angular-cli-ghpages --dir=dist/jeffrey-portfolio
```

### Issue: Images not showing

**Solution:**
- Ensure images are in `src/assets/` folder
- Use relative paths in your code
- Clear browser cache

### Issue: Git credentials error

**Solution:**
```bash
# Use personal access token instead of password
# Go to GitHub Settings > Developer settings > Personal access tokens
# Generate new token and use it as password
```

---

## 🌟 Custom Domain (Optional)

To use a custom domain:

1. Add a file named `CNAME` in your `src/` folder with your domain:
   ```
   portfolio.jeffreykirigo.com
   ```

2. Update `angular.json` to copy CNAME to dist:
   ```json
   "assets": [
     "src/favicon.ico",
     "src/assets",
     "src/CNAME"
   ]
   ```

3. Configure DNS settings with your domain provider:
   - Add A records pointing to GitHub Pages IPs
   - Or add CNAME record pointing to `YOUR_USERNAME.github.io`

4. In GitHub repository settings > Pages, add your custom domain

---

## 📊 Monitoring & Analytics

Add Google Analytics (optional):

1. Get your GA tracking ID from Google Analytics
2. Add to `src/index.html`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_TRACKING_ID');
</script>
```

---

## ✅ Post-Deployment Checklist

- [ ] Site loads correctly at GitHub Pages URL
- [ ] All terminal commands work
- [ ] Profile picture displays (if added)
- [ ] PDF download works
- [ ] Markdown download works
- [ ] Text download works
- [ ] All links in header work (LinkedIn, GitHub, Email)
- [ ] Responsive design works on mobile
- [ ] Animations are smooth
- [ ] No console errors

---

## 📱 Share Your Portfolio

Once deployed, share your portfolio:

- **LinkedIn**: Update your profile with the link
- **GitHub**: Add link to your GitHub profile README
- **Resume**: Include the URL in your resume
- **Email Signature**: Add to your professional email signature

**Your Live URL:**
```
https://YOUR_USERNAME.github.io/jeffrey-portfolio/
```

---

## 🎓 Additional Resources

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Angular Deployment Guide](https://angular.io/guide/deployment)
- [angular-cli-ghpages](https://github.com/angular-schule/angular-cli-ghpages)

---

**🎉 Congratulations!** Your modern terminal portfolio is now live on the internet!

For questions or issues, open an issue on GitHub or contact Jeffrey at jeffreykirigo75@gmail.com
