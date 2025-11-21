# BlurSell

Auto-blur photos for safe online selling. Automatically blur license plates, house numbers, and serial numbers from your selling photos.

## Technologies

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## Getting Started

### Prerequisites

- Node.js & npm (install with [nvm](https://github.com/nvm-sh/nvm#installing-and-updating))

### Installation

```sh
# Step 1: Clone the repository
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory
cd blursell-frontend

# Step 3: Install dependencies
npm install

# Step 4: Create environment file
# Create a .env file in the root directory with:
VITE_API_URL=https://blursell-backend.onrender.com

# Step 5: Start the development server
npm run dev
```

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_URL=https://blursell-backend.onrender.com
```

**Note:** For Vercel deployment, add this as an environment variable in your Vercel project settings.

## Development

The development server will start on `http://localhost:8080` with hot module replacement enabled.

## Building for Production

```sh
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

- `src/components/` - React components
- `src/pages/` - Page components
- `src/lib/` - Utility functions
- `src/hooks/` - Custom React hooks
- `public/` - Static assets
