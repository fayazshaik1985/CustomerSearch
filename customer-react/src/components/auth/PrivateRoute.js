import React from 'react';
import { Navigate } from 'react-router-dom';
import { dataService } from '../../services/dataService';

export default function PrivateRoute({ children }) {
  const email = localStorage.getItem('email');

  if (email && email.trim().length > 0) {
    dataService.updateIsLoggedIn(true);     

    if (window.location.pathname.includes('/login'))
      return <Navigate to="/dashboard" replace />;
    else
      return children;

  }

 return <Navigate to="/login" replace />;
}


