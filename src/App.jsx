import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const projects = [
  {
    id: 'bag',
    name: 'BAG E-Commerce',
    path: '/BAG/index.html',
    icon: '👜',
    theme: 'theme-bag',
    category: 'Shopping',
    badge: 'Luxury Fashion',
    color: 'from-pink-500 to-rose-600',
    accentColor: '#ec4899',
    description: 'Premium luxury bag store featuring handbags, office bags, travel bags, and leather accessories.'
  },
  {
    id: 'book',
    name: 'BOOK Store',
    path: '/BOOK/index.html',
    icon: '📚',
    theme: 'theme-book',
    category: 'Education',
    badge: 'Bestseller Vault',
    color: 'from-blue-500 to-indigo-600',
    accentColor: '#3b82f6',
    description: 'Online book store portal featuring genre categories, search filters, and catalog lists.'
  },
  {
    id: 'chocolates',
    name: 'CHOCOLATES Shop',
    path: '/CHOCOLATES/index.html',
    icon: '🍫',
    theme: 'theme-chocolate',
    category: 'Food & Sweets',
    badge: 'Artisanal Sweets',
    color: 'from-amber-600 to-orange-700',
    accentColor: '#d97706',
    description: 'Chocolates boutique showcasing imported confections, custom box sets, and sweet gifts.'
  },
  {
    id: 'costumes',
    name: 'COSTUMES Store',
    path: '/COSTUMES/index.html',
    icon: '🎭',
    theme: 'theme-costume',
    category: 'Apparel',
    badge: 'Rentals & Sales',
    color: 'from-purple-500 to-violet-700',
    accentColor: '#8b5cf6',
    description: 'Costume rental and purchase center for parties, theatre, cosplay events, and festivals.'
  },
  {
    id: 'fragrance',
    name: 'FRAGRANCE Depot',
    path: '/FRAGRANCE/index.html',
    icon: '🌸',
    theme: 'theme-fragrance',
    category: 'Beauty',
    badge: 'Luxury Aromatics',
    color: 'from-rose-400 to-pink-600',
    accentColor: '#f43f5e',
    description: 'Luxury fragrance store listing perfume lines, eau de parfum, colognes, and aromatics.'
  },
  {
    id: 'food',
    name: 'BiteCourt FOOD',
    path: '/Foood/Foood/index.html',
    icon: '🍔',
    theme: 'theme-food',
    category: 'Food Court',
    badge: 'Fast Delivery',
    color: 'from-amber-500 to-red-600',
    accentColor: '#f59e0b',
    description: 'Food court management and ordering application offering fast food meals and combo platters.'
  },
  {
    id: 'icecream',
    name: 'ICECREAMS Parlour',
    path: '/IceCreams/client/index.html',
    icon: '🍦',
    theme: 'theme-icecream',
    category: 'Desserts',
    badge: 'Express Full-Stack',
    color: 'from-sky-400 to-cyan-600',
    accentColor: '#0ea5e9',
    description: 'Ice Cream parlour menu featuring floats, sundaes, scoops, and custom topping options.'
  },
  {
    id: 'sports',
    name: 'SPORTS Goods',
    path: '/SPORTS/index.html',
    icon: '⚽',
    theme: 'theme-sport',
    category: 'Fitness',
    badge: 'Athletic Gear',
    color: 'from-emerald-500 to-teal-700',
    accentColor: '#10b981',
    description: 'Sports goods catalog featuring athletic equipment, jerseys, shoes, and workout gear.'
  },
  {
    id: 'shoes',
    name: 'SHOES Emporium',
    path: '/Shoes/index.html',
    icon: '👟',
    theme: 'theme-shoe',
    category: 'Apparel',
    badge: 'Sneaker Vault',
    color: 'from-orange-500 to-red-600',
    accentColor: '#f97316',
    description: 'Trendy sneakers and athletic shoe catalog highlighting top footwear brands.'
  },
  {
    id: 'ticketbooking',
    name: 'TICKET BOOKING',
    path: '/TICKETBOOKING/index.html',
    icon: '🎟️',
    theme: 'theme-ticket',
    category: 'Entertainment',
    badge: 'QR Cinema Pass',
    color: 'from-red-600 to-rose-800',
    accentColor: '#ef4444',
    description: 'Cinema ticket reservation portal including interactive seats and Spiderman showcase.'
  }
];

const categories = ['All', 'Shopping', 'Education', 'Food & Sweets', 'Apparel', 'Beauty', 'Food Court', 'Desserts', 'Fitness', 'Entertainment'];

