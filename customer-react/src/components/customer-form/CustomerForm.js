import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { customerService } from '../../services/customerService';
import './CustomerForm.css';

const CustomerForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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
    const fetchCustomer = async () => {
      if (!!id) {
        try {
          const customerData = await customerService.getCustomer(id);
          setCustomer(customerData);
          setFormData({
            id: customerData.id || 0,
            firstName: customerData.firstName || '',
            lastName: customerData.lastName || '',
            email: customerData.email || '',
            dateOfBirth: customerData.dateOfBirth.split('T')[0],
            phone: customerData.phone || ''
          });
        } catch (error) {
          setError(error);
        }
      } else {
        // New customer
        setFormData({
          id: 0,
          firstName: '',
          lastName: '',
          email: '',
          dateOfBirth: null,
          phone: ''
        });
      }
      setLoading(false);
    };

    fetchCustomer();
  }, [id]);

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
    
    try {
      if (!!id) {
        await customerService.updateCustomer(id, formData);
      } else {
        await customerService.addCustomer(formData);
      }
      navigate('/customers');
    } catch (error) {
      setError(error);
    }
  };

  const handleCancel = () => {
    navigate('/customers');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="customer-form-page">
      <h1>{!!id ? 'Edit Customer' : 'Add Customer'}</h1>
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
          <button type="submit">Save</button>
          <button type="button" onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default CustomerForm;
