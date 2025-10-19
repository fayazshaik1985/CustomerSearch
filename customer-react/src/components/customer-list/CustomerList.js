import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { 
  fetchCustomers, 
  deleteCustomer, 
  selectCustomers,
  selectLoading,
  selectError 
} from '../../store/customer/customerSlice';
import './CustomerList.css';

function CustomerList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Redux selectors
  const customers = useSelector(selectCustomers);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
   
  // Local state for search input
  const [sortBy, setSortBy] = useState('id');
  const [sortOrder, setSortOrder] = useState('asc');  
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Load customers when component mounts
    if (!customers || customers.length === 0) { 
      dispatch(fetchCustomers({ sortBy:sortBy, sortOrder: sortOrder, search: searchQuery }));
    }
  }, [dispatch]);   

  const handleSearch = () => {
    dispatch(fetchCustomers({ sortBy:sortBy, sortOrder: sortOrder, search: searchQuery }));
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }

    dispatch(fetchCustomers({ sortBy:sortBy, sortOrder: sortOrder, search: searchQuery }));
  };

  const handleEditCustomer = (customer) => {
    navigate(`/customer/edit/${customer.id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      dispatch(deleteCustomer(id));
    }
  };


  if (loading) {
    return <div>Loading customers...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="customer-list">
      {/* <h1>Customer List</h1> */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search customers..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
        
      </div>

      <div className="add-customer-button">
        <Link to="/customer/add">Add Customer</Link>
      </div>

      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort('id')}>ID {sortBy === 'id' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}</th>
            <th onClick={() => handleSort('firstName')}>First Name {sortBy === 'firstName' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}</th>
            <th onClick={() => handleSort('lastName')}>Last Name {sortBy === 'lastName' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}</th>
            <th onClick={() => handleSort('email')}>Email {sortBy === 'email' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}</th>
            <th onClick={() => handleSort('dateOfBirth')}>Date of Birth {sortBy === 'dateOfBirth' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}</th>
            <th onClick={() => handleSort('phone')}>Phone {sortBy === 'phone' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map(customer => (
            <tr key={customer.id}>
              <td>{customer.id}</td>
              <td>{customer.firstName}</td>
              <td>{customer.lastName}</td>
              <td>{customer.email}</td>
              <td>{new Date(customer.dateOfBirth).toLocaleDateString('en-GB')}</td>
              <td>{customer.phone}</td>
              <td>
                <button onClick={() => handleEditCustomer(customer)}>Edit</button>
                <button onClick={() => handleDelete(customer.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}

export default CustomerList;
