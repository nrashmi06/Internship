import { BASE_URL, ENDPOINTS } from './apiConfig';

export const fetchRecipes = () => {
  const url = `${BASE_URL}${ENDPOINTS.CATEGORIES}`;
  return fetch(url, {
    method: 'GET',
  })
    .then(response => response.json())
    .then(data => data.categories) 
    .catch(error => {
      console.error(error);
      return [];
    });
};

export const fetchMealsByCategory = (category) => {
  const url = `${BASE_URL}${ENDPOINTS.MEALS_BY_CATEGORY}${category}`;
  return fetch(url, {
    method: 'GET',
  })
    .then(response => response.json())
    .then(data => data.meals) 
    .catch(error => {
      console.error(error);
      return [];
    });
};
