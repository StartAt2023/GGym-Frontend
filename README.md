# GGymShopping

A modern fitness equipment e-commerce platform built with React, TypeScript, and Vite.

## Features

- User authentication (login/register)
- Product management (admin)
- Shopping cart functionality
- Checkout process with delivery date selection
- Responsive design
- Real-time order processing

## About GGymShopping

GGymShopping is your one-stop destination for professional fitness equipment. We offer high-quality strength training equipment, cardio machines, yoga accessories, and fitness wearables to help you achieve your fitness goals.

## Development

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create environment file:
   ```bash
   cp env.example .env
   ```

4. Start development server:
   ```bash
   npm run dev
   ```

## Deployment

### Option 1: Vercel (Recommended)

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Deploy to Vercel:
   ```bash
   vercel
   ```

3. Set environment variables in Vercel dashboard:
   - `VITE_API_BASE_URL`: Your backend API URL

### Option 2: Netlify

1. Build the project:
   ```bash
   npm run build
   ```

2. Deploy the `dist` folder to Netlify

3. Set environment variables in Netlify dashboard

### Option 3: GitHub Pages

1. Add to package.json:
   ```json
   {
     "homepage": "https://yourusername.github.io/your-repo-name",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

2. Install gh-pages:
   ```bash
   npm install --save-dev gh-pages
   ```

3. Deploy:
   ```bash
   npm run deploy
   ```

## Environment Variables

- `VITE_API_BASE_URL`: Backend API base URL (default: http://localhost:5000/api)

## Build

```bash
npm run build
```

The build output will be in the `dist` directory.

## Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: CSS3 with modern design patterns
- **State Management**: React Context API
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **Build Tool**: Vite

## Project Structure

```
src/
├── components/          # Reusable UI components
├── pages/              # Page components
│   ├── Home/           # Homepage
│   ├── Product/        # Product listing and details
│   ├── Cart/           # Shopping cart
│   ├── Checkout/       # Checkout process
│   ├── CheckoutSuccess/# Order success page
│   ├── Login/          # User authentication
│   └── Register/       # User registration
├── services/           # API services
├── store/              # State management (CartContext)
└── assets/             # Static assets
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
