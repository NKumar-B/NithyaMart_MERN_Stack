import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const projects = [
  {
    id: 'bag',
    name: 'BAG E-Commerce',
    path: '/BAG/index.html',
    icon: '👜',
    theme: 'theme-bag',
    category: 'Shopping',
    description: 'Premium luxury bag store featuring handbags, office bags, travel bags, and accessories.'
  },
  {
    id: 'book',
    name: 'BOOK Store',
    path: '/BOOK/index.html',
    icon: '📚',
    theme: 'theme-book',
    category: 'Education',
    description: 'Online book store portal featuring categories, search filters, and catalog lists.'
  },
  {
    id: 'chocolates',
    name: 'CHOCOLATES Shop',
    path: '/CHOCOLATES/index.html',
    icon: '🍫',
    theme: 'theme-chocolate',
    category: 'Food & Sweets',
    description: 'Chocolates boutique showcasing imported confections, box sets, and sweet gifts.'
  },
  {
    id: 'costumes',
    name: 'COSTUMES Store',
    path: '/COSTUMES/index.html',
    icon: '🎭',
    theme: 'theme-costume',
    category: 'Apparel',
    description: 'Costume rental and purchase center for parties, theatre, events, and festivals.'
  },
  {
    id: 'fragrance',
    name: 'FRAGRANCE Depot',
    path: '/FRAGRANCE/index.html',
    icon: '🌸',
    theme: 'theme-fragrance',
    category: 'Beauty',
    description: 'Luxury fragrance store listing perfume lines, colognes, and aromatherapy essentials.'
  },
  {
    id: 'food',
    name: 'BiteCourt FOOD',
    path: '/Foood/Foood/index.html',
    icon: '🍔',
    theme: 'theme-food',
    category: 'Food Court',
    description: 'Food court management and ordering application offering junk food favorites.'
  },
  {
    id: 'icecream',
    name: 'ICECREAMS Parlour',
    path: '/IceCreams/IceCreams/index.html',
    icon: '🍦',
    theme: 'theme-icecream',
    category: 'Desserts',
    description: 'Ice Cream parlour menu featuring floats, sundaes, scoops, and custom toppings.'
  },
  {
    id: 'sports',
    name: 'SPORTS Goods',
    path: '/SPORTS/index.html',
    icon: '⚽',
    theme: 'theme-sport',
    category: 'Fitness',
    description: 'Sports goods catalog featuring equipment, jerseys, shoes, and workout gear.'
  },
  {
    id: 'shoes',
    name: 'SHOES Emporium',
    path: '/Shoes/index.html',
    icon: '👟',
    theme: 'theme-shoe',
    category: 'Apparel',
    description: 'Trendy sneakers and athletic shoe catalog highlighting top footwear brands.'
  },
  {
    id: 'ticketbooking',
    name: 'TICKET BOOKING',
    path: '/TICKETBOOKING/index.html',
    icon: '🎟️',
    theme: 'theme-ticket',
    category: 'Entertainment',
    description: 'Ticket Booking portal including the custom Spiderman movie schedule display.'
  }
];

const carouselSlides = [
  {
    id: 'bag',
    title: 'Luxury Bags Collection',
    subtitle: 'Explore our curated catalog of designer handbags, office bags, and travel accessories.',
    image: '/BAG/src/assets/categories/luxury-handbags.jpg',
    btnText: 'Shop Handbags 👜'
  },
  {
    id: 'chocolates',
    title: 'Exquisite Chocolate Boutique',
    subtitle: 'Taste imported truffles, custom confection boxes, and premium cocoa collections.',
    image: '/CHOCOLATES/src/assets/hero.png',
    btnText: 'Browse Sweets 🍫'
  },
  {
    id: 'food',
    title: 'BiteCourt Food Ordering',
    subtitle: 'Satisfy your cravings with fast food favorites, custom platters, and quick checkout.',
    image: '/Foood/Foood/src/assets/french-fries.jpeg',
    btnText: 'Order Now 🍔'
  }
];

