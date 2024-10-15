import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  // Add other initial state values if needed
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
    getUser: (state) => {
      return state.user;
    },
  },
});

export const { setUser, clearUser, getUser } = userSlice.actions;
export default userSlice.reducer;
