import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../redux/slices/authSlices';
import GradientBackground from '../../components/GrandientBackground';
import AuthCard from '../../components/AuthCard';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = (data) => {
    dispatch(login(data));
  };

  return (
    <GradientBackground>
      <AuthCard title="Wellthier" subtitle="Nutrition Practice Management">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-lg font-medium text-white mb-2">
              Email:
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email address"
              className="custom-input bg-white/20 border border-white/30 placeholder-gray-200 text-white"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: 'Please enter a valid email address',
                },
              })}
            />
            {errors.email && <p className="text-red-500 text-lg mt-1">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-lg font-medium text-white mb-2">
              Password:
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter password"
              className="custom-input bg-white/20 border border-white/30 placeholder-gray-200 text-white"
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
              })}
            />
            {errors.password && <p className="text-red-500 text-lg mt-1">{errors.password.message}</p>}
          </div>

          {/* Forgot Password */}
          <div className="text-right">
            <Link to="/forgot-password" className="text-red-300 text-lg hover:text-white transition-colors">
              Forgot Password?
            </Link>
          </div>

          {/* Error message */}
          {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">{error}</div>}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full text-lg bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-4 rounded-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>

          {/* Signup link */}
          <div className="text-center mt-6">
            <span className="text-white text-lg">
              Don't have an account?{' '}
              <Link to="/signup" className="text-white hover:text-orange-600 transition-colors font-medium">
                Sign up
              </Link>
            </span>
          </div>
        </form>
      </AuthCard>
    </GradientBackground>
  );
};

export default Login;