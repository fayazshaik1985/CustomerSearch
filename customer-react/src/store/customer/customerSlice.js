import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { customerService } from '../../services/customerService';

// Async thunks for API calls
export const fetchCustomers = createAsyncThunk(
  'customers/fetchCustomers',
  async (options = {}) => {
    const { sortBy, sortOrder, search } = options;
    const response = await customerService.getCustomers({ sortBy, sortOrder, search });
    return response;
  }
);

export const fetchCustomer = createAsyncThunk(
  'customers/fetchCustomer',
  async (id) => {
    const response = await customerService.getCustomer(id);
    return response;
  }
);

export const addCustomer = createAsyncThunk(
  'customers/addCustomer',
  async (customerData) => {
    const response = await customerService.addCustomer(customerData);
    return response;
  }
);

export const updateCustomer = createAsyncThunk(
  'customers/updateCustomer',
  async ({ id, customerData }) => {
    const response = await customerService.updateCustomer(id, customerData);
    return response;
  }
);

export const deleteCustomer = createAsyncThunk(
  'customers/deleteCustomer',
  async (id) => {
    await customerService.deleteCustomer(id);
    return id;
  }
);

const customerSlice = createSlice({
  name: 'customers',
  initialState: {
    customers: [],
    selectedCustomer: null,
    loading: false,
    error: null,
    searchTerm: '',
    sortBy: 'firstName',
    sortOrder: 'asc'
  },
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setSortOptions: (state, action) => {
      state.sortBy = action.payload.sortBy;
      state.sortOrder = action.payload.sortOrder;
    },
    clearSelectedCustomer: (state) => {
      state.selectedCustomer = null;
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch customers
      .addCase(fetchCustomers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCustomers.fulfilled, (state, action) => {
        state.loading = false;
        state.customers = action.payload;
        state.error = null;
      })
      .addCase(fetchCustomers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Fetch single customer
      .addCase(fetchCustomer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCustomer.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedCustomer = action.payload;
        state.error = null;
      })
      .addCase(fetchCustomer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Add customer
      .addCase(addCustomer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addCustomer.fulfilled, (state, action) => {
        state.loading = false;
        state.customers.push(action.payload);
        state.error = null;
      })
      .addCase(addCustomer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Update customer
      .addCase(updateCustomer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCustomer.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.customers.findIndex(customer => customer.id === action.payload.id);
        if (index !== -1) {
          state.customers[index] = action.payload;
        }
        if (state.selectedCustomer?.id === action.payload.id) {
          state.selectedCustomer = action.payload;
        }
        state.error = null;
      })
      .addCase(updateCustomer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Delete customer
      .addCase(deleteCustomer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCustomer.fulfilled, (state, action) => {
        state.loading = false;
        state.customers = state.customers.filter(customer => customer.id !== action.payload);
        if (state.selectedCustomer?.id === action.payload) {
          state.selectedCustomer = null;
        }
        state.error = null;
      })
      .addCase(deleteCustomer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const { setSearchTerm, setSortOptions, clearSelectedCustomer, clearError } = customerSlice.actions;

// Selectors
export const selectCustomers = (state) => state.customers.customers;
export const selectSelectedCustomer = (state) => state.customers.selectedCustomer;
export const selectLoading = (state) => state.customers.loading;
export const selectError = (state) => state.customers.error;
export const selectSearchTerm = (state) => state.customers.searchTerm;
export const selectSortOptions = (state) => ({
  sortBy: state.customers.sortBy,
  sortOrder: state.customers.sortOrder
});

// Computed selectors
export const selectFilteredCustomers = (state) => {
  const customers = selectCustomers(state);
  const searchTerm = selectSearchTerm(state);
  
  if (!searchTerm) return customers;
  
  return customers.filter(customer =>
    customer.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
};

export const selectSortedCustomers = (state) => {
  const customers = selectFilteredCustomers(state);
  const { sortBy, sortOrder } = selectSortOptions(state);
  
  return [...customers].sort((a, b) => {
    const aValue = a[sortBy];
    const bValue = b[sortBy];
    
    if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });
};

export default customerSlice.reducer;
