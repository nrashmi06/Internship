// features/token/tokenSlice.js
import { createSlice } from '@reduxjs/toolkit';

const tokenSlice = createSlice({
  name: 'token',
  initialState: {
    refreshToken: null,
  },
  reducers: {
    setRefreshToken(state, action) {
      state.refreshToken = action.payload;
    },
    clearRefreshToken(state) {
      state.refreshToken = null;
    },
  },
});

export const { setRefreshToken, clearRefreshToken } = tokenSlice.actions;
export default tokenSlice.reducer;
