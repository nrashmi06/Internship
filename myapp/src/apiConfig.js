// apiConfig.js

// Define the base URL for the external API (TheMealDB)
export const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

// Define the endpoints for the external API (TheMealDB)
export const ENDPOINTS = {
  CATEGORIES: '/categories.php',                // Endpoint to get meal categories
  MEALS_BY_CATEGORY: '/filter.php?c=',          // Endpoint to get meals by category
  DETAIL_BY_ID: '/lookup.php?i='                // Endpoint to get meal details by ID
};

// Define the base URL for your own API
export const API_BASE_URL = '/api';

// Define endpoints for your own API
export const API_ENDPOINTS = {
  PROFILE: '/users/profile',                         // Endpoint to get the user profile
  FAVORITES: '/users/profile/favorites',             // Endpoint to manage user favorites
  LOGIN: '/users/login',                            // Endpoint for user login
  REGISTER: '/users/register',
  REFRESH_TOKEN: '/auth/refresh-token'                       
};
