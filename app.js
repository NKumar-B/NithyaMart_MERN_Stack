// Elysian Luxe - App Logic

// Product Catalog
const products = [
  {
    id: 1,
    name: "Matte Revolution Lipstick - Velvet Rose",
    brand: "MAC",
    category: "Makeup",
    price: 1850,
    originalPrice: 2200,
    discount: 15,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=500&auto=format&fit=crop&q=80",
    description: "A rich, creamy matte lipstick that delivers high-pigment color with a velvety smooth finish. Long-lasting, hydrating, and smudge-proof.",
    ingredients: "Octyldodecanol, Ricinus Communis (Castor) Seed Oil, Silica, Tricaprylyl Citrate, Ozonized Olive Oil, Candelilla Cera, Copernicia Cerifera.",
    isTrending: true,
    isBestSeller: true,
    isNewArrival: false,
    isLimitedOffer: false
  },
  {
    id: 2,
    name: "Hydro-Plump Hyaluronic Acid Serum",
    brand: "The Derma Co.",
    category: "Skincare",
    price: 649,
    originalPrice: 799,
    discount: 18,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&auto=format&fit=crop&q=80",
    description: "Formulated with 2% pure Hyaluronic Acid and Rosehip extract. Deeply hydrates, reduces fine lines, and restores skin barrier health.",
    ingredients: "Aqua, Hyaluronic Acid, Rosehip Extract, Panthenol, Phenoxyethanol, Ethylhexylglycerin, Glycerin.",
    isTrending: false,
    isBestSeller: true,
    isNewArrival: true,
    isLimitedOffer: false
  },
  {
    id: 3,
    name: "Luxury Elixir Eau De Parfum",
    brand: "Huda Beauty",
    category: "Fragrances",
    price: 5200,
    originalPrice: 6500,
    discount: 20,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=500&auto=format&fit=crop&q=80",
    description: "An opulent scent blending Turkish rose, patchouli, amber, and vanilla pod notes. Capturing the essence of Parisian nights.",
    ingredients: "Alcohol Denat., Fragrance (Parfum), Water (Aqua), Benzyl Salicylate, Limonene, Linalool, Coumarin.",
    isTrending: true,
    isBestSeller: false,
    isNewArrival: false,
    isLimitedOffer: true
  },
  {
    id: 4,
    name: "Argan Oil Intense Repair Hair Mask",
    brand: "L'Oréal Paris",
    category: "Hair Care",
    price: 899,
    originalPrice: 1199,
    discount: 25,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=500&auto=format&fit=crop&q=80",
    description: "Deep conditioning treatment infused with pure Moroccan Argan Oil. Restores shine, tames frizz, and repairs heat-damaged cuticles.",
    ingredients: "Aqua, Cetearyl Alcohol, Behentrimonium Chloride, Argania Spinosa Kernel Oil, Glycerin, Hydrolyzed Wheat Protein.",
    isTrending: false,
    isBestSeller: true,
    isNewArrival: false,
    isLimitedOffer: false
  },
  {
    id: 5,
    name: "Precision Master Eye Brush Set",
    brand: "Nykaa",
    category: "Beauty Tools",
    price: 1250,
    originalPrice: 1599,
    discount: 21,
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500&auto=format&fit=crop&q=80",
    description: "A set of 5 professional-grade synthetic makeup brushes for blending, lining, shading, and perfecting any eye look.",
    ingredients: "Premium Synthetic Bristles, Solid Wood Handles, Rose Gold Aluminum Ferrules.",
    isTrending: false,
    isBestSeller: false,
    isNewArrival: true,
    isLimitedOffer: false
  },
  {
    id: 6,
    name: "Charcoal Face Scrub with Mint",
    brand: "Mamaearth",
    category: "Men's Grooming",
    price: 349,
    originalPrice: 399,
    discount: 12,
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1617897903246-719242758050?w=500&auto=format&fit=crop&q=80",
    description: "Activated charcoal draws out toxins and oil from deep within pores. Menthol leaves a cooling sensation post-scrub.",
    ingredients: "Activated Charcoal, Menthol, Walnut Beads, Tea Tree Oil, Glycerin, Aloe Vera Extract.",
    isTrending: false,
    isBestSeller: false,
    isNewArrival: false,
    isLimitedOffer: false
  },
  {
    id: 7,
    name: "Organic Rosewater Face Mist",
    brand: "Mamaearth",
    category: "Organic Products",
    price: 299,
    originalPrice: 349,
    discount: 14,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=500&auto=format&fit=crop&q=80",
    description: "100% natural steam-distilled rosewater. Refreshes skin, tightens pores, and balances pH levels instantly.",
    ingredients: "100% Pure Steam-Distilled Rosewater (Rosa Damascena distillate).",
    isTrending: true,
    isBestSeller: false,
    isNewArrival: true,
    isLimitedOffer: false
  },
  {
    id: 8,
    name: "Fit Me Matte+Poreless Foundation",
    brand: "Maybelline",
    category: "Makeup",
    price: 549,
    originalPrice: 699,
    discount: 21,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500&auto=format&fit=crop&q=80",
    description: "Lightweight foundation that mattifies and refines pores for a natural, seamless finish. Matches skin tone and texture.",
    ingredients: "Aqua, Cyclohexasiloxane, Nylon-12, Isododecane, Alcohol Denat., Cyclopentasiloxane.",
    isTrending: true,
    isBestSeller: true,
    isNewArrival: false,
    isLimitedOffer: false
  },
  {
    id: 9,
    name: "Absolute Skin Gloss Gel Cream",
    brand: "Lakmé",
    category: "Skincare",
    price: 499,
    originalPrice: 599,
    discount: 16,
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500&auto=format&fit=crop&q=80",
    description: "Mineral-laden gel cream that gives a high gloss, hydrated finish. Locks in moisture without making the skin feel greasy.",
    ingredients: "Aqua, Glycerin, Cyclopentasiloxane, Niacinamide, Mineral Oil, Tocopheryl Acetate.",
    isTrending: false,
    isBestSeller: false,
    isNewArrival: true,
    isLimitedOffer: true
  },
  {
    id: 10,
    name: "Rose Quartz Face Roller & Gua Sha",
    brand: "Nykaa",
    category: "Beauty Tools",
    price: 1899,
    originalPrice: 2499,
    discount: 24,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1617897903246-719242758050?w=500&auto=format&fit=crop&q=80",
    description: "Premium natural rose quartz stone tool kit designed to promote lymphatic drainage, reduce puffiness, and tone facial muscles.",
    ingredients: "100% Genuine Rose Quartz Stone, Sturdy Noise-Free Metal Frame.",
    isTrending: true,
    isBestSeller: true,
    isNewArrival: false,
    isLimitedOffer: false
  },
  {
    id: 11,
    name: "Hydrating Aloe Nourish Shampoo",
    brand: "Mamaearth",
    category: "Organic Products",
    price: 449,
    originalPrice: 499,
    discount: 10,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=500&auto=format&fit=crop&q=80",
    description: "Sulfate-free organic shampoo enriched with Aloe Vera and Wheat Protein. Feeds the hair with intense nourishment and bounce.",
    ingredients: "Organic Aloe Vera Extract, Hydrolyzed Wheat Protein, Tea Tree Oil, Decyl Glucoside.",
    isTrending: false,
    isBestSeller: false,
    isNewArrival: false,
    isLimitedOffer: false
  },
  {
    id: 12,
    name: "Premium Oud Wood Cologne",
    brand: "MAC",
    category: "Fragrances",
    price: 7500,
    originalPrice: 9500,
    discount: 21,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=500&auto=format&fit=crop&q=80",
    description: "A rare and sophisticated fragrance featuring smokey oud wood, sandalwood, rosewood, eastern spices, and amber.",
    ingredients: "Alcohol Denat., Oud Wood Extract, Vetiver, Sandalwood Essential Oil, Cardamom, Benzoin.",
    isTrending: true,
    isBestSeller: false,
    isNewArrival: true,
    isLimitedOffer: true
  }
];

