import { BASE_URL, ENDPOINTS, API_BASE_URL, API_ENDPOINTS } from './apiConfig';
import { getAccessToken, getRefreshToken, setAccessToken, setRefreshToken, clearTokens } from './LocalStorage';

export const fetchWithToken = async (url, options = {}) => {
  let token = getAccessToken();
  options.headers = {
    ...options.headers,
    'Authorization': `Bearer ${token}`,
  };

  let response = await fetch(url, options);
  if (response.status === 401) { // Token expired
    const newTokens = await refreshAccessToken();
    if (newTokens) {
      token = newTokens.accessToken;
      options.headers['Authorization'] = `Bearer ${token}`;
      response = await fetch(url, options);
    } else {
      throw new Error('Unable to refresh token');
    }
  }

  return response;
};

export const refreshAccessToken = async () => {
  const refreshToken = getRefreshToken();
  if (!refreshToken) {
    clearTokens();
    window.location.href = '/';
    return null;
  }

  try {
    console.log('Refreshing token');
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.REFRESH_TOKEN}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token: refreshToken }),
    });

    if (!response.ok) {
      clearTokens();
      window.location.href = '/';
      return null;
    }

    const data = await response.json();
    setAccessToken(data.accessToken);
    console.log('New access token:', data.accessToken);
    return data;
  } catch (error) {
    console.error('Error refreshing token:', error);
    clearTokens();
    window.location.href = '/';
    return null;
  }
};

export const getProfile = async () => {
  const response = await fetchWithToken(`${API_BASE_URL}${API_ENDPOINTS.PROFILE}`);
  if (!response.ok) {
    throw new Error('Failed to fetch profile');
  }
  return response.json();
};

export const fetchRecipes = async () => {
  const url = `${BASE_URL}${ENDPOINTS.CATEGORIES}`;
  try {
    const response = await fetch(url, {
      method: 'GET',
    });
    const data = await response.json();
    return data.categories;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const fetchMealsByCategory = async (category) => {
  const url = `${BASE_URL}${ENDPOINTS.MEALS_BY_CATEGORY}${category}`;
  try {
    const response = await fetch(url, {
      method: 'GET',
    });
    const data = await response.json();
    return data.meals;
  } catch (error) {
    console.error(error);
    return [];
  }
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
    return null; 
  }
};

export const updateProfileImage = async (formData) => {
  const response = await fetchWithToken(`${API_BASE_URL}${API_ENDPOINTS.UPDATE_PROFILE_IMAGE}`, {
    method: 'PUT',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Failed to update profile image');
  }

  return response.json();
};

export const updateCommentsProfileImage = async (newProfileImage) => {
  const response = await fetchWithToken(`${API_BASE_URL}${API_ENDPOINTS.UPDATE_COMMENTS_PROFILE_IMAGE}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ newProfileImage }),
  });

  if (!response.ok) {
    throw new Error('Failed to update comments profile image');
  }

  return response.json();
};

// Toggle favorite functionality
export const toggleFavorite = async (mealId, isFavorited) => {
  const token = getAccessToken();

  if (!token) {
    throw new Error('No token found. Please login.');
  }

  const method = isFavorited ? 'DELETE' : 'POST';
  const response = await fetchWithToken(`${API_BASE_URL}${API_ENDPOINTS.FAVORITES}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ mealId }),
  });

  if (!response.ok) {
    throw new Error('Failed to update favorite on server');
  }

  return response.json();
};

// Comments
export const fetchComments = async (mealId) => {
  const response = await fetchWithToken(`${API_BASE_URL}/users/comments/${mealId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch comments');
  }
  return response.json();
};

export const postComment = async (mealId, text, name, profileImage) => {
  const response = await fetchWithToken(`${API_BASE_URL}/users/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ mealId, text, name, profileImage }),
  });

  if (!response.ok) {
    throw new Error('Failed to post comment');
  }
  
  return response.json();
};

export const deleteComment = async (commentId) => {
  const response = await fetchWithToken(`${API_BASE_URL}/users/comments/${commentId}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete comment');
  }
  
  return response.json();
};
