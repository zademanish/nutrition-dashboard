import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { MealPlans, CreateMealPlan } from '../../pages/Meals';

const MealsNavigation = () => {
  return (
    <Routes>
      <Route path="/" element={<MealPlans />} />
      <Route path="/create" element={<CreateMealPlan />} />
      <Route path="/edit/:id" element={<CreateMealPlan />} />
      <Route path="*" element={<Navigate to="/meals" replace />} />
    </Routes>
  );
};

export default MealsNavigation;