// App State
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
let selectedCategory = 'all';
let maxPrice = 8000;
let searchQuery = '';
let currentViewProduct = null;

// Initialize on DOM Load
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  renderProducts();
  renderFeaturedCategories();
  renderBestSellers();
  renderNewArrivals();
  renderTrendingProducts();
  renderLimitedOffers();
  updateCartCounters();
  updateWishlistCounters();
  initEventListeners();
  initCountdownTimer();
});

// Theme Management
function initTheme() {
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);
}

// Toggle Theme
function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
  const icon = document.querySelector('#theme-toggle-btn i');
  if (icon) {
    if (theme === 'dark') {
      icon.className = 'fa-solid fa-sun';
    } else {
      icon.className = 'fa-solid fa-moon';
    }
  }
}

// Render Products Grid (Main Shop Section)
function renderProducts() {
  const container = document.getElementById('products-grid');
  if (!container) return;

  const filtered = products.filter(p => {
    const matchesCategory = selectedCategory === 'all' || p.category.toLowerCase().replace(/\s+/g, '-') === selectedCategory;
    const matchesPrice = p.price <= maxPrice;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesPrice && matchesSearch;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="col-12 text-center py-5">
        <i class="fa-solid fa-magnifying-glass fa-3x text-muted mb-3"></i>
        <h5 class="fw-bold">No products found</h5>
        <p class="text-muted">Try adjusting your filters or search terms.</p>
        <button class="btn btn-gold btn-sm mt-2" onclick="resetFilters()">Reset All Filters</button>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(p => createProductCardHtml(p)).join('');
}

// Render Best Sellers
function renderBestSellers() {
  const container = document.getElementById('bestselling-products-grid');
  if (!container) return;

  const bestSellers = products.filter(p => p.isBestSeller);
  container.innerHTML = bestSellers.map(p => createProductCardHtml(p)).join('');
}

// Render New Arrivals
function renderNewArrivals() {
  const container = document.getElementById('newarrivals-products-grid');
  if (!container) return;

  const newArrivals = products.filter(p => p.isNewArrival);
  container.innerHTML = newArrivals.map(p => createProductCardHtml(p)).join('');
}

// Render Trending Products
function renderTrendingProducts() {
  const container = document.getElementById('trending-products-grid');
  if (!container) return;

  const trending = products.filter(p => p.isTrending);
  container.innerHTML = trending.map(p => createProductCardHtml(p)).join('');
}

// Render Limited Time Offers
function renderLimitedOffers() {
  const container = document.getElementById('limited-offers-grid');
  if (!container) return;

  const limited = products.filter(p => p.isLimitedOffer);
  container.innerHTML = limited.map(p => createProductCardHtml(p)).join('');
}

// Generate stars HTML
function getRatingStars(rating) {
  let stars = '';
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  
  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      stars += '<i class="fa-solid fa-star text-gold"></i>';
    } else if (i === fullStars && halfStar) {
      stars += '<i class="fa-solid fa-star-half-stroke text-gold"></i>';
    } else {
      stars += '<i class="fa-regular fa-star text-muted"></i>';
    }
  }
  return stars;
}

