
import { BASE_URL} from './apiConfig';

export const fetchRecipes = (endpoint) => {
  const url = `${BASE_URL}${endpoint}`;
  return fetch(url, {
    method: 'GET',
  })
    .then(response => response.json())
    .then(data => data.categories || data.meals) 
    .catch(error => {
      console.error(error);
      return [];
    });
};
