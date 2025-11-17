# TodoReact

A modern React application built with Vite and Tailwind CSS.

## 🚀 Quick Start

### Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

## 📦 Deployment

### Deploy to Vercel

This project is optimized for Vercel deployment.

#### Option 1: Using Vercel CLI

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy to production
vercel --prod
```

#### Option 2: Using Vercel Dashboard

1. Push your code to GitHub
2. Go to [Vercel Dashboard](https://vercel.com/new)
3. Import your repository
4. Vercel will automatically detect the configuration
5. Click "Deploy"

### Environment Variables

If you need environment variables, create a `.env.local` file:

```env
VITE_API_URL=your_api_url_here
```

Add the same variables in Vercel Dashboard under "Settings" → "Environment Variables".

## 🛠️ Tech Stack

- **Framework:** React 18.2.0
- **Build Tool:** Vite 4.3.2
- **Styling:** Tailwind CSS 4.1.17
- **Language:** JavaScript (JSX)
- **Package Manager:** npm

## 📁 Project Structure

```
TodoReact/
├── public/              # Static assets
├── src/                 # Source code
│   ├── assets/         # Images, icons, etc.
│   ├── App.jsx         # Main App component
│   └── main.jsx        # Application entry point
├── vercel.json         # Vercel configuration
├── vite.config.js      # Vite configuration
└── package.json        # Dependencies and scripts
```

## 🔧 Configuration Files

- **vercel.json**: Vercel deployment configuration
- **vite.config.js**: Vite build configuration
- **.eslintrc.cjs**: ESLint rules
- **tailwind.config.js**: Tailwind CSS configuration (if exists)
- **postcss.config.js**: PostCSS configuration (if exists)

## 📝 License

This project is private and not licensed for public use.

## 🤝 Contributing

This is a private project. For contributions, please contact the repository owner.