// Helper to create HTML for a single product card
function createProductCardHtml(product) {
  const isWishlisted = wishlist.includes(product.id);
  const wishlistClass = isWishlisted ? 'fa-solid text-danger animate__animated animate__heartBeat' : 'fa-regular';
  
  return `
    <div class="col-6 col-md-4 col-lg-3 mb-4 product-card-wrapper" data-aos="fade-up">
      <div class="card h-100 product-card border-0 shadow-sm rounded-4 overflow-hidden position-relative">
        <span class="badge bg-gold position-absolute top-0 start-0 m-3 z-3 shadow-sm">-${product.discount}%</span>
        
        <button class="btn btn-wishlist position-absolute top-0 end-0 m-3 z-3 shadow-sm border-0 rounded-circle d-flex align-items-center justify-content-center" onclick="toggleWishlist(${product.id})" style="width: 35px; height: 35px; background: rgba(255,255,255,0.8); backdrop-filter: blur(4px);">
          <i class="${wishlistClass} fa-heart"></i>
        </button>

        <div class="product-img-container overflow-hidden position-relative bg-light" style="padding-top: 100%;">
          <img src="${product.image}" class="card-img-top img-fluid product-img transition-all duration-300 position-absolute top-0 start-0 w-100 h-100 object-fit-cover" alt="${product.name}">
          <div class="product-overlay position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center gap-2 opacity-0 transition-all duration-300">
            <button class="btn btn-light btn-sm shadow rounded-pill px-3 py-2 fw-semibold" onclick="openQuickView(${product.id})">
              <i class="fa-solid fa-eye me-1 text-gold"></i> Quick View
            </button>
          </div>
        </div>

        <div class="card-body p-3 d-flex flex-column">
          <div class="d-flex justify-content-between align-items-start mb-1">
            <span class="product-brand text-uppercase text-gold font-poppins fw-semibold font-xs" style="font-size: 0.75rem;">${product.brand}</span>
            <span class="product-category text-muted font-xs" style="font-size: 0.75rem;">${product.category}</span>
          </div>
          <h6 class="card-title product-title fw-bold text-truncate-2 mb-2 flex-grow-1" style="font-size: 0.9rem; line-height: 1.3;">${product.name}</h6>
          
          <div class="product-rating mb-2" style="font-size: 0.8rem;">
            ${getRatingStars(product.rating)}
            <span class="text-muted font-xs ms-1">(${product.rating})</span>
          </div>

          <div class="d-flex align-items-center justify-content-between mt-auto pt-2">
            <div>
              <span class="product-price fw-bold text-primary" style="font-size: 1.1rem; color: var(--gold-dark) !important;">₹${product.price}</span>
              <span class="product-old-price text-muted text-decoration-line-through font-xs ms-2" style="font-size: 0.75rem;">₹${product.originalPrice}</span>
            </div>
            <button class="btn btn-gold-outline btn-sm rounded-pill py-1 px-3 transition-all font-xs fw-semibold" onclick="addToCart(${product.id})" style="font-size: 0.75rem;">
              <i class="fa-solid fa-cart-plus me-1"></i> Add
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}

// Render Categories Bar on Homepage
function renderFeaturedCategories() {
  const container = document.getElementById('featured-categories-row');
  if (!container) return;

  const categories = [
    { name: "Makeup", icon: "fa-solid fa-palette", image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300&auto=format&fit=crop&q=80" },
    { name: "Skincare", icon: "fa-solid fa-droplet", image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=300&auto=format&fit=crop&q=80" },
    { name: "Hair Care", icon: "fa-solid fa-wind", image: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=300&auto=format&fit=crop&q=80" },
    { name: "Fragrances", icon: "fa-solid fa-spray-can-sparkles", image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=300&auto=format&fit=crop&q=80" },
    { name: "Beauty Tools", icon: "fa-solid fa-scissors", image: "https://images.unsplash.com/photo-1617897903246-719242758050?w=300&auto=format&fit=crop&q=80" },
    { name: "Men's Grooming", icon: "fa-solid fa-user-tie", image: "https://images.unsplash.com/photo-1617897903246-719242758050?w=300&auto=format&fit=crop&q=80" },
    { name: "Organic Products", icon: "fa-solid fa-leaf", image: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=300&auto=format&fit=crop&q=80" }
  ];

  container.innerHTML = categories.map(cat => {
    const slug = cat.name.toLowerCase().replace(/\s+/g, '-');
    return `
      <div class="col-6 col-sm-4 col-md-3 col-lg-2 mb-4" onclick="selectCategory('${slug}')" style="cursor: pointer;">
        <div class="category-card text-center p-3 rounded-4 shadow-sm border-0 transition-all duration-300">
          <div class="category-img-wrapper rounded-circle overflow-hidden mb-3 mx-auto shadow-sm" style="width: 80px; height: 80px;">
            <img src="${cat.image}" class="w-100 h-100 object-fit-cover transition-all" alt="${cat.name}">
          </div>
          <i class="${cat.icon} fa-lg text-gold mb-2 d-block"></i>
          <h6 class="fw-bold mb-0 text-dark category-title" style="font-size: 0.9rem;">${cat.name}</h6>
        </div>
      </div>
    `;
  }).join('');
}

// Action handlers
function selectCategory(categorySlug) {
  selectedCategory = categorySlug;
  
  // Highlight active category tab in Shop filters section
  const buttons = document.querySelectorAll('.filter-btn');
  buttons.forEach(btn => {
    if (btn.getAttribute('data-category') === categorySlug) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  renderProducts();

  // Scroll smoothly to shop section if clicked from categories list
  const shopSection = document.getElementById('shop-section');
  if (shopSection) {
    shopSection.scrollIntoView({ behavior: 'smooth' });
  }
}

// Price range handler
function handlePriceFilter(val) {
  maxPrice = parseInt(val);
  document.getElementById('price-val-display').innerText = `₹${val}`;
  renderProducts();
}

// Search handler
function handleSearch(val) {
  searchQuery = val;
  renderProducts();
}

// Reset filters
function resetFilters() {
  selectedCategory = 'all';
  maxPrice = 8000;
  searchQuery = '';
  
  const searchInput = document.getElementById('product-search-input');
  if (searchInput) searchInput.value = '';
  
  const priceSlider = document.getElementById('price-range-slider');
  if (priceSlider) priceSlider.value = 8000;
  
  const priceDisplay = document.getElementById('price-val-display');
  if (priceDisplay) priceDisplay.innerText = `₹8000`;

  const buttons = document.querySelectorAll('.filter-btn');
  buttons.forEach(btn => {
    if (btn.getAttribute('data-category') === 'all') {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  renderProducts();
}

// Wishlist Functionality
function toggleWishlist(productId) {
  const index = wishlist.indexOf(productId);
  const product = products.find(p => p.id === productId);
  if (!product) return;

  if (index === -1) {
    wishlist.push(productId);
    showToast(`${product.name} added to Wishlist!`, 'success');
  } else {
    wishlist.splice(index, 1);
    showToast(`${product.name} removed from Wishlist!`, 'info');
  }

  localStorage.setItem('wishlist', JSON.stringify(wishlist));
  updateWishlistCounters();
  renderProducts();
  renderBestSellers();
  renderNewArrivals();
  renderTrendingProducts();
  renderLimitedOffers();
}

function updateWishlistCounters() {
  const counters = document.querySelectorAll('.wishlist-counter');
  counters.forEach(c => {
    c.innerText = wishlist.length;
    c.style.display = wishlist.length > 0 ? 'inline-block' : 'none';
  });
}

// Cart Functionality
function addToCart(productId, qty = 1) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const existingItem = cart.find(item => item.id === productId);
  if (existingItem) {
    existingItem.quantity += qty;
  } else {
    cart.push({ ...product, quantity: qty });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCounters();
  renderCartItems();
  showToast(`${product.name} added to cart!`, 'success');
}

function updateCartCounters() {
  const counters = document.querySelectorAll('.cart-counter');
  const count = cart.reduce((acc, curr) => acc + curr.quantity, 0);
  counters.forEach(c => {
    c.innerText = count;
    c.style.display = count > 0 ? 'inline-block' : 'none';
  });
}

function changeCartQty(productId, amount) {
  const item = cart.find(i => i.id === productId);
  if (!item) return;

  item.quantity += amount;
  if (item.quantity <= 0) {
    cart = cart.filter(i => i.id !== productId);
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCounters();
  renderCartItems();
}

function removeCartItem(productId) {
  const item = cart.find(i => i.id === productId);
  cart = cart.filter(i => i.id !== productId);
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCounters();
  renderCartItems();
  if (item) {
    showToast(`${item.name} removed from cart!`, 'info');
  }
}

function renderCartItems() {
  const container = document.getElementById('cart-items-container');
  const totalContainer = document.getElementById('cart-total-display');
  const subtotalDisplay = document.getElementById('cart-subtotal');
  
  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="text-center py-5">
        <i class="fa-solid fa-basket-shopping fa-3x text-muted mb-3 d-block"></i>
        <h5 class="fw-bold">Your cart is empty</h5>
        <p class="text-muted">Explore our luxury cosmetic catalog and add products to start shopping.</p>
      </div>
    `;
    if (totalContainer) totalContainer.style.display = 'none';
    return;
  }

  if (totalContainer) totalContainer.style.display = 'block';

  let subtotal = 0;
  
  container.innerHTML = cart.map(item => {
    const itemTotal = item.price * item.quantity;
    subtotal += itemTotal;
    return `
      <div class="cart-item d-flex align-items-center mb-3 pb-3 border-bottom">
        <div class="cart-item-img rounded overflow-hidden shadow-sm" style="width: 70px; height: 70px; flex-shrink: 0; background: var(--bg-card);">
          <img src="${item.image}" class="w-100 h-100 object-fit-cover" alt="${item.name}">
        </div>
        <div class="cart-item-details ms-3 flex-grow-1">
          <h6 class="mb-0 fw-bold text-truncate" style="max-width: 160px; font-size: 0.9rem;">${item.name}</h6>
          <span class="text-gold font-xs text-uppercase fw-semibold" style="font-size: 0.7rem;">${item.brand}</span>
          <div class="d-flex align-items-center justify-content-between mt-1">
            <span class="fw-semibold text-primary font-sm">₹${item.price}</span>
            <div class="qty-btn-group d-flex align-items-center border rounded-pill px-2" style="background: var(--bg-body);">
              <button class="btn btn-sm border-0 p-1 d-flex align-items-center justify-content-center" onclick="changeCartQty(${item.id}, -1)">
                <i class="fa-solid fa-minus font-xs" style="font-size: 0.65rem;"></i>
              </button>
              <span class="mx-2 font-sm fw-bold">${item.quantity}</span>
              <button class="btn btn-sm border-0 p-1 d-flex align-items-center justify-content-center" onclick="changeCartQty(${item.id}, 1)">
                <i class="fa-solid fa-plus font-xs" style="font-size: 0.65rem;"></i>
              </button>
            </div>
          </div>
        </div>
        <button class="btn btn-link text-danger border-0 p-2 ms-2" onclick="removeCartItem(${item.id})">
          <i class="fa-solid fa-trash-can"></i>
        </button>
      </div>
    `;
  }).join('');

  if (subtotalDisplay) {
    subtotalDisplay.innerText = `₹${subtotal}`;
  }
}

