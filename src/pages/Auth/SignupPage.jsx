import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { signup } from '../../redux/slices/authSlices';
import GradientBackground from '..//../components/GrandientBackground';
import AuthCard from '../../components/AuthCard';

const SignupPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch('password');

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = (data) => {
    dispatch(signup(data));
  };

  return (
    <GradientBackground>
      <AuthCard title="WELLTHIER" subtitle="Super Admin Panel">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-lg font-medium text-white mb-2">
              Name:
            </label>
            <input
              id="name"
              type="text"
              placeholder="Enter your name"
              className="custom-input bg-white/20 border border-white/30 placeholder-gray-200 text-white"
              {...register('name', {
                required: 'Name is required',
                minLength: {
                  value: 2,
                  message: 'Name must be at least 2 characters',
                },
              })}
            />
            {errors.name && <p className="text-red-500 text-lg mt-1">{errors.name.message}</p>}
          </div>

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

          {/* Confirm Password */}
          <div>
            <label htmlFor="confirmPassword" className="block text-lg font-medium text-white mb-2">
              Confirm Password:
            </label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              className="custom-input bg-white/20 border border-white/30 placeholder-gray-200 text-white"
              {...register('confirmPassword', {
                required: 'Please confirm your password',
                validate: (value) => value === password || 'Passwords do not match',
              })}
            />
            {errors.confirmPassword && <p className="text-red-500 text-lg mt-1">{errors.confirmPassword.message}</p>}
          </div>

          {/* Error message */}
          {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">{error}</div>}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 hover:bg-orange-600 text-lg text-white font-medium py-3 px-4 rounded-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>

          {/* Login link */}
          <div className="text-center mt-6">
            <span className="text-white text-lg">
              Already have an account?{' '}
              <Link to="/login" className="text-white hover:text-orange-400 transition-colors font-medium">
                Sign in
              </Link>
            </span>
          </div>
        </form>
      </AuthCard>
    </GradientBackground>
  );
};

export default SignupPage;