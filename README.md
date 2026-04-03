# ◈ ShopVault — Product Listing Page

A fully responsive e-commerce Product Listing Page (PLP) built with **React + Vite**. Features real product data from a free public API, user authentication, a shopping cart, advanced filtering, and a clean modular codebase.

---

## Live Demo

> Deploy to Netlify by dragging the `dist/` folder to [netlify.com/drop](https://netlify.com/drop) after running `npm run build`.

---

## Features

- **Product Listing Page** — Responsive grid/list view with 100+ real products
- **Live API Integration** — Fetches data from [DummyJSON](https://dummyjson.com) (free, no key required)
- **Search** — Real-time product search with debounced API queries
- **Filtering** — Filter by category, price range, and minimum rating
- **Sorting** — Sort by featured, price (low/high), rating, and name A–Z
- **Pagination** — Page-based navigation with smart ellipsis rendering
- **Shopping Cart** — Slide-in drawer with quantity controls, persistent via localStorage
- **Wishlist** — Toggle per-card wishlist with visual feedback
- **User Authentication** — Sign Up and Sign In with form validation, stored securely in localStorage
- **Toast Notifications** — Non-intrusive feedback for all user actions
- **Skeleton Loading** — Shimmer placeholders while products load
- **Responsive Design** — Works on mobile (320px), tablet, and desktop (1400px+)
- **Grid & List View Toggle** — Switch between card grid and single-column list
- **CSS Modules** — Scoped styles per component, zero class name collisions

---

## Tech Stack

| Layer     | Technology                                |
| --------- | ----------------------------------------- |
| Framework | React 18                                  |
| Bundler   | Vite 5                                    |
| Routing   | React Router DOM v6                       |
| Styling   | CSS Modules + CSS Variables               |
| API       | DummyJSON (free mock REST API)            |
| Auth      | localStorage-based (simulated)            |
| Fonts     | Playfair Display + DM Sans (Google Fonts) |

---

## Project Structure

```
plp-app/
├── index.html                        # HTML entry point
├── vite.config.js                    # Vite configuration
├── package.json                      # Dependencies and scripts
└── src/
    ├── main.jsx                      # React root + BrowserRouter
    ├── App.jsx                       # Route definitions + global layout
    │
    ├── assets/
    │   └── styles/
    │       └── global.css            # CSS variables, resets, animations
    │
    ├── context/
    │   ├── AuthContext.jsx           # Auth state: signIn, signUp, signOut
    │   ├── CartContext.jsx           # Cart state: add, remove, updateQty
    │   └── ToastContext.jsx          # Toast notification system
    │
    ├── services/
    │   └── api.js                    # All DummyJSON API calls (products, categories)
    │
    ├── hooks/
    │   └── useProducts.js            # Custom hook: fetch + sort products
    │
    ├── components/
    │   ├── Header/
    │   │   ├── Header.jsx            # Sticky nav, search bar, cart icon, auth
    │   │   └── Header.module.css
    │   ├── Sidebar/
    │   │   ├── Sidebar.jsx           # Category list, price range, rating filters
    │   │   └── Sidebar.module.css
    │   ├── ProductGrid/
    │   │   ├── ProductGrid.jsx       # Toolbar, sort, view toggle, pagination
    │   │   └── ProductGrid.module.css
    │   ├── ProductCard/
    │   │   ├── ProductCard.jsx       # Card with hover, wishlist, quick-add
    │   │   └── ProductCard.module.css
    │   ├── Cart/
    │   │   ├── CartDrawer.jsx        # Slide-in cart with qty controls
    │   │   └── CartDrawer.module.css
    │   ├── Auth/
    │   │   ├── AuthForm.jsx          # Sign In / Sign Up form with validation
    │   │   └── AuthForm.module.css
    │   └── Footer/
    │       ├── Footer.jsx            # Multi-column footer with newsletter
    │       └── Footer.module.css
    │
    └── pages/
        ├── HomePage.jsx              # Hero section, category chips, featured products
        ├── HomePage.module.css
        ├── ProductsPage.jsx          # Full PLP: banner + sidebar + grid
        └── ProductsPage.module.css
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- npm v9 or higher

### Installation

```bash
# 1. Unzip (if downloaded) or clone the repo
unzip plp-app.zip
cd plp-app

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

The app will be available at **http://localhost:5173**

### Build for Production

```bash
npm run build
```

The optimised output will be in the `dist/` folder.

### Preview the Production Build

```bash
npm run preview
```

---

## 🌐 Deployment

````

### Vercel

```bash
npm install -g vercel
vercel
````

### GitHub Pages

```bash
# In vite.config.js, add: base: '/your-repo-name/'
npm run build
npx gh-pages -d dist
```

---

## API Reference

This project uses **[DummyJSON](https://dummyjson.com)** — a free, open, CORS-enabled mock REST API. No API key or account is required.

| Endpoint                         | Usage                      |
| -------------------------------- | -------------------------- |
| `GET /products?limit=100`        | Fetch all products         |
| `GET /products/search?q={query}` | Search products by keyword |
| `GET /products/category/{name}`  | Fetch products by category |
| `GET /products/category-list`    | Fetch all category names   |

All API calls are centralised in `src/services/api.js`. To swap in a different API, only that file needs to be updated.

---

## Authentication

Authentication is **simulated client-side** using `localStorage` for demonstration purposes.

- User accounts are stored in `localStorage` under the key `plp_users`
- The active session is stored under `plp_user`
- Passwords are stored as plain text in localStorage — this is intentional for a demo and **not suitable for production**

**For production**, replace `src/context/AuthContext.jsx` with calls to a real backend (e.g. Firebase Auth, Supabase, or your own JWT API). The rest of the app consumes the `useAuth()` hook and requires no other changes.

---

## Responsive Breakpoints

| Breakpoint       | Layout                                               |
| ---------------- | ---------------------------------------------------- |
| `< 400px`        | 2-column product grid                                |
| `400px – 640px`  | 2–3 column grid, search hidden in header             |
| `640px – 900px`  | Auto-fill grid, sidebar hidden (filter button shown) |
| `900px – 1024px` | Sidebar visible, nav hidden                          |
| `> 1024px`       | Full desktop: sidebar + nav + search                 |

---

## Theming & Customisation

All design tokens are defined as CSS variables in `src/assets/styles/global.css`:

```css
:root {
  --color-accent: #c8502a; /* Primary brand colour */
  --color-bg: #faf9f7; /* Page background */
  --color-text-primary: #1a1714; /* Main text */
  --font-display: "Playfair Display", serif;
  --font-body: "DM Sans", sans-serif;
  /* ... */
}
```

To change the brand colour across the entire app, update `--color-accent` in one place.

---

## Key Components

### `useProducts` Hook

Accepts `{ category, search, sort, page, limit }` and returns `{ products, categories, total, loading, error }`. Handles all data fetching and sorting logic.

### `AuthContext`

Provides `{ user, signIn, signUp, signOut }` to the whole app. Wrap any component with `useAuth()` to access the current user.

### `CartContext`

Provides `{ items, addItem, removeItem, updateQty, clearCart, totalCount, totalPrice }`. Cart state persists across page refreshes via localStorage.

### `api.js`

Single source of truth for all API communication. Exports `fetchProducts`, `fetchCategories`, and `fetchProductById`. Normalises API responses into a consistent product shape.

---

## 📋 Available Scripts

| Script            | Description                                  |
| ----------------- | -------------------------------------------- |
| `npm run dev`     | Start development server at localhost:5173   |
| `npm run build`   | Build optimised production bundle to `dist/` |
| `npm run preview` | Serve the production build locally           |

---

## Roadmap / Possible Extensions

- [ ] Product detail page (`/products/:id`)
- [ ] Persistent wishlist with localStorage
- [ ] Real backend authentication (Firebase / Supabase)
- [ ] Checkout flow with order summary
- [ ] Dark mode toggle
- [ ] Infinite scroll as an alternative to pagination
- [ ] Unit tests with Vitest + React Testing Library


---

## Acknowledgements

- [DummyJSON](https://dummyjson.com) — free mock product API
- [Google Fonts](https://fonts.google.com) — Playfair Display & DM Sans
- [Vite](https://vitejs.dev) — lightning-fast build tool
- [React Router](https://reactrouter.com) — client-side routing
