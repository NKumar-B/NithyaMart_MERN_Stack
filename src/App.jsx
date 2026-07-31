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

function App() {
  const [activeProject, setActiveProject] = useState(null);
  const [iframeLoading, setIframeLoading] = useState(false);
  const cardRefs = useRef({});

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
  };

  const unloadProject = () => {
    setActiveProject(null);
    setIframeLoading(false);
  };

  const handleIframeLoad = () => {
    setIframeLoading(false);
  };

  return (
    <div className="app-container">
      {/* Persistent Global Header */}
      <header className="navbar">
        <div className="nav-brand" onClick={unloadProject}>
          <span className="nav-logo">TEAM 4</span>
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
          <div className="dashboard-header">
            <h1 className="dashboard-title">Team 4 Consolidated Project Hub</h1>
            <p className="dashboard-subtitle">
              Welcome to the centralized workspace index. Browse and run any project module created by MERN Stack Team 4. All modules run isolated in a secure iframe sandbox to avoid stylesheet or dependency conflicts.
            </p>
          </div>

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
