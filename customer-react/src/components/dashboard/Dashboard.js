import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Dashboard.css';

export default function Dashboard() {
  const navigate = useNavigate();
  const email = localStorage.getItem('email');
  
  const handleLogout = () => {
    localStorage.removeItem('email');
    navigate('/login', { replace: true });
  };

  return (
    <div className="dashboard">
      {/* <header className="dashboard-header">
        <h2>Dashboard</h2>       
      </header> */}
      
      <main className="dashboard-content">
        <div className="dashboard-cards">

          <div className="card">
            <h3>Customers</h3>
            <p>View and manage customer information</p>
            <Link to="/customers" className="card-link">View Customers</Link>
          </div>
          
          <div className="card">
            <h3>Products</h3>
            <p>View and manage product information</p>
            <Link to="/products" className="card-link">View Products</Link>
          </div>

           <div className="card">
            <h3>Customers</h3>
            <p>View and manage customer information</p>
            <Link to="/customers" className="card-link">View Customers</Link>
          </div>
          
          <div className="card">
            <h3>Products</h3>
            <p>View and manage product information</p>
            <Link to="/products" className="card-link">View Products</Link>
          </div>

           <div className="card">
            <h3>Customers</h3>
            <p>View and manage customer information</p>
            <Link to="/customers" className="card-link">View Customers</Link>
          </div>
          
          <div className="card">
            <h3>Products</h3>
            <p>View and manage product information</p>
            <Link to="/products" className="card-link">View Products</Link>
          </div>         

        </div>
      </main>
    </div>
  );
}


