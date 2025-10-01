import axios from 'axios';

const API_BASE_URL = 'https://localhost:5000/api/Customers';

export const customerService = {
  /**
   * Get all customers with optional sorting and search parameters
   * @param {Object} options - Options for filtering and sorting
   * @param {string} options.sortBy - Field to sort by
   * @param {string} options.sortOrder - Sort order ('asc' or 'desc')
   * @param {string} options.search - Search term
   * @returns {Promise<Array>} Array of customers
   */
  async getCustomers({ sortBy, sortOrder = 'asc', search } = {}) {
    try {
      const params = {};
      if (sortBy) {
        params.sortBy = sortBy;
        params.sortOrder = sortOrder || 'asc';
      }
      if (search) {
        params.search = search;
      }
      const response = await axios.get(API_BASE_URL, { params });
      return response.data;
    } catch (error) {
      const status = error.response?.status;
      throw new Error(`HTTP error! status: ${status ?? 'network/error'}`);
    }
  },

  /**
   * Get a single customer by ID
   * @param {string|number} id - Customer ID
   * @returns {Promise<Object>} Customer object
   */
  async getCustomer(id) {
    try {
      const response = await axios.get(`${API_BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      const status = error.response?.status;
      throw new Error(`HTTP error! status: ${status ?? 'network/error'}`);
    }
  },

  /**
   * Add a new customer
   * @param {Object} customerData - Customer data to add
   * @returns {Promise<Object>} Created customer object
   */
  async addCustomer(customerData) {
    try {
      const response = await axios.post(API_BASE_URL, customerData);
      return response.data;
    } catch (error) {
      const status = error.response?.status;
      throw new Error(`HTTP error! status: ${status ?? 'network/error'}`);
    }
  },

  /**
   * Update an existing customer
   * @param {string|number} id - Customer ID to update
   * @param {Object} customerData - Updated customer data
   * @returns {Promise<Object>} Updated customer object
   */
  async updateCustomer(id, customerData) {
    try {
      const response = await axios.put(`${API_BASE_URL}/${id}`, customerData);
      return response.data;
    } catch (error) {
      const status = error.response?.status;
      throw new Error(`HTTP error! status: ${status ?? 'network/error'}`);
    }
  },

  /**
   * Delete a customer by ID
   * @param {string|number} id - Customer ID to delete
   * @returns {Promise<void>}
   */
  async deleteCustomer(id) {
    try {
      await axios.delete(`${API_BASE_URL}/${id}`);
    } catch (error) {
      const status = error.response?.status;
      throw new Error(`HTTP error! status: ${status ?? 'network/error'}`);
    }
  }

}


