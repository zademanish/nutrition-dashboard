import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { openAssignModal, deleteMealPlan } from '../../redux/slices/mealsSlice';
import MainLayout from '../../layout/MainLayout';
import AssignModal from './AssignModal';

const MealPlans = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { mealPlans } = useSelector((state) => state.meals);
  const [searchTerm, setSearchTerm] = useState('');
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [confirmDelete, setConfirmDelete] = useState({ show: false, planId: null });

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: '', type: 'success' });
    }, 3000);
  };

  const filteredPlans = mealPlans.filter(plan =>
    plan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    plan.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAssign = (plan) => {
    dispatch(openAssignModal(plan.id));
  };

  const handleEdit = (planId) => {
    navigate(`/meals/edit/${planId}`);
  };

  const handleDuplicate = (plan) => {
    // Logic to duplicate plan
    console.log('Duplicate plan:', plan);
  };

  const handleDelete = (planId) => {
    setConfirmDelete({ show: true, planId });
  };

  const confirmDeleteAction = () => {
    dispatch(deleteMealPlan(confirmDelete.planId));
    showToast('Meal plan deleted successfully', 'success');
    setConfirmDelete({ show: false, planId: null });
  };

  const handleDuplicateAction = (plan) => {
    // Logic to duplicate plan
    showToast(`"${plan.name}" duplicated successfully`, 'success');
  };

  return (
   
      <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">Meals</h1>
        <p className="text-gray-200 text-lg">Manage your meals and nutrition</p>
      </div>

      {/* Search and Create Button */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search meal plan"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
        <button
          onClick={() => navigate('/meals/create')}
          className="flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Create New Plan
        </button>
      </div>

      {/* Meal Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPlans.map((plan) => (
          <div
            key={plan.id}
            className="glass-card p-6 hover:bg-slate-700/50 transition-all fade-in"
          >
            {/* Plan Header with Actions */}
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-semibold text-white">{plan.name}</h3>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(plan.id)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  title="Edit"
                >
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button
                  onClick={() => handleDuplicateAction(plan)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  title="Duplicate"
                >
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </button>
                <button
                  onClick={() => handleDelete(plan.id)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  title="Delete"
                >
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Plan Description */}
            <p className="text-gray-200 text-sm mb-4">{plan.description}</p>

            {/* Plan Stats */}
            <div className="flex items-center gap-4 mb-4 text-gray-200">
              <div className="flex items-center gap-1">
                <span className="text-sm">⏱️ {plan.duration} days</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-sm">🔥 {plan.calories} cal</span>
              </div>
            </div>

            {/* Macros */}
            <div className="mb-4">
              <p className="text-sm text-gray-300">
                Macros: {plan.macros.protein}g / {plan.macros.carbs}c / {plan.macros.fats}f
              </p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {plan.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-white/20 text-white text-xs rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Assign Button */}
            <button
              onClick={() => handleAssign(plan)}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              Assign
            </button>
          </div>
        ))}
      </div>

      {/* No Results */}
      {filteredPlans.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-300 text-lg">No meal plans found</p>
        </div>
      )}

      {/* Toast Notification */}
      {toast.show && (
        <div className="fixed top-4 right-4 z-50 animate-slide-in-right">
          <div className={`px-6 py-4 rounded-lg shadow-2xl border flex items-center gap-3 ${
            toast.type === 'success' 
              ? 'bg-green-500 border-green-600 text-white' 
              : 'bg-red-500 border-red-600 text-white'
          }`}>
            {toast.type === 'success' ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
            <span className="font-medium">{toast.message}</span>
          </div>
        </div>
      )}

      {/* Confirmation Dialog */}
      {confirmDelete.show && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 rounded-xl shadow-2xl border border-slate-700/50 max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-white mb-2">Delete Meal Plan?</h3>
            <p className="text-gray-300 mb-6">Are you sure you want to delete this meal plan? This action cannot be undone.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setConfirmDelete({ show: false, planId: null })}
                className="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteAction}
                className="flex-1 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Assign Modal */}
      <AssignModal />
      </div>

  );
};

export default MealPlans;
