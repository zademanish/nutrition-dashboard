import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlices';
import dashboardReducer from './slices/dashboardSlice';
import clientsReducer from './slices/clientsSlice';
import mealsReducer from './slices/mealsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    dashboard: dashboardReducer,
    clients: clientsReducer,
    meals: mealsReducer,
  },
});