import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password',
    role: 'user',
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
  },
  isLoading:false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    logout: (state) => {
      state.user = null;
      state.isLoading = false;
      state.error = null;
    },
  },
});

export const { setUser, setLoading, setError, logout } = userSlice.actions;
export default userSlice.reducer; 