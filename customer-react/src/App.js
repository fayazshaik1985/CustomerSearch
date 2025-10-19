import React, { Suspense, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Sidenav from './components/sidenav/Sidenav';
import PrivateRoute from './components/auth/PrivateRoute';
import { dataService } from './services/dataService';
import './App.css';

// Lazy load components
const Login = React.lazy(() => import('./components/login/Login'));
const Dashboard = React.lazy(() => import('./components/dashboard/Dashboard'));
const CustomerList = React.lazy(() => import('./components/customer-list/CustomerList'));
const CustomerForm = React.lazy(() => import('./components/customer-form/CustomerForm'));

// Loading component
const LoadingSpinner = () => (
  <div style={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    height: '100vh',
    fontSize: '18px',
    color: '#666'
  }}>
    Loading...
  </div>
);

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSidenavCollapsed, setIsSidenavCollapsed] = useState(false);
  
  useEffect(() => {
    
    const email = localStorage.getItem('email');
    
    if (email && email.trim().length > 0) {
      dataService.updateIsLoggedIn(true);
      setIsLoggedIn(true);      
    }

    const loggedInSubscription = dataService.loggedInSubject.subscribe((value) => {        
      setIsLoggedIn(value);
    });

    return () => {
      loggedInSubscription.unsubscribe(); // Unsubscribe on unmount
    };

  //end of useEffect
  }, []);

  const handleSidenavCollapse = (collapsed) => {
    setIsSidenavCollapsed(collapsed);
  };  

  return (
    <Provider store={store}>
      <Router>
        <div className="App">
           
        {isLoggedIn && (                      
          <Sidenav onCollapsedStateChanged={handleSidenavCollapse} />          
        )}

      {isLoggedIn && (
       <div className={`${'main-content'} ${isSidenavCollapsed ? 'collapsed' : 'not-collapsed'}`}>
             
          <Header isSidenavCollapsed={isSidenavCollapsed} />
          
          <main className="content-area">
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                {/* <Route path="/login" element={<Login />} /> */}
                <Route path="/login" element={<PrivateRoute><Login /></PrivateRoute>} />
                <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                <Route path="/products" element={<PrivateRoute><CustomerList /></PrivateRoute>} />
                <Route path="/customers" element={<PrivateRoute><CustomerList /></PrivateRoute>} />
                <Route path="/customer/add" element={<PrivateRoute><CustomerForm /></PrivateRoute>} />
                <Route path="/customer/edit/:id" element={<PrivateRoute><CustomerForm /></PrivateRoute>} />
              </Routes>
            </Suspense>
          </main>

          <Footer />
       </div>
      )}

      {!isLoggedIn && (
        <div className='main-content'>
             
          <Header isSidenavCollapsed={isSidenavCollapsed} />
          
          <main className="content-area">
            
              <Routes>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/login" element={<Login />} />                
                <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                <Route path="/products" element={<PrivateRoute><CustomerList /></PrivateRoute>} />
                <Route path="/customers" element={<PrivateRoute><CustomerList /></PrivateRoute>} />
                <Route path="/customer/add" element={<PrivateRoute><CustomerForm /></PrivateRoute>} />
                <Route path="/customer/edit/:id" element={<PrivateRoute><CustomerForm /></PrivateRoute>} />
              </Routes>
            
          </main>

          <Footer />
        </div>
       )}

        </div>
      </Router>
    </Provider>
  );
}

export default App;
