# BiteCourt — Mall Food Court Management System

A complete, responsive React.js frontend for a mall food court that serves **Veg** and
**Non-Veg junk food only** (no beverages, desserts, ice cream, coffee, or tea).

## Tech Stack
- React 19 + Vite
- React Router DOM (client-side routing)
- Axios (pre-wired service layer, ready for a Spring Boot backend)
- React Icons
- Plain CSS (CSS variables for theming, one stylesheet per component/page)

## Getting Started
```bash
npm install
npm run dev
```
Then open the printed local URL (usually `http://localhost:5173`).

To create a production build:
```bash
npm run build
npm run preview
```

## Demo Logins
- **Admin:** `admin@foodcourt.com` / `admin123` → redirects to `/admin/dashboard`
- **Customer:** Register a new account from `/register`, or just browse/order as a guest.

## Folder Structure
```
src/
  components/         Reusable UI: Navbar, Footer, FoodCard, CartItem, OrderCard, Loader, etc.
  components/admin/   Sidebar, FoodForm (shared by Add/Edit Food)
  pages/              Home, Menu, VegMenu, NonVegMenu, FoodDetails, Cart, Checkout, Orders, Login, Register
  pages/admin/        Dashboard, ManageFoods, AddFood, EditFood, ManageOrders
  layouts/            MainLayout (Navbar+Footer), AdminLayout (Sidebar)
  context/            CartContext, AuthContext (React Context + useReducer/useState)
  services/           api.js (Axios instance) + foodService, orderService, authService
  hooks/              useFoods, useDebounce
  utils/              formatPrice, orderStatus helpers
  data/               foods.json, reviews.json (local sample data)
```

## Routes
| Path | Page |
|---|---|
| `/` | Home |
| `/menu` | Full Menu (search + category + price filters) |
| `/veg` | Veg Menu |
| `/non-veg` | Non-Veg Menu |
| `/food/:id` | Food Details |
| `/cart` | Cart |
| `/checkout` | Checkout |
| `/orders` | Order tracking |
| `/login`, `/register` | Auth |
| `/admin/dashboard` | Admin dashboard cards |
| `/admin/foods` | Manage Foods (edit/delete/availability) |
| `/admin/foods/add`, `/admin/foods/edit/:id` | Add / Edit Food |
| `/admin/orders` | Manage Orders (status updates) |

## Connecting to a Real Backend (Spring Boot)
All data access goes through `src/services/*.js`. Each function currently reads local
JSON / localStorage but already contains the equivalent commented-out `axios` call, e.g.:

```js
async getAllFoods() {
  await delay();
  return foodsData;
  // return (await api.get('/foods')).data;
}
```

To go live:
1. Set `VITE_API_BASE_URL` in a `.env` file (defaults to `http://localhost:8080/api`).
2. Uncomment the `axios` line in each service function and remove the local-data line.
3. Implement matching REST endpoints on the Spring Boot side (`/foods`, `/orders`, `/auth/login`, `/auth/register`, etc.).

## Notes
- Cart and orders persist to `localStorage` so they survive a page refresh.
- Emoji icons are used in place of stock photography — swap the `image` field in
  `src/data/foods.json` for real image URLs whenever you have them.
- Payment method selection on Checkout is UI-only, per the project spec.