function App() {
  const [activeProject, setActiveProject] = useState(null);
  const [iframeLoading, setIframeLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactSuccess, setContactSuccess] = useState(false);

  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    if (saved !== null) {
      return saved === 'true';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const cardRefs = useRef({});

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark-mode');
    } else {
      document.documentElement.classList.remove('dark-mode');
    }
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  useEffect(() => {
    const handleGlobalMouseMove = (e) => {
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    };
    window.addEventListener('mousemove', handleGlobalMouseMove);
    return () => window.removeEventListener('mousemove', handleGlobalMouseMove);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  const handleMouseMove = (e, id) => {
    const card = cardRefs.current[id];
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--x', `${x}px`);
    card.style.setProperty('--y', `${y}px`);
  };

  const loadProject = (project) => {
    setIframeLoading(true);
    setActiveProject(project);
  };

  const unloadProject = () => {
    setActiveProject(null);
    setIframeLoading(false);
  };

  const handleIframeLoad = () => {
    setIframeLoading(false);
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactMessage) return;
    setContactSuccess(true);
    setTimeout(() => {
      setContactName('');
      setContactEmail('');
      setContactMessage('');
      setContactSuccess(false);
    }, 3000);
  };

  const filteredProjects = projects.filter((proj) => {
    const matchesCategory = selectedCategory === 'All' || proj.category === selectedCategory;
    const matchesSearch = proj.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          proj.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          proj.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className={`app-container ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      
      {/* Dynamic Background Glow Blobs */}
      <div className="bg-glow-blobs">
        <div className="bg-glow-blob blob-primary" />
        <div className="bg-glow-blob blob-accent1" />
        <div className="bg-glow-blob blob-accent2" />
      </div>

      {/* Full-Width Header Navbar */}
      <motion.header 
        className="navbar-header"
        initial={{ opacity: 0, y: -25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="nav-brand" onClick={unloadProject}>
          <div className="brand-logo-icon">NM</div>
          <div className="brand-text-wrap">
            <span className="brand-title">NITHYA MART</span>
          </div>
        </div>
        
        <div className="nav-actions">
          <nav className="nav-pills">
            <button 
              className={`nav-pill-btn ${activeProject === null ? 'active' : ''}`}
              onClick={unloadProject}
            >
              Dashboard
            </button>
            
            {projects.map((proj) => (
              <button
                key={proj.id}
                className={`nav-pill-btn ${activeProject?.id === proj.id ? 'active' : ''}`}
                onClick={() => loadProject(proj)}
              >
                {proj.name.split(' ')[0]}
              </button>
            ))}
          </nav>

          <button 
            className="theme-toggle-btn" 
            onClick={toggleDarkMode} 
            aria-label="Toggle dark mode"
            title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </motion.header>

      {/* Main Workspace */}
      {activeProject === null ? (
        <main className="dashboard-content">
          
          {/* Hero Banner Section */}
          <motion.section 
            className="hero-section"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="hero-card">
              <div className="hero-badge">
                <span className="badge-pulse" />
                <span>A Place which satisfies all the Requirements.</span>
              </div>

              <h1 className="hero-heading">
                All-in-One <span>Nithya Mart Hub</span>
              </h1>
              <p className="hero-subheading">
                Experience 10 specialized e-commerce & utility applications unified seamlessly under a high-performance React 19 architecture.
              </p>

              <div className="hero-cta-buttons">
                <button className="primary-cta" onClick={() => loadProject(projects[0])}>
                  Launch Shopping Hub 
                </button>
              </div>
            </div>
          </motion.section>

          {/* Autoplay Platform Video Showcase (Placed ABOVE Orbital Universe) */}
          <motion.section 
            className="video-showcase-section"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="section-header text-center">
              {/* <span className="section-badge">AUTOPLAY VIDEO SHOWCASE</span> */}
              <h2 className="section-title-text">Nithya Mart Live Shopping Preview</h2>
              <p className="section-subtitle-text">Watch the automated workflow and multi-module e-commerce shopping experience in action.</p>
            </div>

            <div className="video-container-card">
              <video 
                src="/src/assets/showcase_video.mp4" 
                autoPlay 
                loop 
                muted 
                playsInline 
                className="showcase-autoplay-video" 
              />
              <div className="video-card-overlay">
                <span className="video-live-badge"><span className="badge-pulse" /> LIVE E-COMMERCE SHOWCASE</span>
                <h3>Online Shopping & Digital Store Portal</h3>
              </div>
            </div>
          </motion.section>

          {/* Interactive Orbital Module Map (All 10 Modules) */}
          <motion.section 
            className="orbital-section"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="section-header text-center">
              <span className="section-badge">Explore Applications</span>
              <h2 className="section-title-text">Explore the Module Universe</h2>
              <p className="section-subtitle-text">Hover over any orbiting module planet to inspect specs, then click to launch instantly.</p>
            </div>

            <div className="orbital-canvas">
              <div className="orbital-center">
                <span className="orbital-center-icon">NM</span>
                <span className="orbital-center-label">HUB CORE</span>
              </div>

              <div className="orbit-ring ring-1" />
              <div className="orbit-ring ring-2" />
              <div className="orbit-ring ring-3" />

              {/* All 10 Module Planet Orbits */}
              {projects.map((proj, idx) => (
                <div 
                  key={proj.id} 
                  className={`orbit-planet planet-${idx + 1}`} 
                  onClick={() => loadProject(proj)}
                  title={`Launch ${proj.name}`}
                >
                  <span className="planet-emoji">{proj.icon}</span>
                  <span className="planet-label">{proj.name.split(' ')[0]}</span>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Search & Filter Bar */}
          <section className="catalog-section">
            <div className="catalog-toolbar">
              <div className="toolbar-header">
                <h2 className="catalog-title">Application Catalog ({filteredProjects.length})</h2>
                <div className="toolbar-line" />
              </div>

              <div className="search-bar-wrap">
                <span className="search-icon-symbol">🔍</span>
                <input 
                  type="text" 
                  className="search-input-field" 
                  placeholder="Search applications by title, category, or features..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button className="search-reset-btn" onClick={() => setSearchQuery('')}>✕</button>
                )}
              </div>

              <div className="category-pills-row">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    className={`category-pill-item ${selectedCategory === cat ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Application Cards Grid */}
            <motion.div 
              className="apps-grid"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.08, delayChildren: 0.1 }
                }
              }}
            >
              {filteredProjects.map((proj) => (
                <motion.div
                  key={proj.id}
                  ref={(el) => (cardRefs.current[proj.id] = el)}
                  className="app-card"
                  onMouseMove={(e) => handleMouseMove(e, proj.id)}
                  variants={{
                    hidden: { opacity: 0, y: 25 },
                    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 15 } }
                  }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="card-top-bar">
                    <div className="card-icon-box" style={{ background: `linear-gradient(135deg, ${proj.accentColor}, #4f46e5)` }}>
                      {proj.icon}
                    </div>
                    <span className="card-category-badge">{proj.badge || proj.category}</span>
                  </div>

                  <div className="card-main-body">
                    <h3 className="card-title-text">{proj.name}</h3>
                    <p className="card-desc-text">{proj.description}</p>
                  </div>

                  <div className="card-action-bar">
                    <button className="launch-app-btn" onClick={() => loadProject(proj)}>
                      Launch Application →
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </section>

          {/* Contact Us Section */}
          <motion.section 
            className="contact-card-section"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="contact-box">
              <span className="section-badge">SUPPORT & FEEDBACK</span>
              <h2 className="contact-box-title">Get in Touch with Team 4</h2>
              <p className="contact-box-subtitle">Have questions or feedback about Nithya Mart? Drop us a message below.</p>

              <form className="contact-form-grid" onSubmit={handleContactSubmit}>
                <div className="form-row-2col">
                  <div className="form-group">
                    <label>Your Name</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder="Badduluri Nithin Kumar"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <label>Email Address</label>
                    <input 
                      type="email" 
                      className="form-input" 
                      placeholder="nithinkumarbadduluri@gmail.com"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      required 
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Message</label>
                  <textarea 
                    className="form-textarea" 
                    rows="4" 
                    placeholder="Type your message here..."
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    required
                  ></textarea>
                </div>

                <button type="submit" className="submit-form-btn">
                  {contactSuccess ? '✓ Message Sent Successfully!' : 'Send Message ✉'}
                </button>
              </form>
            </div>
          </motion.section>

          {/* Footer with module links */}
          <footer className="footer-bar">
            <div className="footer-top-row">
              <div className="footer-brand-wrap">
                <span className="footer-logo">NITHYA MART</span>
                <span className="footer-tagline">Centralized Multi-Module Hub</span>
              </div>
              
              <div className="footer-nav-links">
                <button className="footer-link-btn" onClick={unloadProject}>
                  Dashboard
                </button>
                {projects.map((proj) => (
                  <button
                    key={proj.id}
                    className="footer-link-btn"
                    onClick={() => loadProject(proj)}
                  >
                    {proj.name.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>

            <div className="footer-bottom-row">
              <p className="footer-copy">
                © 2026 Nithya Mart Workspace. All rights reserved.
              </p>
            </div>
          </footer>
        </main>
      ) : (
        /* Active Submodule Iframe Viewport */
        <div className="viewport-shell">
          {iframeLoading && (
            <div className="iframe-loader-overlay">
              <div className="loader-spinner" />
              <p>Loading {activeProject.name}...</p>
            </div>
          )}
          <iframe
            src={activeProject.path}
            title={activeProject.name}
            className={`viewport-frame ${!iframeLoading ? 'loaded' : ''}`}
            onLoad={handleIframeLoad}
          />
        </div>
      )}
    </div>
  );
}

export default App;
