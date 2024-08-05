import { createSlice } from '@reduxjs/toolkit';

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: [],
  reducers: {
    addFavorite: (state, action) => {
      state.push(action.payload);
    },
    removeFavorite: (state, action) => {
      return state.filter(mealId => mealId !== action.payload);
    },
    setFavorites: (state, action) => {
      return action.payload;
    },
    clearFavorites: () => [],
  },
});

export const { addFavorite, removeFavorite, setFavorites, clearFavorites } = favoritesSlice.actions;

export default favoritesSlice.reducer;
