import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 
import { combineReducers } from 'redux';
import tokenReducer from './features/token/tokenSlice';
import favoritesReducer from './features/favorites/favoritesSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['token', 'favorites'], 
};


const rootReducer = combineReducers({
  token: tokenReducer,
  favorites: favoritesReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
export default store;