// Quick View Modal
function openQuickView(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  currentViewProduct = product;
  
  document.getElementById('qv-title').innerText = product.name;
  document.getElementById('qv-brand').innerText = product.brand;
  document.getElementById('qv-category').innerText = product.category;
  document.getElementById('qv-price').innerText = `₹${product.price}`;
  document.getElementById('qv-original-price').innerText = `₹${product.originalPrice}`;
  document.getElementById('qv-discount').innerText = `-${product.discount}%`;
  document.getElementById('qv-description').innerText = product.description;
  document.getElementById('qv-ingredients').innerText = product.ingredients || "Elysian signature blend.";
  document.getElementById('qv-stars').innerHTML = getRatingStars(product.rating) + ` <span class="text-muted font-xs">(${product.rating} / 5)</span>`;
  
  const imgElement = document.getElementById('qv-image');
  if (imgElement) imgElement.src = product.image;

  // Add click handler to add-to-cart in modal
  const addBtn = document.getElementById('qv-add-btn');
  if (addBtn) {
    addBtn.onclick = () => {
      const qtyInput = document.getElementById('qv-quantity');
      const qty = qtyInput ? parseInt(qtyInput.value) : 1;
      addToCart(product.id, qty);
      const modalInstance = bootstrap.Modal.getInstance(document.getElementById('quickViewModal'));
      if (modalInstance) modalInstance.hide();
    };
  }

  // Reset qty input
  const qtyInput = document.getElementById('qv-quantity');
  if (qtyInput) qtyInput.value = 1;

  // Show Modal
  const modal = new bootstrap.Modal(document.getElementById('quickViewModal'));
  modal.show();
}

