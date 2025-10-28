import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "./redux/slices/authSlices";

// Layout
import MainLayout from "./layout/MainLayout";

// Auth Pages
import Login from "./pages/Auth/Login";
import SignupPage from "./pages/Auth/SignupPage";
import ForgotPassword from "./pages/Auth/ForgotPassword";

// Dashboard & Placeholder Pages
import Dashboard from "./pages/Dashboard/Dashboard";

// Components
import ProtectedRoute from "./components/ProtectedRoute";
import Appointment from "./pages/Dashboard/Appointment";
import WorkoutPlan from "./pages/Dashboard/CreateWorkoutPlan";
import WorkoutPlans from "./pages/Dashboard/WorkoutPlans";
import CreateWorkoutPlan from "./pages/Dashboard/CreateWorkoutPlan";
import Clients from "./pages/Clients/Clients"
import MealsNavigation from "./navigation/meals/MealsNavigation";

// === Auth Checker (keeps user logged in if data exists in localStorage) ===
const AuthChecker = ({ children }) => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser && !isAuthenticated) {
      try {
        const user = JSON.parse(currentUser);
        dispatch(loginSuccess(user));
      } catch (error) {
        console.error("Error parsing user data:", error);
        localStorage.removeItem("currentUser");
      }
    }
  }, [dispatch, isAuthenticated]);

  return children;
};

function App() {
  return (
    <AuthChecker>
      <Router>
        <Routes>
          {/* ---------- Public Routes ---------- */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/signuppage" element={<SignupPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* ---------- Protected Routes (Wrapped in MainLayout) ---------- */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>
            }
          >
            {/* Child Routes inside MainLayout */}
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />

           

            <Route
              path="appointments"
              element={<Appointment/>}
            />

                <Route path="clients" element={<Clients/>} />

            {/* <Route
              path="meal-plans"
              element={
                <div className="dashboard-gradient min-h-screen flex items-center justify-center">
                  <div className="glass-card p-8 text-center">
                    <h1 className="text-2xl font-bold text-white mb-4">
                      Meal Plans Page
                    </h1>
                    <p className="text-gray-300">Coming soon...</p>
                  </div>
                </div>
              }
            /> */}

             <Route
            path="/meals/*"
            element={
              <ProtectedRoute>
                <MealsNavigation />
              </ProtectedRoute>
            }
          />

            <Route
              path="workouts"
              element={<WorkoutPlans/>}
            />

           <Route path="/workouts/create" element={<CreateWorkoutPlan />} />

            <Route
              path="analytics"
              element={
                <div className="dashboard-gradient min-h-screen flex items-center justify-center">
                  <div className="glass-card p-8 text-center">
                    <h1 className="text-2xl font-bold text-white mb-4">
                      Analytics Page
                    </h1>
                    <p className="text-gray-300">Coming soon...</p>
                  </div>
                </div>
              }
            />

            <Route
              path="billing"
              element={
                <div className="dashboard-gradient min-h-screen flex items-center justify-center">
                  <div className="glass-card p-8 text-center">
                    <h1 className="text-2xl font-bold text-white mb-4">
                      Billing Page
                    </h1>
                    <p className="text-gray-300">Coming soon...</p>
                  </div>
                </div>
              }
            />
          </Route>

          {/* ---------- Fallback ---------- */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Router>
    </AuthChecker>
  );
}

export default App;
