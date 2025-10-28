import { createSlice } from '@reduxjs/toolkit';
import { dashboardData } from '../../data/dashboardData';
import { appointmentsData } from '../../data/appointmentsData';

const initialState = {
  stats: dashboardData.stats,
  todayAppointments: appointmentsData,
  urgentAttention: dashboardData.urgentAttention,
  loading: false,
  error: null,
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setStats: (state, action) => {
      state.stats = action.payload;
    },
    setTodayAppointments: (state, action) => {
      state.todayAppointments = action.payload;
    },
    setUrgentAttention: (state, action) => {
      state.urgentAttention = action.payload;
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
  setStats,
  setTodayAppointments,
  setUrgentAttention,
  setLoading,
  setError,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;