// Custom Toast Alerts
function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const bgClass = type === 'success' ? 'bg-success' : type === 'info' ? 'bg-primary' : 'bg-secondary';
  const icon = type === 'success' ? 'fa-circle-check' : 'fa-circle-info';
  
  const toast = document.createElement('div');
  toast.className = `toast align-items-center text-white ${bgClass} border-0 show shadow-lg mb-2 rounded-3 animate__animated animate__fadeInUp`;
  toast.role = 'alert';
  toast.ariaLive = 'assertive';
  toast.ariaAtomic = 'true';
  
  toast.innerHTML = `
    <div class="d-flex">
      <div class="toast-body d-flex align-items-center">
        <i class="fa-solid ${icon} me-2"></i>
        <span>${message}</span>
      </div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
  `;

  container.appendChild(toast);
  
  // Auto remove after 3s
  setTimeout(() => {
    toast.classList.remove('show');
    toast.classList.add('animate__fadeOutDown');
    setTimeout(() => toast.remove(), 500);
  }, 3500);
}

// Checkout Button Click
function checkout() {
  if (cart.length === 0) return;
  
  showToast("Processing luxury packaging & payment details...", "success");
  setTimeout(() => {
    showToast("Order placed successfully! Thank you for choosing Elysian Luxe.", "success");
    cart = [];
    localStorage.removeItem('cart');
    updateCartCounters();
    renderCartItems();
    
    // Close offcanvas drawer
    const offcanvasEl = document.getElementById('cartOffcanvas');
    const offcanvas = bootstrap.Offcanvas.getInstance(offcanvasEl);
    if (offcanvas) offcanvas.hide();
  }, 1500);
}

