#  Nithya Mart — Consolidated MERN Stack Enterprise Hub

> **Nithya Mart** is an all-in-one centralized multi-module e-commerce and utility platform developed by **MERN Stack Team 4**. It unifies **10 specialized sub-applications** under a high-performance React 19 architecture, powered by a central Express REST API backend and connected directly to **MongoDB Atlas Cloud Database**.

---

##  Live Deployment & Gateway Links

* Central Hub Live Web App: [https://nithyamart-mern-stack.onrender.com](https://nithyamart-mern-stack.onrender.com)
* Backend API Gateway: `http://localhost:5000/api`
* Health Check Endpoint: `/api/health`

---

##  System Architecture

Nithya Mart is built as a micro-frontend portal with a consolidated Express API Gateway:

```text
                     ┌─────────────────────────────────────────┐
                     │    NITHYA MART CENTRAL HUB PORTAL       │
                     │  (React 19 + Framer Motion Workspace)   │
                     └────────────────────┬────────────────────┘
                                          │
    ┌─────────────────────────────────────┼─────────────────────────────────────┐
    │                                     │                                     │
    ▼                                     ▼                                     ▼
┌──────────────┐                  ┌──────────────┐                  ┌──────────────┐
│  👜 BAG      │                  │  📚 BOOK     │                  │ 🍫 CHOCOLATES│
└──────────────┘                  └──────────────┘                  └──────────────┘
┌──────────────┐                  ┌──────────────┐                  ┌──────────────┐
│ 🎭 COSTUMES  │                  │ 🌸 FRAGRANCE │                  │ 🍔 BiteCourt │
└──────────────┘                  └──────────────┘                  └──────────────┘
┌──────────────┐                  ┌──────────────┐                  ┌──────────────┐
│ 🍦 ICECREAMS │                  │ ⚽ SPORTS    │                  │ 👟 SHOES     │
└──────────────┘                  └──────────────┘                  └──────────────┘
                                  ┌──────────────┐
                                  │ 🎟️ TICKET    │
                                  └──────────────┘
                                          │
                                          ▼
                     ┌─────────────────────────────────────────┐
                     │   CENTRAL EXPRESS 5 REST API GATEWAY    │
                     │         (Node.js + Mongoose)            │
                     └────────────────────┬────────────────────┘
                                          │
                                          ▼
                     ┌─────────────────────────────────────────┐
                     │      MONGODB ATLAS CLOUD DATABASE       │
                     │             ('mern_team_4')             │
                     └─────────────────────────────────────────┘
```

---

##  Submodules Overview & Catalog

Nithya Mart includes 10 self-contained, fully featured e-commerce & utility applications:

| # | Icon | Submodule | Category | Description & Features |
|---|---|---|---|---|
| 1 | 👜 | **[BAG](file:///c:/Nithin_Academic/MERN_Stack_Team_4/BAG)** | Shopping | Premium luxury bag boutique featuring handbags, office bags, travel gear, and leather accessories with category filters and cart management. |
| 2 | 📚 | **[BOOK](file:///c:/Nithin_Academic/MERN_Stack_Team_4/BOOK)** | Education | Online book store portal featuring genre categories, search filters, bestseller lists, and interactive book detail modals. |
| 3 | 🍫 | **[CHOCOLATES](file:///c:/Nithin_Academic/MERN_Stack_Team_4/CHOCOLATES)** | Food & Sweets | Artisanal confections store showcasing imported luxury chocolates, gold-foiled gift boxes, and shopping cart checkout. |
| 4 | 🎭 | **[COSTUMES](file:///c:/Nithin_Academic/MERN_Stack_Team_4/COSTUMES)** | Apparel | Costume rental and purchase center for festivals, theater, cosplay events, halloween, and costume parties. |
| 5 | 🌸 | **[FRAGRANCE](file:///c:/Nithin_Academic/MERN_Stack_Team_4/FRAGRANCE)** | Beauty | Luxury aromatics store listing designer perfumes, room sprays, pooja incense, scented candles, and essential oils. |
| 6 | 🍔 | **[Foood](file:///c:/Nithin_Academic/MERN_Stack_Team_4/Foood)** | Food Court | **BiteCourt**: Multi-kitchen food court ordering app featuring live specials, ratings, veg/non-veg filters, and cart. |
| 7 | 🍦 | **[IceCreams](file:///c:/Nithin_Academic/MERN_Stack_Team_4/IceCreams)** | Desserts | **Lulu Mart Bangalore**: Ibaco ice cream parlour menu with gelato scoops, celebration cakes, and hazelnut cold brews. |
| 8 | ⚽ | **[SPORTS](file:///c:/Nithin_Academic/MERN_Stack_Team_4/SPORTS)** | Fitness | **SportGear Apex Store**: Athletic Dri-FIT wear, jerseys, gear, coupon validation (`SPORT20`), and checkout calculation. |
| 9 | 👟 | **[Shoes](file:///c:/Nithin_Academic/MERN_Stack_Team_4/Shoes)** | Apparel | Trendy sneakers and athletic shoe catalog highlighting top footwear brands and interactive shopping features. |
| 10 | 🎟️ | **[TICKETBOOKING](file:///c:/Nithin_Academic/MERN_Stack_Team_4/TICKETBOOKING)** | Entertainment | Cinema ticket reservation system featuring interactive seat picking, movie showcases, and QR digital passes. |

---

## API Gateway Endpoints

The central Express server (`server/index.js`) provides centralized API services for all applications:

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Server & Database connection health check |
| `GET` | `/api/products` | Fetch all products (supports `category`, `gender`, `brand`, `search`, `minPrice`, `maxPrice`, `sort`) |
| `GET` | `/api/products/:id` | Fetch single product details with related recommendations |
| `GET` | `/api/products/meta/categories` | Fetch category, brand, and gender metadata lists |
| `POST` | `/api/orders/checkout` | Process order checkout, compute taxes, discounts, and tracking IDs |
| `POST` | `/api/orders/validate-coupon` | Validate promo codes (e.g. `SPORT20` for 20% off) |
| `POST` | `/api/products/seed` | Seed initial database items into MongoDB Atlas |

---

## Technology Stack

* **Frontend**: React 19, Vite 8, Framer Motion 12, React Router DOM v7, React Icons, CSS3.
* **Backend**: Node.js, Express 5, Mongoose 9, CORS, Dotenv.
* **Database**: MongoDB Atlas Cloud (`mern_team_4`).
* **Deployment**: Render / Vercel with automated multi-project compilation script.

---

## Getting Started Locally

### Prerequisites
- Node.js (v18.0.0 or higher)
- npm (v9.0.0 or higher)
- MongoDB Atlas Connection String (or local MongoDB)

### 1. Clone the Repository
```bash
git clone https://github.com/NKumar-B/NithyaMart_MERN_Stack.git
cd NithyaMart_MERN_Stack
```

### 2. Environment Setup
Create a `.env` file in `server/.env` and in the root directory:
```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.0mlxwcc.mongodb.net/mern_team_4?retryWrites=true&w=majority
PORT=5000
```

### 3. Install Dependencies & Start Application
```bash
# Install root dependencies
npm install

# Start both Express Backend Gateway & React Frontend Portal concurrently
npm start
```

* **Frontend Hub**: `http://localhost:5173`
* **Express Server**: `http://localhost:5000`

---

## Automated Multi-Project Build

To compile all 10 sub-applications and the main portal into the production `dist/` and `public/` directories:

```bash
npm run build-all
```

This automated build script (`scripts/build-all.js`):
1. Iterates through all 10 sub-directories.
2. Installs dependencies and executes `npm run build`.
3. Copies sub-application production assets into `public/<PROJECT_NAME>`.
4. Bundles the main React 19 Enterprise Portal into `dist/`.

---

## Contribution & Team Credits

Built by **MERN Stack Team 4**:

* **Badduluri Nithin Kumar** — Platform Architect & Lead Developer
* **Team 4 Contributors** — Specialized E-Commerce Submodule Developers

---

## License

This project is open-source and available under the [MIT License](LICENSE).
