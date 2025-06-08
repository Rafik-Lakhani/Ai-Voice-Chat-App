import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  history: [],
  isLoading: false,
  error: null
};

const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    addMessage: (state, action) => {
      state.history.push(action.payload);
    },
    clearHistory: (state) => {
      state.history = [];
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    }
  }
});

export const { 
  addMessage, 
  clearHistory, 
  setLoading, 
  setError 
} = historySlice.actions;

export default historySlice.reducer; 