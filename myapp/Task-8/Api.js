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

export const fetchMealById = async (id) => {
  const url = `${BASE_URL}${ENDPOINTS.DETAIL_BY_ID}${id}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch meal');
    }

    const data = await response.json();
    return data.meals[0];
  } catch (error) {
    console.error('Error fetching meal:', error);
    return null; // Handle error gracefully, depending on your application's requirements
  }
};