function App() {
  const [activeProject, setActiveProject] = useState(null);
  const [iframeLoading, setIframeLoading] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactSuccess, setContactSuccess] = useState(false);
  
  // Theme state: default to localStorage or preferences
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    if (saved !== null) {
      return saved === 'true';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const cardRefs = useRef({});
  const slideInterval = useRef(null);

  // Sync theme with DOM root class
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark-mode');
    } else {
      document.documentElement.classList.remove('dark-mode');
    }
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  // Global mouse spotlight position tracking (updating DOM properties directly for 60 FPS performance)
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

  // Auto transition carousel slides
  useEffect(() => {
    if (activeProject === null) {
      startSlideShow();
    } else {
      stopSlideShow();
    }
    return () => stopSlideShow();
  }, [activeProject]);

  const startSlideShow = () => {
    stopSlideShow();
    slideInterval.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
    }, 4500);
  };

  const stopSlideShow = () => {
    if (slideInterval.current) {
      clearInterval(slideInterval.current);
    }
  };

  const selectSlide = (index) => {
    setCurrentSlide(index);
    startSlideShow(); // reset timer
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
    startSlideShow();
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselSlides.length) % carouselSlides.length);
    startSlideShow();
  };

  // 3D card tilt effect on mouse hover
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
    stopSlideShow();
  };

  const unloadProject = () => {
    setActiveProject(null);
    setIframeLoading(false);
    setCurrentSlide(0);
  };

  const handleIframeLoad = () => {
    setIframeLoading(false);
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactMessage) return;
    // Mock submit trigger
    setContactSuccess(true);
    setTimeout(() => {
      setContactName('');
      setContactEmail('');
      setContactMessage('');
      setContactSuccess(false);
    }, 3000);
  };

  return (
    <div className="app-container">
      {/* Ambient background glow blobs */}
      <div className="bg-glow-blobs">
        <div className="bg-glow-blob blob-primary" />
        <div className="bg-glow-blob blob-accent1" />
        <div className="bg-glow-blob blob-accent2" />
      </div>

      {/* Persistent Global Header */}
      <motion.header 
        className="navbar"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="nav-brand" onClick={unloadProject}>
          <span className="nav-logo">NITHYA MART</span>
          <span className="nav-tag"> ONLINE SHOPPING APPLICATION</span>
        </div>
        
        <div className="nav-actions">
          <nav className="nav-links">
            <button 
              className={`nav-btn nav-dashboard-btn ${activeProject === null ? 'active' : ''}`}
              onClick={unloadProject}
            >
              Dashboard
            </button>
            
            {projects.map((proj) => (
              <button
                key={proj.id}
                className={`nav-btn ${activeProject?.id === proj.id ? 'active' : ''}`}
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

      {/* Main Workspace Frame */}
      {activeProject === null ? (
        // Project Hub Dashboard
        <main className="dashboard">
          
          {/* Hero Section */}
          <motion.div 
            className="dashboard-header"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h1 className="dashboard-title">NITHYA MART Online Shopping Application</h1>
            <p className="dashboard-subtitle">
              Welcome to NITHYA MART which is a simple and user-friendly online shopping application developed to provide customers with a convenient shopping experience.
            </p>
          </motion.div>

          {/* Carousel Section */}
          <motion.section 
            className="carousel-container"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {carouselSlides.map((slide, index) => {
              const isActive = index === currentSlide;
              return (
                <div 
                  key={slide.id}
                  className={`carousel-slide ${isActive ? 'active' : ''}`}
                >
                  <img 
                    src={slide.image} 
                    alt={slide.title} 
                    className="carousel-image-bg" 
                  />
                  <div className="carousel-overlay"></div>
                  
                  <AnimatePresence mode="wait">
                    {isActive && (
                      <motion.div 
                        className="carousel-content"
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 30 }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                      >
                        <span className="carousel-tag">Featured Module</span>
                        <h2 className="carousel-title">{slide.title}</h2>
                        <p className="carousel-subtitle">{slide.subtitle}</p>
                        <button 
                          className="carousel-btn"
                          onClick={() => loadProject(projects.find(p => p.id === slide.id))}
                        >
                          {slide.btnText}
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
            
            {/* Carousel Navigation Arrows */}
            <button className="carousel-arrow prev" onClick={handlePrevSlide}>‹</button>
            <button className="carousel-arrow next" onClick={handleNextSlide}>›</button>

            {/* Carousel Dot Selectors */}
            <div className="carousel-dots">
              {carouselSlides.map((_, index) => (
                <span
                  key={index}
                  className={`carousel-dot ${index === currentSlide ? 'active' : ''}`}
                  onClick={() => selectSlide(index)}
                />
              ))}
            </div>
          </motion.section>

          {/* Orbital Universe Navigation Map */}
          <motion.div 
            className="space-universe-container"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="universe-bg-overlay"></div>
            <div className="universe-title-card">
              <h3 className="universe-main-title">Interactive Module Orbit</h3>
              <p className="universe-subtitle">Hover over an orbiting module planet to pause and explore, then click to launch the application instantly.</p>
            </div>
            
            <div className="universe-orbits">
              <div className="universe-core">
                <div className="core-glow"></div>
                <div className="core-content">
                  <span className="core-logo">NM</span>
                  <span className="core-text">Hub Core</span>
                </div>
              </div>
              
              <div className="orbit-track orbit-track-1"></div>
              <div className="orbit-track orbit-track-2"></div>
              <div className="orbit-track orbit-track-3"></div>
              
              {/* Orbiting Planets */}
              <div 
                className="universe-planet planet-bag" 
                onClick={() => loadProject(projects.find(p => p.id === 'bag'))}
              >
                <span className="planet-icon">👜</span>
                <span className="planet-tooltip">BAG Shop</span>
              </div>
              
              <div 
                className="universe-planet planet-book" 
                onClick={() => loadProject(projects.find(p => p.id === 'book'))}
              >
                <span className="planet-icon">📚</span>
                <span className="planet-tooltip">BOOK Store</span>
              </div>
              
              <div 
                className="universe-planet planet-chocolate" 
                onClick={() => loadProject(projects.find(p => p.id === 'chocolates'))}
              >
                <span className="planet-icon">🍫</span>
                <span className="planet-tooltip">CHOCOLATES Shop</span>
              </div>
              
              <div 
                className="universe-planet planet-food" 
                onClick={() => loadProject(projects.find(p => p.id === 'food'))}
              >
                <span className="planet-icon">🍔</span>
                <span className="planet-tooltip">BiteCourt FOOD</span>
              </div>
              
              <div 
                className="universe-planet planet-sports" 
                onClick={() => loadProject(projects.find(p => p.id === 'sports'))}
              >
                <span className="planet-icon">⚽</span>
                <span className="planet-tooltip">SPORTS Goods</span>
              </div>
            </div>
          </motion.div>

          {/* Projects Deck Header */}
          <div className="section-divider">
            <h2 className="section-title">Explore Applications</h2>
            <div className="section-line"></div>
          </div>

          {/* Project Grid */}
          <motion.div 
            className="card-grid"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.08,
                  delayChildren: 0.3
                }
              }
            }}
          >
            {projects.map((proj) => (
              <motion.div
                key={proj.id}
                ref={(el) => (cardRefs.current[proj.id] = el)}
                className={`project-card ${proj.theme}`}
                onMouseMove={(e) => handleMouseMove(e, proj.id)}
                onClick={() => loadProject(proj)}
                variants={{
                  hidden: { opacity: 0, y: 25 },
                  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 15 } }
                }}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <div className="card-header">
                  <div className="card-icon-container">
                    {proj.icon}
                  </div>
                  <div className="card-tag-wrapper">
                    <span className="card-tag-dot"></span>
                    <span className="card-tag">{proj.category}</span>
                  </div>
                </div>
                
                <div className="card-body">
                  <h3 className="card-title">{proj.name}</h3>
                  <p className="card-description">{proj.description}</p>
                </div>
                
                <div className="card-footer">
                  <span>Launch Application</span>
                  <span>→</span>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Contact Section */}
          <motion.section 
            className="contact-section"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="section-divider">
              <h2 className="section-title">Get in Touch</h2>
              <div className="section-line"></div>
            </div>
            
            <div className="contact-card">
              <h3 className="contact-card-title">Send a Message</h3>
              <p className="contact-card-subtitle">Have questions or feedback about Nithya Mart? Drop us a message below.</p>
              
              <form className="contact-form" onSubmit={handleContactSubmit}>
                <div className="contact-form-row">
                  <div className="contact-form-group">
                    <label className="contact-label">Your Name</label>
                    <input 
                      type="text" 
                      className="contact-input" 
                      placeholder="Badduluri Nithin Kumar"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      required 
                    />
                  </div>
                  <div className="contact-form-group">
                    <label className="contact-label">Email Address</label>
                    <input 
                      type="email" 
                      className="contact-input" 
                      placeholder="nithinkumarbadduluri@gmail.com"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      required 
                    />
                  </div>
                </div>
                
                <div className="contact-form-group">
                  <label className="contact-label">Message</label>
                  <textarea 
                    className="contact-textarea" 
                    rows="4" 
                    placeholder="Type your message here..."
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    required
                  ></textarea>
                </div>
                
                <motion.button 
                  type="submit" 
                  className="contact-submit-btn"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  {contactSuccess ? '✓ Message Sent!' : 'Send Message ✉'}
                </motion.button>
              </form>
            </div>
          </motion.section>

          {/* Footer Section */}
          <motion.footer 
            className="footer"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="footer-brand">
              <span className="nav-logo">NITHYA MART</span>
              <span className="footer-divider">|</span>
              <span className="footer-motto">Centralized Hub</span>
            </div>
            
            <div className="footer-links">
              {projects.map((proj) => (
                <span 
                  key={proj.id} 
                  className="footer-link"
                  onClick={() => loadProject(proj)}
                >
                  {proj.name}
                </span>
              ))}
            </div>
            
            <div className="footer-line-horizontal"></div>
            
            <p className="footer-copyright">
              © 2026 Nithya Mart Workspace. All project histories preserved. All rights reserved.
            </p>
          </motion.footer>
          </main>
      ) : (
        // Iframe Viewport
        <div className="viewport-container">
          {iframeLoading && (
            <div className="loading-overlay">
              <div className="spinner"></div>
              <p className="loading-text">Loading {activeProject.name}...</p>
            </div>
          )}
          <iframe
            src={activeProject.path}
            title={activeProject.name}
            className={`viewport-iframe ${!iframeLoading ? 'loaded' : ''}`}
            onLoad={handleIframeLoad}
          />
        </div>
      )}
    </div>
  );
}

export default App;
