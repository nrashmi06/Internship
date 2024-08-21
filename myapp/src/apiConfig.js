// apiConfig.js
import config from '../config';

export const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

export const ENDPOINTS = {
  CATEGORIES: '/categories.php',               
  MEALS_BY_CATEGORY: '/filter.php?c=',         
  DETAIL_BY_ID: '/lookup.php?i='               
};

export const API_BASE_URL = `${config.apiUrl}/api`;

export const API_ENDPOINTS = {
  PROFILE: '/users/profile',  
  UPDATE_PROFILE_IMAGE: '/users/profile/image',  
  UPDATE_COMMENTS_PROFILE_IMAGE: '/users/update-profile-image',                     
  FAVORITES: '/users/profile/favorites',            
  LOGIN: '/users/login',                            
  REGISTER: '/users/register',
  REFRESH_TOKEN: '/auth/refresh-token',                    
};
