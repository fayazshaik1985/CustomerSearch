import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCustomer, addCustomer, updateCustomer, clearSelectedCustomer, clearError } from '../../store/customer/customerSlice';
import './CustomerForm.css';

const CustomerForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Redux state
  const { selectedCustomer, loading, error } = useSelector(state => ({
    selectedCustomer: state.customers.selectedCustomer,
    loading: state.customers.loading,
    error: state.customers.error
  }));
  
  const [errors, setErrors] = useState({
    firstName: false,
    lastName: false,
    email: false,
    dateOfBirth: false,
    phone: false
  });
  const [formData, setFormData] = useState({
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    dateOfBirth: null,
    phone: ''
  });

  useEffect(() => {
    // Clear any previous errors and selected customer
    //dispatch(clearError());
    //dispatch(clearSelectedCustomer());
    
    if (id) {
      // Fetch customer using Redux
      dispatch(fetchCustomer(id));
    } else {
      // New customer - reset form
      setFormData({
        id: 0,
        firstName: '',
        lastName: '',
        email: '',
        dateOfBirth: null,
        phone: ''
      });
    }
  }, [id, dispatch]);

  // Update form data when selectedCustomer changes
  useEffect(() => {
    if (selectedCustomer && id) {
      setFormData({
        id: selectedCustomer.id || 0,
        firstName: selectedCustomer.firstName || '',
        lastName: selectedCustomer.lastName || '',
        email: selectedCustomer.email || '',
        dateOfBirth: selectedCustomer.dateOfBirth ? selectedCustomer.dateOfBirth.split('T')[0] : '',
        phone: selectedCustomer.phone || ''
      });
    }
  }, [selectedCustomer, id]);

  const handleBlur = (e) => {
    setErrors({ ...errors, [e.target.name]: !e.target.value });
  };

  const handleChange = (e) => {
    setErrors({ ...errors, [e.target.name]: !e.target.value });
    setFormData({ ...formData, [e.target.name]: e.target.value });    
  };
  
  const validate = () => {
    let newErrors = {};

    if (!formData.firstName) newErrors.firstName = true;
    if (!formData.lastName) newErrors.lastName = true;
    if (!formData.email) newErrors.email = true;
    if (!formData.dateOfBirth) newErrors.dateOfBirth = true;

    return newErrors;
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
     return;
    }
    
    // Clear any previous errors
    dispatch(clearError());
    
    if (id) {
      // Update customer using Redux
      dispatch(updateCustomer({ id, customerData: formData }));
    } else {
      // Add customer using Redux
      dispatch(addCustomer(formData));
    }
  };

  const handleCancel = () => {
    dispatch(clearSelectedCustomer());
    navigate('/customers');
  };

  return (
    <div className="customer-form-page">
      <h1>{!!id ? 'Edit Customer' : 'Add Customer'}</h1>
      
      {/* Loading indicator */}
      {loading && <div className="loading">Loading...</div>}
      
      {/* Error message */}
      {error && <div className="error-message">Error: {error}</div>}
      
      <form onSubmit={handleSubmit} className="customer-form">
        <div className="form-group">
          <label>
            First Name:
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </label>
          {errors.firstName && (
            <div className="error">First name is required.</div>
          )}
        </div>
        
        <div className="form-group">
          <label>
            Last Name:
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </label>
          {errors.lastName && (
            <div className="error">Last name is required.</div>
          )}
        </div>
        
        <div className="form-group">
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </label>
          {errors.email && (
            <div className="error">Email is required.</div>
          )}
          {formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) && (
            <div className="error">Enter a valid email address.</div>
          )}
        </div>
        
        <div className="form-group">
          <label>
            Date of Birth:           
            <input type="date" 
              name="dateOfBirth" 
              value={formData.dateOfBirth} 
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </label>
          {errors.dateOfBirth && (
            <div className="error">Date of birth is required.</div>
          )}
        </div>

        <div className="form-group">
          <label>
            Phone:
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </label>
        </div>
        
        <div className="form-actions">
          <button type="submit" disabled={loading}>Save</button>
          <button type="button" onClick={handleCancel} disabled={loading}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default CustomerForm;
