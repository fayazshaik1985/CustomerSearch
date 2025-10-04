import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { dataService } from '../../services/dataService';
import './Header.css';

const Header = ({ isSidenavCollapsed }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
  
     const loggedInSubscription = dataService.loggedInSubject.subscribe((value) => {        
        setUserEmail(localStorage.getItem('email'));
        setIsLoggedIn(value);
      });

      return () => {
        loggedInSubscription.unsubscribe(); // Unsubscribe on unmount
      };

  }, []);

  const logout = () => {
    localStorage.removeItem('email');
    dataService.updateIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <header className={`header`}>
      <div className="header-content">
        <div className="logo-section">
          <div className="logo">
            <span className="logo-icon">🏢</span>
            <span className="logo-text">F Mart</span>
          </div>
        </div>
        
        {isLoggedIn && (
          <div className="user-section">
            <div className="user-info">
              <span className="user-icon">👤</span>
              <span className="user-email">{userEmail}</span>
            </div>
            <button className="logout-btn" onClick={logout}>
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
