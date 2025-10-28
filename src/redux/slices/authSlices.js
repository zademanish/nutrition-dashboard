import { createSlice } from '@reduxjs/toolkit';

const ensureDefaultUser = () => {
  try {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const hasDefault = users.some(u => u.email === 'admin@wellthier.com');
    if (!hasDefault) {
      const defaultUser = {
        id: 1,
        name: 'Admin',
        email: 'admin@wellthier.com',
        password: 'admin123',
      };
      users.unshift(defaultUser);
      localStorage.setItem('users', JSON.stringify(users));
    }
  } catch (err) {
    const defaultUser = [{
      id: 1,
      name: 'Admin',
      email: 'admin@wellthier.com',
      password: 'admin123',
    }];
    localStorage.setItem('users', JSON.stringify(defaultUser));
  }
};

ensureDefaultUser();

const storedCurrentUser = (() => {
  try {
    return JSON.parse(localStorage.getItem('currentUser'));
  } catch {
    return null;
  }
})();

const initialState = {
  isAuthenticated: !!storedCurrentUser,
  user: storedCurrentUser || null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.error = action.payload;
    },
    signupStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    signupSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
    },
    signupFailure: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.error = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
      state.loading = false;
    },
    resetPasswordStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    resetPasswordSuccess: (state) => {
      state.loading = false;
      state.error = null;
    },
    resetPasswordFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  signupStart,
  signupSuccess,
  signupFailure,
  logout,
  resetPasswordStart,
  resetPasswordSuccess,
  resetPasswordFailure,
} = authSlice.actions;

export const signup = (userData) => async (dispatch) => {
  dispatch(signupStart());
  setTimeout(() => {
    try {
      if (!userData.name || !userData.email || !userData.password) {
        dispatch(signupFailure('All fields are required'));
        return;
      }
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const existing = users.find((u) => u.email === userData.email);
      if (existing) {
        dispatch(signupFailure('User already exists with this email'));
        return;
      }
      const newUser = {
        id: Date.now(),
        name: userData.name,
        email: userData.email,
        password: userData.password,
      };
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      localStorage.setItem('currentUser', JSON.stringify(newUser));
      dispatch(signupSuccess(newUser));
    } catch (err) {
      dispatch(signupFailure(err.message || 'Signup failed'));
    }
  }, 700);
};

export const login = (credentials) => async (dispatch) => {
  dispatch(loginStart());
  setTimeout(() => {
    try {
      const users = JSON.parse(localStorage.getItem('users')) || [];
      if (!Array.isArray(users) || users.length === 0) {
        ensureDefaultUser();
      }
      const found = users.find(
        (u) =>
          String(u.email).toLowerCase() === String(credentials.email).toLowerCase() &&
          u.password === credentials.password
      );
      if (found) {
        localStorage.setItem('currentUser', JSON.stringify(found));
        dispatch(loginSuccess(found));
      } else {
        dispatch(loginFailure('Invalid email or password'));
      }
    } catch (err) {
      dispatch(loginFailure(err.message || 'Login failed'));
    }
  }, 700);
};

export const resetPassword = ({ email, newPassword }) => async (dispatch) => {
  dispatch(resetPasswordStart());
  setTimeout(() => {
    try {
      if (!email || !newPassword) {
        dispatch(resetPasswordFailure('Email and new password are required'));
        return;
      }
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const idx = users.findIndex((u) => String(u.email).toLowerCase() === String(email).toLowerCase());
      if (idx === -1) {
        dispatch(resetPasswordFailure('Email not found'));
        return;
      }
      users[idx].password = newPassword;
      localStorage.setItem('users', JSON.stringify(users));
      const current = JSON.parse(localStorage.getItem('currentUser'));
      if (current && String(current.email).toLowerCase() === String(email).toLowerCase()) {
        const updated = { ...users[idx] };
        localStorage.setItem('currentUser', JSON.stringify(updated));
      }
      dispatch(resetPasswordSuccess());
    } catch (err) {
      dispatch(resetPasswordFailure(err.message || 'Reset failed'));
    }
  }, 700);
};

export const performLogout = () => async (dispatch) => {
  try {
    localStorage.removeItem('currentUser');
    dispatch(logout());
  } catch (err) {
    dispatch(logout());
  }
};

export default authSlice.reducer;