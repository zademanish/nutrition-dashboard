import { createSlice } from '@reduxjs/toolkit';
import { mealPlans, foodItems, mealTemplates } from '../../data/Meals/mealsData';

const initialState = {
  mealPlans: mealPlans,
  foodItems: foodItems,
  templates: mealTemplates,
  currentPlan: null,
  selectedDay: 1,
  selectedMealType: 'breakfast',
  selectedFoodItems: [],
  isAssignModalOpen: false,
  isAddDishModalOpen: false,
  selectedPlanForAssignment: null,
  loading: false,
  error: null,
};

const mealsSlice = createSlice({
  name: 'meals',
  initialState,
  reducers: {
    // Meal Plan Actions
    setMealPlans: (state, action) => {
      state.mealPlans = action.payload;
    },
    createMealPlan: (state, action) => {
      const newPlan = {
        ...action.payload,
        id: Date.now(),
        createdAt: new Date().toISOString().split('T')[0],
        assignedTo: []
      };
      state.mealPlans.push(newPlan);
    },
    updateMealPlan: (state, action) => {
      const index = state.mealPlans.findIndex(plan => plan.id === action.payload.id);
      if (index !== -1) {
        state.mealPlans[index] = { ...state.mealPlans[index], ...action.payload };
      }
    },
    deleteMealPlan: (state, action) => {
      state.mealPlans = state.mealPlans.filter(plan => plan.id !== action.payload);
    },
    assignMealPlanToClients: (state, action) => {
      const { planId, clientIds } = action.payload;
      const plan = state.mealPlans.find(p => p.id === planId);
      if (plan) {
        plan.assignedTo = [...new Set([...plan.assignedTo, ...clientIds])];
      }
    },
    
    // Current Plan Actions
    setCurrentPlan: (state, action) => {
      state.currentPlan = action.payload;
    },
    clearCurrentPlan: (state) => {
      state.currentPlan = null;
      state.selectedDay = 1;
      state.selectedMealType = 'breakfast';
      state.selectedFoodItems = [];
    },
    
    // Day and Meal Type Selection
    setSelectedDay: (state, action) => {
      state.selectedDay = action.payload;
    },
    setSelectedMealType: (state, action) => {
      state.selectedMealType = action.payload;
    },
    
    // Food Item Actions
    addFoodItem: (state, action) => {
      const newItem = {
        ...action.payload,
        id: Date.now()
      };
      state.foodItems.push(newItem);
    },
    removeFoodItem: (state, action) => {
      state.foodItems = state.foodItems.filter(item => item.id !== action.payload);
    },
    
    // Selected Food Items for Plan
    addSelectedFoodItem: (state, action) => {
      if (!state.selectedFoodItems.includes(action.payload)) {
        state.selectedFoodItems.push(action.payload);
      }
    },
    removeSelectedFoodItem: (state, action) => {
      state.selectedFoodItems = state.selectedFoodItems.filter(id => id !== action.payload);
    },
    clearSelectedFoodItems: (state) => {
      state.selectedFoodItems = [];
    },
    
    // Modal Actions
    openAssignModal: (state, action) => {
      state.isAssignModalOpen = true;
      state.selectedPlanForAssignment = action.payload;
    },
    closeAssignModal: (state) => {
      state.isAssignModalOpen = false;
      state.selectedPlanForAssignment = null;
    },
    openAddDishModal: (state) => {
      state.isAddDishModalOpen = true;
    },
    closeAddDishModal: (state) => {
      state.isAddDishModalOpen = false;
    },
    
    // Loading and Error
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setMealPlans,
  createMealPlan,
  updateMealPlan,
  deleteMealPlan,
  assignMealPlanToClients,
  setCurrentPlan,
  clearCurrentPlan,
  setSelectedDay,
  setSelectedMealType,
  addFoodItem,
  removeFoodItem,
  addSelectedFoodItem,
  removeSelectedFoodItem,
  clearSelectedFoodItems,
  openAssignModal,
  closeAssignModal,
  openAddDishModal,
  closeAddDishModal,
  setLoading,
  setError,
  clearError,
} = mealsSlice.actions;

export default mealsSlice.reducer;
