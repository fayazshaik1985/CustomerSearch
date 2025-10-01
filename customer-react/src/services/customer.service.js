const API_BASE_URL = 'https://localhost:5000/api/Customers';

export const customersService = {
  /**
   * Get all customers with optional sorting and search parameters
   * @param {Object} options - Options for filtering and sorting
   * @param {string} options.sortBy - Field to sort by
   * @param {string} options.sortOrder - Sort order ('asc' or 'desc')
   * @param {string} options.search - Search term
   * @returns {Promise<Array>} Array of customers
   */
  async getCustomers({ sortBy, sortOrder = 'asc', search } = {}) {
    const url = new URL(API_BASE_URL);
    if (sortBy) {
      url.searchParams.append('sortBy', sortBy);
      url.searchParams.append('sortOrder', sortOrder || 'asc');
    }
    if (search) {
      url.searchParams.append('search', search);
    }
    const response = await fetch(url.toString());
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  },

  /**
   * Get a single customer by ID
   * @param {string|number} id - Customer ID
   * @returns {Promise<Object>} Customer object
   */
  async getCustomer(id) {
    const response = await fetch(`${API_BASE_URL}/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  },

  /**
   * Add a new customer
   * @param {Object} customerData - Customer data to add
   * @returns {Promise<Object>} Created customer object
   */
  async addCustomer(customerData) {
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(customerData),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json().catch(() => null);
  },

  /**
   * Update an existing customer
   * @param {string|number} id - Customer ID to update
   * @param {Object} customerData - Updated customer data
   * @returns {Promise<Object>} Updated customer object
   */
  async updateCustomer(id, customerData) {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(customerData),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json().catch(() => null);
  },

  /**
   * Delete a customer by ID
   * @param {string|number} id - Customer ID to delete
   * @returns {Promise<void>}
   */
  async deleteCustomer(id) {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  }

}


