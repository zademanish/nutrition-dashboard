import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, X, Clock, ChevronDown, Edit2 } from 'lucide-react';
import {
  setSelectedDay,
  setSelectedMealType,
  addSelectedFoodItem,
  removeSelectedFoodItem,
  clearSelectedFoodItems,
  openAddDishModal,
  createMealPlan,
  openAssignModal
} from '../../redux/slices/mealsSlice';
import MainLayout from '../../layout/MainLayout';
import AddDishModal from './AddDishModal';
import AssignModal from './AssignModal';

const CreateMealPlan = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { selectedDay, selectedMealType, foodItems, selectedFoodItems } = useSelector(
    (state) => state.meals
  );

  const [planDetails, setPlanDetails] = useState({
    name: '',
    type: 'Maintain Weight',
    customType: '',
    description: '',
    duration: 7,
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [savedPlanId, setSavedPlanId] = useState(null);
  const [selectedDays, setSelectedDays] = useState([1]);
  const [customMealTypes, setCustomMealTypes] = useState([]);
  const [timeFormat, setTimeFormat] = useState('12'); // '12' for AM/PM, '24' for 24hr
  const [startDay, setStartDay] = useState(0); // 0=Monday, 1=Tuesday, etc.
  const [editingMeal, setEditingMeal] = useState(null);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [mealModal, setMealModal] = useState({ show: false, type: '', mealKey: '', isCustom: false, data: { name: '', time: '' } });
  const [activeFilter, setActiveFilter] = useState(null); // 'all', 'monday', 'tuesday', etc.
  const [currentDayIndex, setCurrentDayIndex] = useState(0); // Index in selectedDays array
  const [completedPatterns, setCompletedPatterns] = useState([]); // Track completed weekday patterns
  const [manualMode, setManualMode] = useState(false); // True when manually selecting days
  const [mealTimes, setMealTimes] = useState({
    breakfast: { time: '08:00', name: 'Breakfast' },
    lunch: { time: '13:00', name: 'Lunch' },
    dinner: { time: '19:00', name: 'Dinner' },
    snack: { time: '16:00', name: 'Snack' }
  });

  // Time conversion helpers (must be defined before use)
  const convertTo24Hour = (time) => {
    if (!time) return '00:00';
    // If already in 24hr format or doesn't have AM/PM
    if (!time.includes('AM') && !time.includes('PM')) {
      return time;
    }
    const [timePart, period] = time.split(' ');
    let [hours, minutes] = timePart.split(':');
    hours = parseInt(hours);
    if (period === 'PM' && hours !== 12) hours += 12;
    if (period === 'AM' && hours === 12) hours = 0;
    return `${hours.toString().padStart(2, '0')}:${minutes}`;
  };

  const convertTo12Hour = (time) => {
    if (!time) return '12:00 AM';
    const parts = time.split(':');
    if (parts.length < 2) return '12:00 AM';
    const [hours, minutes] = parts;
    let h = parseInt(hours);
    if (isNaN(h)) return '12:00 AM';
    const period = h >= 12 ? 'PM' : 'AM';
    h = h % 12 || 12;
    const mins = minutes || '00';
    return `${h.toString().padStart(2, '0')}:${mins} ${period}`;
  };

  const formatTime = (time) => {
    return timeFormat === '12' ? convertTo12Hour(time) : time;
  };

  // Toast notification helper
  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: '', type: 'success' });
    }, 3000);
  };

  const days = Array.from({ length: planDetails.duration || 7 }, (_, i) => i + 1);
  const baseMealTypes = Object.keys(mealTimes);
  const allMeals = [...Object.entries(mealTimes).map(([key, val]) => ({ key, ...val })), ...customMealTypes];
  const sortedMeals = allMeals.sort((a, b) => {
    const timeA = convertTo24Hour(a.time);
    const timeB = convertTo24Hour(b.time);
    return timeA.localeCompare(timeB);
  });
  const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  // Filter food items based on meal type and search
  const filteredFoodItems = foodItems.filter(item => {
    const matchesMealType = item.mealType.toLowerCase() === selectedMealType.toLowerCase();
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesMealType && matchesSearch;
  });

  const handleDayClick = (day) => {
    dispatch(setSelectedDay(day));
  };

  const handleMealTypeClick = (mealType) => {
    dispatch(setSelectedMealType(mealType.toLowerCase()));
  };

  const handleFoodItemClick = (itemId) => {
    if (selectedFoodItems.includes(itemId)) {
      dispatch(removeSelectedFoodItem(itemId));
    } else {
      dispatch(addSelectedFoodItem(itemId));
    }
  };

  const handleSaveAndNext = () => {
    // Logic to save current day's meals
    showToast(`Day ${selectedDay} meals saved`, 'success');
    
    // Move to next day in selectedDays array
    const nextIndex = currentDayIndex + 1;
    if (nextIndex < selectedDays.length) {
      const nextDay = selectedDays[nextIndex];
      setCurrentDayIndex(nextIndex);
      dispatch(setSelectedDay(nextDay));
      dispatch(clearSelectedFoodItems());
    } else {
      // Completed all selected days
      showToast('All selected days completed!', 'success');
    }
  };

  const handleSaveTemplate = () => {
    if (!planDetails.name) {
      showToast('Please enter a plan name', 'error');
      return;
    }
    
    const newPlan = {
      name: planDetails.name,
      description: planDetails.description,
      duration: planDetails.duration,
      calories: calculateTotalCalories(),
      macros: calculateMacros(),
      tags: ['Custom'],
      createdBy: 'Current User',
    };
    
    dispatch(createMealPlan(newPlan));
    setSavedPlanId(newPlan.id);
    showToast('Meal plan saved as template!', 'success');
    
    // Navigate to meal plans page after 1 second
    setTimeout(() => {
      navigate('/meals');
    }, 1000);
  };

  const handleAssignToClients = () => {
    if (savedPlanId) {
      dispatch(openAssignModal(savedPlanId));
    } else {
      // Save first, then assign
      const newPlan = {
        name: planDetails.name,
        description: planDetails.description,
        duration: planDetails.duration,
        calories: calculateTotalCalories(),
        macros: calculateMacros(),
        tags: ['Custom'],
        createdBy: 'Current User',
      };
      
      dispatch(createMealPlan(newPlan));
      setTimeout(() => {
        dispatch(openAssignModal(newPlan.id));
      }, 100);
    }
  };

  const calculateTotalCalories = () => {
    return selectedFoodItems.reduce((total, itemId) => {
      const item = foodItems.find(f => f.id === itemId);
      return total + (item?.calories || 0);
    }, 0);
  };

  const calculateMacros = () => {
    const totals = selectedFoodItems.reduce((acc, itemId) => {
      const item = foodItems.find(f => f.id === itemId);
      return {
        protein: acc.protein + (item?.protein || 0),
        carbs: acc.carbs + (item?.carbs || 0),
        fats: acc.fats + (item?.fats || 0),
      };
    }, { protein: 0, carbs: 0, fats: 0 });
    
    return totals;
  };

  const getSelectedFoodItemsData = () => {
    return selectedFoodItems.map(itemId => 
      foodItems.find(item => item.id === itemId)
    ).filter(Boolean);
  };

  // Helper functions
  const handleToggleDay = (day) => {
    setManualMode(true);
    setActiveFilter(null);
    setSelectedDays(prev => {
      const newDays = prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day];
      // If day is added, set it as current
      if (!prev.includes(day)) {
        dispatch(setSelectedDay(day));
      }
      return newDays;
    });
  };

  const handleSelectAllDays = () => {
    setManualMode(false);
    setSelectedDays(days);
    setActiveFilter('all');
    setCurrentDayIndex(0);
    if (days.length > 0) {
      dispatch(setSelectedDay(days[0]));
    }
  };

  const handleUnselectAll = () => {
    setSelectedDays([]);
    setActiveFilter(null);
    setCurrentDayIndex(0);
    setManualMode(false);
    setCompletedPatterns([]);
  };

  const handleSelectWeekday = (weekdayIndex) => {
    // Calculate which days correspond to this weekday (max 7 for pattern)
    const weekdayDays = days.filter((day) => {
      const dayOfWeek = (startDay + day - 1) % 7;
      return dayOfWeek === weekdayIndex;
    }).slice(0, 7); // Limit to 7 occurrences
    setManualMode(false);
    setSelectedDays(weekdayDays);
    setActiveFilter(`weekday-${weekdayIndex}`);
    setCurrentDayIndex(0);
    // Set first day in pattern as active
    if (weekdayDays.length > 0) {
      dispatch(setSelectedDay(weekdayDays[0]));
      dispatch(clearSelectedFoodItems());
    }
  };

  const handleSaveAndContinue = () => {
    // Save current pattern and mark as completed
    const currentWeekday = activeFilter?.replace('weekday-', '');
    if (currentWeekday !== undefined) {
      showToast(`${weekdays[currentWeekday]} meals saved for all ${selectedDays.length} days`, 'success');
      setCompletedPatterns([...completedPatterns, parseInt(currentWeekday)]);
      setActiveFilter(null);
      setSelectedDays([]);
      dispatch(clearSelectedFoodItems());
    }
  };

  const handleAddCustomMeal = () => {
    setMealModal({ 
      show: true, 
      type: 'add', 
      mealKey: '', 
      isCustom: true, 
      data: { name: '', time: timeFormat === '12' ? '12:00 PM' : '12:00' } 
    });
  };

  const handleRemoveCustomMeal = (mealName) => {
    setCustomMealTypes(customMealTypes.filter(m => m.name !== mealName));
    showToast('Custom meal removed', 'success');
  };

  const handleEditMeal = (mealKey, isCustom = false) => {
    if (isCustom) {
      const meal = customMealTypes.find(m => m.name === mealKey);
      setMealModal({
        show: true,
        type: 'edit',
        mealKey: mealKey,
        isCustom: true,
        data: { name: meal.name, time: formatTime(meal.time) }
      });
    } else {
      const meal = mealTimes[mealKey];
      setMealModal({
        show: true,
        type: 'edit',
        mealKey: mealKey,
        isCustom: false,
        data: { name: meal.name, time: formatTime(meal.time) }
      });
    }
  };

  const handleMealModalSubmit = () => {
    const { type, mealKey, isCustom, data } = mealModal;
    
    if (!data.name || !data.time) {
      showToast('Please fill all fields', 'error');
      return;
    }

    const time24 = timeFormat === '12' ? convertTo24Hour(data.time) : data.time;

    if (type === 'add') {
      setCustomMealTypes([...customMealTypes, { name: data.name, time: time24 }]);
      showToast('Custom meal added', 'success');
    } else if (type === 'edit') {
      if (isCustom) {
        setCustomMealTypes(customMealTypes.map(m => 
          m.name === mealKey ? { name: data.name, time: time24 } : m
        ));
      } else {
        setMealTimes({
          ...mealTimes,
          [mealKey]: { name: data.name, time: time24 }
        });
      }
      showToast('Meal updated', 'success');
    }

    setMealModal({ show: false, type: '', mealKey: '', isCustom: false, data: { name: '', time: '' } });
  };

  const getSelectedItemsByMealType = () => {
    const grouped = {};
    
    // Initialize grouped object with all meal types
    sortedMeals.forEach(meal => {
      grouped[meal.name] = [];
    });
    
    selectedFoodItems.forEach(itemId => {
      const item = foodItems.find(f => f.id === itemId);
      if (item) {
        const mealType = item.mealType.charAt(0).toUpperCase() + item.mealType.slice(1);
        if (!grouped[mealType]) {
          grouped[mealType] = [];
        }
        grouped[mealType].push(item);
      }
    });
    
    return grouped;
  };

  return (
  
      <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-white mb-2">Create Meal Plan</h1>
        <p className="text-gray-200">Design a comprehensive nutrition plan</p>
      </div>

      {/* Plan Details Form */}
      <div className="glass-card p-6 mb-6 fade-in">
        <h2 className="text-xl font-semibold text-white mb-4">Plan Details</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {/* Plan Name */}
          <div>
            <label className="block text-white mb-2">Plan Name</label>
            <input
              type="text"
              placeholder="e.g. Weight Loss Plan"
              value={planDetails.name}
              onChange={(e) => setPlanDetails({ ...planDetails, name: e.target.value })}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Plan Type */}
          <div>
            <label className="block text-white mb-2">Plan Type</label>
            <div className="relative">
              <select
                value={planDetails.type}
                onChange={(e) => setPlanDetails({ ...planDetails, type: e.target.value })}
                className="w-full px-4 py-3 bg-slate-800/50 border-2 border-orange-500/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 appearance-none cursor-pointer"
                style={{ backgroundImage: 'none' }}
              >
                <option value="Custom" className="bg-slate-800 text-blue-400">Custom</option>
                <option value="Weight Loss" className="bg-slate-800 text-purple-400">Weight Loss</option>
                <option value="Muscle Gain" className="bg-slate-800 text-purple-400">Muscle Gain</option>
                <option value="Maintain Weight" className="bg-slate-800 text-purple-400">Maintain Weight</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white w-5 h-5 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Custom Plan Type Input */}
        {planDetails.type === 'Custom' && (
          <div className="mb-4">
            <label className="block text-white mb-2">Custom Plan Name</label>
            <input
              type="text"
              placeholder="Enter your custom plan type..."
              value={planDetails.customType}
              onChange={(e) => setPlanDetails({ ...planDetails, customType: e.target.value })}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        )}

        {/* Description */}
        <div className="mb-4">
          <label className="block text-white mb-2">Description</label>
          <textarea
            placeholder="Describe the plan goals and approach..."
            value={planDetails.description}
            onChange={(e) => setPlanDetails({ ...planDetails, description: e.target.value })}
            rows="3"
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* Duration */}
        <div>
          <label className="block text-white mb-2">Duration (days)</label>
          <input
            type="number"
            min="1"
            value={planDetails.duration}
            onChange={(e) => {
              const value = e.target.value;
              setPlanDetails({ ...planDetails, duration: value === '' ? '' : parseInt(value) || 1 });
            }}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Enter number of days (e.g., 7, 14, 30, 90)"
          />
        </div>
      </div>

      {/* Meal Planning Section */}
      <div className="glass-card p-6 fade-in">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-white">Meal Planning</h2>
          
          <div className="flex gap-4 items-center">
            {/* Time Format Toggle */}
            <div className="flex gap-2 bg-slate-800/50 rounded-lg p-1">
              <button
                onClick={() => setTimeFormat('12')}
                className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                  timeFormat === '12' 
                    ? 'bg-orange-500 text-white' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                AM/PM
              </button>
              <button
                onClick={() => setTimeFormat('24')}
                className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                  timeFormat === '24' 
                    ? 'bg-orange-500 text-white' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                24hr
              </button>
            </div>

            {/* Start Day Selector */}
            <div>
              <label className="text-gray-400 text-xs mr-2">Day 1 starts on:</label>
              <select
                value={startDay}
                onChange={(e) => setStartDay(parseInt(e.target.value))}
                className="px-3 py-1 bg-slate-800/50 border border-slate-700/50 rounded text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                {weekdays.map((day, index) => (
                  <option key={day} value={index} className="bg-slate-800">{day}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Day Selection Controls */}
        <div className="mb-4">
          {/* Completed Patterns Indicator */}
          {completedPatterns.length > 0 && (
            <div className="mb-3 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
              <p className="text-green-400 text-sm font-medium">
                ✓ Completed Patterns: {completedPatterns.map(i => weekdays[i]).join(', ')}
              </p>
            </div>
          )}

          <div className="flex flex-wrap gap-2 mb-3">
            <button
              onClick={handleSelectAllDays}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeFilter === 'all'
                  ? 'bg-orange-500 text-white'
                  : 'bg-orange-500/20 hover:bg-orange-500/30 text-orange-400'
              }`}
            >
              Select All Days
            </button>
            <button
              onClick={handleUnselectAll}
              className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg text-sm font-medium transition-colors"
            >
              Unselect All
            </button>
            {weekdays.map((weekday, index) => {
              const isCompleted = completedPatterns.includes(index);
              if (isCompleted) return null; // Hide completed patterns
              
              return (
                <button
                  key={weekday}
                  onClick={() => handleSelectWeekday(index)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeFilter === `weekday-${index}`
                      ? 'bg-blue-500 text-white'
                      : 'bg-blue-500/20 hover:bg-blue-500/30 text-blue-400'
                  }`}
                >
                  Every {weekday}
                </button>
              );
            })}
          </div>
        </div>

        {/* Day Tabs - Scrollable */}
        <div className="mb-6">
          <div className="flex gap-2 overflow-x-auto pb-2 max-h-32 flex-wrap">
            {days.map((day) => {
              const isSelected = selectedDays.includes(day);
              const isDisabled = activeFilter && activeFilter !== 'all' && !isSelected;
              
              return (
                <button
                  key={day}
                  onClick={() => !activeFilter && handleToggleDay(day)}
                  disabled={activeFilter !== null}
                  className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
                    isSelected
                      ? 'bg-orange-500 text-white'
                      : isDisabled
                      ? 'bg-white/5 text-gray-500 cursor-not-allowed opacity-50'
                      : 'bg-white/10 text-gray-200 hover:bg-white/20'
                  }`}
                >
                  Day {day}
                </button>
              );
            })}
          </div>
          {selectedDays.length > 0 && (
            <div className="mt-3 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <p className="text-gray-300 text-sm">
                <strong className="text-blue-400">Selected Days:</strong> {selectedDays.length} day{selectedDays.length !== 1 ? 's' : ''} (Days: {selectedDays.join(', ')})
              </p>
              {activeFilter && activeFilter !== 'all' && (
                <p className="text-blue-300 text-sm mt-1">
                  ℹ️ The meals you select below will be automatically assigned to all these days
                </p>
              )}
            </div>
          )}
        </div>

        {/* Meal Type Tabs - Sorted by Time */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {sortedMeals.map((meal) => {
            const isCustom = !meal.key;
            const mealKey = meal.key || meal.name;
            const mealName = meal.name;
            const mealTime = formatTime(meal.time);
            const isBase = baseMealTypes.includes(mealKey);
            
            return (
              <div key={mealKey} className="relative group">
                <button
                  onClick={() => handleMealTypeClick(mealName)}
                  className={`px-6 py-3 rounded-lg font-medium whitespace-nowrap transition-all ${
                    selectedMealType === mealName.toLowerCase()
                      ? 'bg-orange-500 text-white'
                      : isCustom
                      ? 'bg-purple-500/20 text-purple-300 hover:bg-purple-500/30'
                      : 'bg-white/10 text-gray-200 hover:bg-white/20'
                  }`}
                >
                  {mealName}
                  <span className="ml-2 text-xs opacity-75">({mealTime})</span>
                </button>
                
                {/* Edit and Remove buttons on hover */}
                <div className="absolute -top-1 -right-1 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleEditMeal(isCustom ? mealName : mealKey, isCustom)}
                    className="bg-slate-800 hover:bg-slate-700 text-white rounded px-2 py-1 text-xs font-medium flex items-center gap-1 border border-slate-600"
                    title="Edit meal"
                  >
                    <Edit2 size={10} />
                    <span>Edit</span>
                  </button>
                  {isCustom && (
                    <button
                      onClick={() => handleRemoveCustomMeal(mealName)}
                      className="bg-red-500 hover:bg-red-600 text-white rounded-full p-1"
                      title="Remove meal"
                    >
                      <X size={12} />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
          <button
            onClick={handleAddCustomMeal}
            className="px-6 py-3 bg-green-500/20 hover:bg-green-500/30 text-green-400 rounded-lg font-medium whitespace-nowrap transition-all flex items-center gap-2"
          >
            <Plus size={18} />
            Add Custom Meal
          </button>
        </div>

        {/* Search and Add Custom Dish */}
        <div className="flex gap-4 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search food items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <button
            onClick={() => dispatch(openAddDishModal())}
            className="flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors whitespace-nowrap"
          >
            <Plus size={20} />
            Add Custom Dish
          </button>
        </div>

        {/* Food Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {filteredFoodItems.map((item) => (
            <div
              key={item.id}
              onClick={() => handleFoodItemClick(item.id)}
              className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                selectedFoodItems.includes(item.id)
                  ? 'bg-teal-500/30 border-teal-400'
                  : 'bg-white/5 border-white/20 hover:bg-white/10'
              }`}
            >
              <h4 className="text-white font-medium mb-1">{item.name}</h4>
              <p className="text-gray-300 text-sm">
                {item.calories}cal, {item.protein}g protein
              </p>
            </div>
          ))}
        </div>

        {/* Selected Food Items - Grouped by Meal Type */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-white mb-3">Selected Food Items</h3>
          {getSelectedFoodItemsData().length > 0 ? (
            <div className="space-y-4">
              {Object.entries(getSelectedItemsByMealType()).map(([mealType, items]) => {
                if (items.length === 0) return null;
                const mealKey = mealType.toLowerCase();
                const mealData = mealTimes[mealKey] || customMealTypes.find(m => m.name === mealType);
                const time = mealData ? formatTime(mealData.time) : null;
                
                return (
                  <div key={mealType} className="bg-slate-800/30 rounded-lg p-4 border border-slate-700/50">
                    <div className="flex items-center gap-2 mb-3">
                      <h4 className="text-white font-semibold text-base">{mealType}</h4>
                      {time && (
                        <div className="flex items-center gap-1 text-orange-400 text-sm">
                          <Clock size={14} />
                          <span>{time}</span>
                        </div>
                      )}
                      <span className="text-gray-400 text-sm">({items.length} items)</span>
                    </div>
                    <div className="space-y-2">
                      {items.map((item) => (
                        <div
                          key={item.id}
                          className="flex justify-between items-center p-3 bg-slate-800/50 rounded-lg border border-slate-700/50"
                        >
                          <div>
                            <p className="text-white font-medium">{item.name}</p>
                            <p className="text-gray-300 text-sm">
                              {item.calories}cal, {item.protein}g protein
                            </p>
                          </div>
                          <button
                            onClick={() => dispatch(removeSelectedFoodItem(item.id))}
                            className="text-red-400 hover:text-red-300 p-2 hover:bg-red-500/10 rounded-lg transition-colors"
                          >
                            <X size={18} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-gray-300 text-center py-4">No food items selected</p>
          )}
        </div>

        {/* Save & Continue Button for Patterns */}
        {activeFilter && activeFilter !== 'all' && !manualMode && selectedDays.length > 0 && (
          <div className="mb-4">
            <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg mb-4">
              <p className="text-blue-300 text-sm">
                <strong>Pattern Mode:</strong> The meals you select will be applied to all {selectedDays.length} selected days ({selectedDays.join(', ')})
              </p>
            </div>
            <div className="flex justify-end">
              <button
                onClick={handleSaveAndContinue}
                className="px-8 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Save & Continue to Next Pattern
              </button>
            </div>
          </div>
        )}

        {/* Save & Next for Manual Mode */}
        {manualMode && selectedDays.length > 0 && currentDayIndex < selectedDays.length - 1 && (
          <div className="flex justify-end mb-4">
            <button
              onClick={handleSaveAndNext}
              className="px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors"
            >
              Save & Next Day ({currentDayIndex + 1}/{selectedDays.length})
            </button>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between gap-4 mt-6">
        <button
          onClick={() => navigate('/meals')}
          className="px-8 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-lg font-medium transition-colors"
        >
          Cancel
        </button>
        <div className="flex gap-4">
          <button
            onClick={handleAssignToClients}
            className="px-8 py-3 bg-teal-500 hover:bg-teal-600 text-white rounded-lg font-medium transition-colors"
          >
            Assign to Clients
          </button>
          <button
            onClick={handleSaveTemplate}
            className="px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors"
          >
            Save Template
          </button>
        </div>
      </div>

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

      {/* Meal Edit/Add Modal */}
      {mealModal.show && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 rounded-xl shadow-2xl border border-slate-700/50 max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-white mb-4">
              {mealModal.type === 'add' ? 'Add Custom Meal' : 'Edit Meal'}
            </h3>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-white mb-2 text-sm">Meal Name</label>
                <input
                  type="text"
                  placeholder="e.g., Evening Snack"
                  value={mealModal.data.name}
                  onChange={(e) => setMealModal({ ...mealModal, data: { ...mealModal.data, name: e.target.value } })}
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              
              <div>
                <label className="block text-white mb-2 text-sm">
                  Time {timeFormat === '12' ? '(e.g., 03:30 PM)' : '(e.g., 15:30)'}
                </label>
                <input
                  type="text"
                  placeholder={timeFormat === '12' ? '12:00 PM' : '12:00'}
                  value={mealModal.data.time}
                  onChange={(e) => setMealModal({ ...mealModal, data: { ...mealModal.data, time: e.target.value } })}
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={() => setMealModal({ show: false, type: '', mealKey: '', isCustom: false, data: { name: '', time: '' } })}
                className="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleMealModalSubmit}
                className="flex-1 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors"
              >
                {mealModal.type === 'add' ? 'Add' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modals */}
      <AddDishModal />
      <AssignModal />
      </div>
  );
};

export default CreateMealPlan;
