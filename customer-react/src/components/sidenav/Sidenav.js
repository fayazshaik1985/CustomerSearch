import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Sidenav.css';

const Sidenav = ({ onCollapsedStateChanged }) => {
  const [userEmail, setUserEmail] = useState('');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [navItems, setNavItems] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const email = localStorage.getItem('email');
    setUserEmail(email || '');

    if (email) {
      const items = [
        { icon: '📊', label: 'Dashboard', route: '/dashboard', isActive: false },
        { icon: '👥', label: 'Customers', route: '/customers', isActive: false },
        { icon: '📦', label: 'Products', route: '/products', isActive: false },
      ];
      setNavItems(items);
      updateActiveRoute(items);
    }
  }, []);

  useEffect(() => {
    if (navItems.length > 0) {
      updateActiveRoute(navItems);
    }
  }, [location.pathname]);

  const toggleCollapse = () => {
    const newCollapsedState = !isCollapsed;
    setIsCollapsed(newCollapsedState);
    onCollapsedStateChanged(newCollapsedState);
  };

  const updateActiveRoute = (items) => {
    const currentRoute = location.pathname;
    const updatedItems = items.map(item => ({
      ...item,
      isActive: currentRoute === item.route
    }));
    setNavItems(updatedItems);
  };

  const handleNavClick = (route) => {
    navigate(route);
  };

  return (
    <nav className={`sidenav ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidenav-header">
        <button 
          className="toggle-btn" 
          onClick={toggleCollapse} 
          aria-label={isCollapsed ? 'Expand navigation' : 'Collapse navigation'}
        >
          <span className={`toggle-icon ${isCollapsed ? 'rotated' : ''}`}>☰</span>
        </button>
        {!isCollapsed && (
          <div className="nav-title">
            <span>Menu</span>
          </div>
        )}
      </div>

      <ul className="nav-list">
        {navItems.map((item, index) => (
          <li key={index} className="nav-item">
            <a 
              className={`nav-link ${item.isActive ? 'active' : ''}`}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(item.route);
              }}
              title={isCollapsed ? item.label : ''}
            >
              <span className="nav-icon">{item.icon}</span>
              {!isCollapsed && <span className="nav-label">{item.label}</span>}
            </a>
          </li>
        ))}
      </ul>

      {!isCollapsed && (
        <div className="sidenav-footer">
          <div className="footer-info">
            <small>F Mart v1.0</small>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Sidenav;
