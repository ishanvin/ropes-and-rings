# Ropes & Rings

## Supabase setup

Create a `.env.local` file from `.env.example` and add your Supabase project URL and anonymous key. Do not commit this file. `VITE_SUPABASE_PRODUCTS_BUCKET` defaults to `Products`; it must exactly match the bucket ID in that same Supabase project, including case.

The application reads products from the `products` table and uploads admin-selected images to the public `Products` Storage bucket. Run [products-policies.sql](./supabase/products-policies.sql) and [storage-policies.sql](./supabase/storage-policies.sql) in the Supabase SQL Editor so public reads and authenticated-admin product/image management work correctly.

The first URL in each product's `images` array is used for product cards and SEO; subsequent URLs remain available in the existing swipeable carousel.

### One-time admin role assignment

Copy `.env.admin.example` to `.env.admin.local`, add the project URL and **service role** key, then run:

```bash
node --env-file=.env.admin.local scripts/set-admin-role.mjs
```

The script updates only the specified user and is outside the frontend source tree. `.env.admin.local` is ignored by Git through the existing `*.local` rule; delete it after use.

### Admin authentication

`/admin`, product creation, editing, and deletion routes require a Supabase email/password session whose `app_metadata.role` is `admin`. Unauthenticated visitors are redirected to `/admin/login`; successful administrator logins are redirected to `/admin`. Create the administrator in Supabase Auth, then run the one-time role assignment script above.

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
