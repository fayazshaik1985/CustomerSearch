import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import CustomerList from './components/customer-list/CustomerList';
import CustomerForm from './components/customer-form/CustomerForm';
import './App.css'; // Import the CSS file

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to="/customers" replace />} />
          <Route path="/customers" element={<CustomerList />} />
          <Route path="/customer/add" element={<CustomerForm />} />
          <Route path="/customer/edit/:id" element={<CustomerForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
