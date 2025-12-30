# ⚡ Quick Start Guide

## 🎯 Local Development

```bash
# Install dependencies
npm install

# Start development server
ng serve

# Open browser
http://localhost:4200
```

## 🖼️ Add Your Profile Picture

```bash
# Create images directory
mkdir -p src/assets/images

# Add your LinkedIn photo
cp /path/to/your-photo.jpg src/assets/images/profile.jpg
```

## 🎨 Color Customization

Edit `src/styles.scss` to customize colors:

```scss
:root {
  --accent-primary: #58a6ff;    // Change to your preferred color
  --accent-secondary: #a371f7;   // Secondary accent
  --text-terminal: #3fb950;      // Terminal text color
}
```

## 📝 Update Resume Content

Edit `src/app/services/terminal.ts`:

```typescript
private readonly resumeData = {
  name: 'Your Name',
  title: 'Your Title',
  email: 'your.email@example.com',
  phone: '+1234567890',
  // ... update all fields
}
```

## 🚀 Deploy to GitHub Pages

```bash
# One-command deployment
npm run build:prod && npx angular-cli-ghpages --dir=dist/jeffrey-portfolio
```

## 💻 Terminal Commands

| Command | What it does |
|---------|-------------|
| `help` | Show all commands |
| `about` | Show professional summary |
| `skills` | List technical skills |
| `experience` | Show work history |
| `education` | Show education |
| `contact` | Display contact info |
| `resume` | Full resume in terminal |
| `download pdf` | Download as PDF |
| `download md` | Download as Markdown |
| `download txt` | Download as text |
| `whoami` | Show name and title |
| `clear` | Clear the terminal |

## 🔧 Customization Tips

### Change Terminal Prompt

Edit `src/app/terminal/terminal.ts`:
```typescript
getPrompt(): string {
  return 'your-custom-prompt:~$';
}
```

### Add New Commands

In `src/app/services/terminal.ts`:
```typescript
case 'your-command':
  output = 'Your custom output';
  break;
```

### Modify Animations

Edit timing in `src/app/app.scss` or `src/app/terminal/terminal.scss`:
```scss
animation: slideIn 0.5s ease-out; // Change 0.5s to your preference
```

## 📦 Build Commands

```bash
# Development build
ng build

# Production build
ng build --configuration production

# Production with base href (for GitHub Pages)
ng build --configuration production --base-href /your-repo-name/

# Serve production build locally
npx http-server dist/jeffrey-portfolio -o
```

## 🐛 Troubleshooting

**Port already in use:**
```bash
ng serve --port 4201
```

**Clear cache and rebuild:**
```bash
rm -rf node_modules package-lock.json
npm install
ng build
```

**PDF download not working:**
- Check browser console for errors
- Ensure jspdf is installed: `npm install jspdf`

## 📚 Documentation

- [Full README](./README.md) - Complete documentation
- [Deployment Guide](./DEPLOYMENT.md) - Detailed deployment instructions
- [Angular Docs](https://angular.io) - Angular framework documentation

## 🎉 You're Ready!

Start customizing your portfolio and deploy it to show the world your skills!
