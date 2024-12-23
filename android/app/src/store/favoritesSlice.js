// src/store/favoritesSlice.js
import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = [];

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    setFavorites: (state, action) => action.payload,
    addFavorite: (state, action) => {
      const exists = state.find(p => p.id === action.payload.id);
      if (!exists) {
        state.push(action.payload);
        AsyncStorage.setItem('favorites', JSON.stringify(state));
      }
    },
    removeFavorite: (state, action) => {
      const filtered = state.filter(p => p.id !== action.payload);
      AsyncStorage.setItem('favorites', JSON.stringify(filtered));
      return filtered;
    },
  },
});

export const { addFavorite, removeFavorite, setFavorites } = favoritesSlice.actions;

export default favoritesSlice.reducer;
