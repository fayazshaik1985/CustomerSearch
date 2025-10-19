import { configureStore } from '@reduxjs/toolkit';
import customerReducer from './customer/customerSlice';

export const store = configureStore({
  reducer: {
    customers: customerReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
  devTools: process.env.NODE_ENV !== 'production'
});

export default store;
