import { createSlice } from '@reduxjs/toolkit';

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('authState');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error("Could not load state from localStorage", err);
    return undefined;
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('authState', serializedState);
  } catch (err) {
    console.error("Could not save state to localStorage", err);
  }
};

const initialState = loadState() || {
  isAuthenticated: false,
  user: null,
  accessToken: null,
  refresh:null,
};


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.accessToken = action.payload.access;
      state.refresh = action.payload.refresh;
      saveState(state);
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.accessToken = null;
      state.refresh = null;
      saveState(state);
    },
    reset: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.accessToken = null;
      state.refresh = null;
      saveState(state);
    },
  },
});

export const { login, logout, reset } = authSlice.actions;
export default authSlice.reducer;