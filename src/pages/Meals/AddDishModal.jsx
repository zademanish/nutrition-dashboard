import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { X } from 'lucide-react';
import { closeAddDishModal, addFoodItem } from '../../redux/slices/mealsSlice';

const AddDishModal = () => {
  const dispatch = useDispatch();
  const { isAddDishModalOpen } = useSelector((state) => state.meals);

  const [dishData, setDishData] = useState({
    name: '',
    calories: '',
    protein: '',
    carbs: '',
    fats: '',
    category: 'Mixed',
    mealType: 'breakfast'
  });

  if (!isAddDishModalOpen) return null;

  const handleClose = () => {
    setDishData({
      name: '',
      calories: '',
      protein: '',
      carbs: '',
      fats: '',
      category: 'Mixed',
      mealType: 'breakfast'
    });
    dispatch(closeAddDishModal());
  };

  const handleAddDish = () => {
    if (!dishData.name || !dishData.calories) {
      alert('Please fill in at least the dish name and calories');
      return;
    }

    const newDish = {
      name: dishData.name,
      calories: parseFloat(dishData.calories) || 0,
      protein: parseFloat(dishData.protein) || 0,
      carbs: parseFloat(dishData.carbs) || 0,
      fats: parseFloat(dishData.fats) || 0,
      category: dishData.category,
      mealType: dishData.mealType,
    };

    dispatch(addFoodItem(newDish));
    handleClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-end z-50 p-4">
      <div className="bg-slate-900/95 backdrop-blur-xl border border-slate-700/50 rounded-xl shadow-2xl w-full max-w-md h-[90vh] flex flex-col overflow-hidden animate-slide-in-right">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-slate-700/50 bg-slate-800/50">
          <h2 className="text-xl font-bold text-white">Add Custom Dish</h2>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors"
          >
            <X size={20} className="text-gray-400 hover:text-white" />
          </button>
        </div>

        {/* Form - Scrollable */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {/* Dish Name */}
          <div>
            <label className="block text-white mb-2">Dish Name</label>
            <input
              type="text"
              placeholder="e.g. Chicken Stir Fry"
              value={dishData.name}
              onChange={(e) => setDishData({ ...dishData, name: e.target.value })}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Calories */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-white mb-2">Calories (per 100g)</label>
              <input
                type="number"
                placeholder="0"
                value={dishData.calories}
                onChange={(e) => setDishData({ ...dishData, calories: e.target.value })}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div>
              <label className="block text-white mb-2">Protein (g)</label>
              <input
                type="number"
                placeholder="0"
                value={dishData.protein}
                onChange={(e) => setDishData({ ...dishData, protein: e.target.value })}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>

          {/* Carbs and Fats */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-white mb-2">Carbs (g)</label>
              <input
                type="number"
                placeholder="0"
                value={dishData.carbs}
                onChange={(e) => setDishData({ ...dishData, carbs: e.target.value })}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div>
              <label className="block text-white mb-2">Fats (g)</label>
              <input
                type="number"
                placeholder="0"
                value={dishData.fats}
                onChange={(e) => setDishData({ ...dishData, fats: e.target.value })}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block text-white mb-2">Category</label>
            <select
              value={dishData.category}
              onChange={(e) => setDishData({ ...dishData, category: e.target.value })}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="Protein" className="bg-purple-900">Protein</option>
              <option value="Carbs" className="bg-purple-900">Carbs</option>
              <option value="Vegetables" className="bg-purple-900">Vegetables</option>
              <option value="Fruits" className="bg-purple-900">Fruits</option>
              <option value="Fats" className="bg-purple-900">Fats</option>
              <option value="Mixed" className="bg-purple-900">Mixed</option>
            </select>
          </div>

          {/* Meal Type */}
          <div>
            <label className="block text-white mb-2">Meal Type</label>
            <select
              value={dishData.mealType}
              onChange={(e) => setDishData({ ...dishData, mealType: e.target.value })}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="breakfast" className="bg-purple-900">Breakfast</option>
              <option value="lunch" className="bg-purple-900">Lunch</option>
              <option value="dinner" className="bg-purple-900">Dinner</option>
              <option value="snack" className="bg-purple-900">Snack</option>
            </select>
          </div>
        </div>

        {/* Footer - Fixed at bottom */}
        <div className="flex-shrink-0 p-6 border-t border-slate-700/50 bg-slate-800/30 flex justify-end gap-4">
          <button
            onClick={handleClose}
            className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-lg font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleAddDish}
            className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors"
          >
            Add Dish
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddDishModal;
