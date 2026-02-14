# AUTIMA - Textile Machinery E-commerce Platform

## 📁 Project Structure

```
project-root/
├── src/
│   ├── components/              # Reusable shared components
│   │   ├── Header.tsx          # Logo, search, cart/wishlist
│   │   ├── Navigation.tsx       # Main navigation menu
│   │   ├── Footer.tsx           # Footer with links and newsletter
│   │   ├── Layout.tsx           # Layout wrapper (Header + Nav + Footer)
│   │   └── index.ts             # Component exports
│   ├── pages/                   # Page components
│   │   └── Home.tsx             # Home page with all sections
│   ├── constants.tsx            # Global data and constants
│   └── types.ts                 # TypeScript type definitions
├── public/
│   └── assets/                  # Images, logos, and static files
├── App.tsx                      # Main app component (entry point)
├── index.tsx                    # React DOM initialization
├── index.html                   # HTML template
├── vite.config.ts               # Vite configuration
├── tsconfig.json                # TypeScript configuration
└── package.json                 # Dependencies and scripts
```

## 🎯 Architecture Overview

### App Flow
```
index.tsx (entry point)
    ↓
App.tsx (renders Layout + Home)
    ↓
Layout (Header + Navigation + Content + Footer)
    ↓
Home (page content with sections)
```

### Component Hierarchy
- **Layout** (wrapper)
  - Header (contains SearchBar + HeaderIcons)
  - Navigation
  - Page Content (Home)
  - Footer (contains FooterAbout + FooterLinks + FooterNewsletter + FooterBottom)

## 🚀 Getting Started

### Install Dependencies
```bash
npm install
```

### Development Mode
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

## 📄 File Descriptions

### src/components/
- **Header.tsx** - Top navigation with AUTIMA logo, search bar, wishlist, and cart
- **Navigation.tsx** - Secondary navigation with department menu and links
- **Footer.tsx** - Footer with company info, links, and newsletter subscription
- **Layout.tsx** - Main layout wrapper that combines all shared components with GSAP animations
- **index.ts** - Exports all components for easy importing

### src/pages/
- **Home.tsx** - Complete home page with sections:
  - Sidebar (featured categories)
  - Hero section
  - Trust badges
  - Trending products
  - Popular categories
  - Promotional banners
  - Special offers
  - Category mini lists
  - Recommendation section

### src/
- **constants.tsx** - Global data (product lists, categories, trust badges, etc.)
- **types.ts** - TypeScript interfaces for Product, Category, TrustBadge

## 📸 Using Images

Place images in the `public/assets/` folder and reference them as:
```tsx
<img src="/assets/image-name.jpg" alt="Description" />
```

## 🔧 Adding New Pages

1. Create a new file in `src/pages/` (e.g., `Shop.tsx`)
2. Import Layout: `import Layout from '../components/Layout';`
3. Wrap your content:
```tsx
const Shop: React.FC = () => (
  <Layout>
    {/* Your shop content */}
  </Layout>
);
export default Shop;
```
4. Update `App.tsx` to include the new page

## 🎨 Customization

### Colors
- Primary: Blue (#3b82f6)
- Background: Black (#000000)
- Accent: Dark gray (#111111)

### Fonts
- Font Family: Inter (from Google Fonts)
- Weights: 300, 400, 500, 600, 700, 800

### Animations
Uses GSAP (GreenSock) ScrollTrigger for scroll animations. Configured in Layout.tsx

## 🔌 Dependencies

- **React** - UI framework
- **GSAP** - Animation library
- **Lucide React** - Icon library
- **Tailwind CSS** - Utility-first CSS
- **Vite** - Build tool

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints: sm, md, lg
- Uses Tailwind responsive classes

## 📝 Code Style

- TypeScript for type safety
- Functional components with React FC
- Component-based architecture
- Clear separation of concerns

---

**Last Updated:** February 14, 2026

