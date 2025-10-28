import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetPassword } from "../../redux/slices/authSlices";
import GradientBackground from "../../components/GrandientBackground";
import AuthCard from "../../components/AuthCard";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const newPassword = watch("newPassword");

  const onSubmit = (data) => {
    dispatch(resetPassword(data));
    setTimeout(() => {
      navigate("/login");
    }, 1500);
  };

  return (
    <GradientBackground>
      <AuthCard title="Reset Password" subtitle="Enter your email & new password">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-lg font-medium text-white mb-2">
              Email:
            </label>
            <input
              type="email"
              className="custom-input"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && <p className="text-red-500 text-lg mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-lg font-medium text-white mb-2">
              New Password:
            </label>
            <input
              type="password"
              className="custom-input"
              {...register("newPassword", {
                required: "New password is required",
                minLength: { value: 6, message: "Must be at least 6 characters" },
              })}
            />
            {errors.newPassword && (
              <p className="text-red-500 text-lg mt-1">{errors.newPassword.message}</p>
            )}
          </div>

          <div>
            <label className="block text-lg font-medium text-white mb-2">
              Confirm Password:
            </label>
            <input
              type="password"
              className="custom-input"
              {...register("confirmPassword", {
                required: "Please confirm password",
                validate: (value) => value === newPassword || "Passwords do not match",
              })}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-lg mt-1">{errors.confirmPassword.message}</p>
            )}
          </div>

          {error && <div className="bg-red-100 text-red-700 px-4 py-3 rounded">{error}</div>}

          <button
            type="submit"
            disabled={loading}
            className="w-full text-lg bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-4 rounded-md transition-colors duration-200 disabled:opacity-50"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </AuthCard>
    </GradientBackground>
  );
};

export default ForgotPassword;