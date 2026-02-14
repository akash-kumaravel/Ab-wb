# Project Structure Guide

## Folder Structure

```
project-root/
├── src/
│   ├── components/           # Shared components
│   │   ├── Header.tsx        # Logo, search, cart/wishlist
│   │   ├── Navigation.tsx    # Navigation menu
│   │   ├── Footer.tsx        # Footer section
│   │   ├── Layout.tsx        # Layout wrapper (Header + Nav + Footer)
│   │   └── index.ts          # Component exports
│   ├── pages/               # Page components
│   │   └── Home.tsx         # Home page with all sections
│   ├── constants.tsx        # Global constants
│   └── types.ts             # TypeScript type definitions
├── public/
│   └── assets/              # Images, icons, static files (add here)
├── App.tsx                  # Main app (router/layout wrapper)
├── index.tsx                # React entry point
├── types.ts                 # (original - can be deleted)
├── constants.tsx            # (original - can be deleted)
└── ...other files
```

## Component Architecture

### Layout Components (src/components/)
- **Header**: Logo, search bar, wishlist and cart icons
- **Navigation**: Main navigation menu with links
- **Footer**: Footer with links, newsletter, and company info
- **Layout**: Wrapper that combines Header, Navigation, and Footer

### Pages (src/pages/)
- **Home**: Home page with all sections and products

### Assets (public/assets/)
- Place all images, logos, and static files here
- Use paths like `/assets/image-name.jpg` in components

## How to Add New Pages

1. Create a new file in `src/pages/` (e.g., `Shop.tsx`)
2. Use the Layout component and add your page content
3. Update your router/App.tsx to include the new page

Example:
```tsx
// src/pages/Shop.tsx
import Layout from '../components/Layout';

const Shop: React.FC = () => (
  <Layout>
    {/* Your shop content here */}
  </Layout>
);

export default Shop;
```

## How to Add Images

1. Place images in `public/assets/` folder
2. Reference them using: `/assets/your-image.jpg`
3. Example: `<img src="/assets/logo.png" alt="Logo" />`

## Future Improvements

- Add routing library (React Router)
- Create more reusable sub-components
- Move page-specific constants to their respective pages
- Add environment variables for API endpoints