// Countdown timer for offers
function initCountdownTimer() {
  const hoursEl = document.getElementById('hours');
  const minsEl = document.getElementById('mins');
  const secsEl = document.getElementById('secs');

  if (!hoursEl) return;

  // 12 hours from now countdown
  let totalSeconds = 12 * 60 * 60;

  const interval = setInterval(() => {
    totalSeconds--;
    if (totalSeconds <= 0) {
      clearInterval(interval);
      totalSeconds = 12 * 60 * 60; // reset
    }

    const hrs = Math.floor(totalSeconds / 3600);
    const mns = Math.floor((totalSeconds % 3600) / 60);
    const scs = totalSeconds % 60;

    hoursEl.innerText = hrs.toString().padStart(2, '0');
    minsEl.innerText = mns.toString().padStart(2, '0');
    secsEl.innerText = scs.toString().padStart(2, '0');
  }, 1000);
}

// Event Listeners initialization
function initEventListeners() {
  // Theme Toggle Button
  const themeBtn = document.getElementById('theme-toggle-btn');
  if (themeBtn) {
    themeBtn.addEventListener('click', toggleTheme);
  }

  // Sidebar Filters Category Buttons
  const filterButtons = document.querySelectorAll('.filter-btn');
  filterButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const cat = e.currentTarget.getAttribute('data-category');
      selectCategory(cat);
    });
  });

  // Price Slider input
  const priceSlider = document.getElementById('price-range-slider');
  if (priceSlider) {
    priceSlider.addEventListener('input', (e) => {
      handlePriceFilter(e.target.value);
    });
  }

  // Search Inputs
  const searchInput = document.getElementById('product-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      handleSearch(e.target.value);
    });
  }

  // Cart Drawer show callback
  const offcanvasCart = document.getElementById('cartOffcanvas');
  if (offcanvasCart) {
    offcanvasCart.addEventListener('show.bs.offcanvas', () => {
      renderCartItems();
    });
  }

  // Newsletter Form Submit
  const newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = e.target.querySelector('input[type="email"]').value;
      if (email) {
        showToast(`Thank you! Subscription confirmed for ${email}`, 'success');
        e.target.reset();
      }
    });
  }
}
