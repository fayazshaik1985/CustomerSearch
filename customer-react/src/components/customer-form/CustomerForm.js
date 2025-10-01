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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, dateOfBirth: date });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
              required
            />
          </label>
        </div>
        
        <div className="form-group">
          <label>
            Last Name:
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        
        <div className="form-group">
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        
        <div className="form-group">
          <label>
            Date of Birth:           
            <input type="date" 
              name="dateOfBirth" 
              value={formData.dateOfBirth} 
              onChange={handleChange} 
              required 
            />
          </label>
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
