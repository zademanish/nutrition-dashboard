import { createSlice } from '@reduxjs/toolkit';
import { mockClientData } from '../../data/clientsData';

const initialState = {
  clients: mockClientData,
  loading: false,
  error: null,
  filters: {
    status: 'all',
    subscription: 'all',
    searchQuery: '',
  },
};

const clientsSlice = createSlice({
  name: 'clients',
  initialState,
  reducers: {
    setClients: (state, action) => {
      state.clients = action.payload;
    },
    addClient: (state, action) => {
      state.clients.push(action.payload);
    },
    updateClient: (state, action) => {
      const index = state.clients.findIndex(c => c.id === action.payload.id);
      if (index !== -1) {
        state.clients[index] = action.payload;
      }
    },
    deleteClient: (state, action) => {
      state.clients = state.clients.filter(c => c.id !== action.payload);
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setClients,
  addClient,
  updateClient,
  deleteClient,
  setFilters,
  setLoading,
  setError,
} = clientsSlice.actions;

export default clientsSlice.reducer;