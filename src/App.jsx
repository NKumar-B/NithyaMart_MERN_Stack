import React, { useState, useEffect, useRef } from 'react';

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
  
  const cardRefs = useRef({});
  const slideInterval = useRef(null);

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
      {/* Persistent Global Header */}
      <header className="navbar">
        <div className="nav-brand" onClick={unloadProject}>
          <span className="nav-logo">NITHYA MART</span>
          <span className="nav-tag">WORKSPACE HUB</span>
        </div>
        
        <nav className="nav-links">
          <button 
            className={`nav-btn nav-dashboard-btn ${activeProject === null ? 'active' : ''}`}
            onClick={unloadProject}
          >
            📊 Dashboard
          </button>
          
          {projects.map((proj) => (
            <button
              key={proj.id}
              className={`nav-btn ${activeProject?.id === proj.id ? 'active' : ''}`}
              onClick={() => loadProject(proj)}
            >
              {proj.icon} {proj.name.split(' ')[0]}
            </button>
          ))}
        </nav>
      </header>

      {/* Main Workspace Frame */}
      {activeProject === null ? (
        // Project Hub Dashboard
        <main className="dashboard">
          
          {/* Hero Section */}
          <div className="dashboard-header">
            <h1 className="dashboard-title">Nithya Mart Consolidated Project Hub</h1>
            <p className="dashboard-subtitle">
              Welcome to the central MERN workspace. Select, launch, and run any project module created under Nithya Mart. Each app runs completely isolated inside sandboxed viewports.
            </p>
          </div>

          {/* Carousel Section (Inline styled layout to guarantee height & display visibility) */}
          <section 
            className="carousel-container"
            style={{ 
              position: 'relative', 
              width: '100%', 
              maxWidth: '1200px', 
              height: '380px', 
              borderRadius: '24px', 
              border: '1px solid rgba(255, 255, 255, 0.06)', 
              overflow: 'hidden', 
              marginBottom: '3.5rem', 
              background: '#0d0d15', 
              boxShadow: '0 10px 40px rgba(0, 0, 0, 0.4)',
              display: 'block'
            }}
          >
            {carouselSlides.map((slide, index) => {
              const isActive = index === currentSlide;
              return (
                <div 
                  key={slide.id}
                  className={`carousel-slide ${isActive ? 'active' : ''}`}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    opacity: isActive ? 1 : 0,
                    zIndex: isActive ? 2 : 1,
                    transition: 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                    display: 'flex',
                    alignItems: 'flex-end'
                  }}
                >
                  <img 
                    src={slide.image} 
                    alt={slide.title} 
                    className="carousel-image-bg" 
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      filter: 'brightness(0.35) contrast(1.05)'
                    }}
                  />
                  <div 
                    className="carousel-overlay"
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      background: 'linear-gradient(to top, rgba(13, 14, 21, 0.95) 15%, rgba(13, 14, 21, 0.2) 100%)',
                      zIndex: 2
                    }}
                  ></div>
                  <div 
                    className="carousel-content"
                    style={{
                      position: 'relative',
                      zIndex: 3,
                      padding: '3rem 4rem',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      gap: '0.5rem',
                      width: '100%'
                    }}
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
                  </div>
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
          </section>

          {/* Projects Deck Header */}
          <div className="section-divider">
            <h2 className="section-title">Explore Applications</h2>
            <div className="section-line"></div>
          </div>

          {/* Project Grid */}
          <div className="card-grid">
            {projects.map((proj) => (
              <div
                key={proj.id}
                ref={(el) => (cardRefs.current[proj.id] = el)}
                className={`project-card ${proj.theme}`}
                onMouseMove={(e) => handleMouseMove(e, proj.id)}
                onClick={() => loadProject(proj)}
              >
                <div className="card-header">
                  <div className="card-icon-container">
                    {proj.icon}
                  </div>
                  <span className="card-tag">{proj.category}</span>
                </div>
                
                <div className="card-body">
                  <h3 className="card-title">{proj.name}</h3>
                  <p className="card-description">{proj.description}</p>
                </div>
                
                <div className="card-footer">
                  <span>Launch Application</span>
                  <span>→</span>
                </div>
              </div>
            ))}
          </div>

          {/* Contact Section */}
          <section className="contact-section">
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
                      placeholder="John Doe"
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
                      placeholder="john@example.com"
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
                
                <button type="submit" className="contact-submit-btn">
                  {contactSuccess ? '✓ Message Sent!' : 'Send Message ✉'}
                </button>
              </form>
            </div>
          </section>

          {/* Footer Section */}
          <footer className="footer">
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
          </footer>
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
