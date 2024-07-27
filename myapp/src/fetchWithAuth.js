// src/utils/fetchWithAuth.js

import { getAccessToken, getRefreshToken, setAccessToken, refreshToken as refreshAuthToken } from './auth';

const fetchWithAuth = async (url, options = {}) => {
  let accessToken = getAccessToken();
  let refreshTokenAvailable = getRefreshToken();

  const fetchData = async (url, options) => {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    if (response.status === 401 && refreshTokenAvailable) {
      // Token expired, try refreshing
      const newAccessToken = await refreshAuthToken();
      if (newAccessToken) {
        setAccessToken(newAccessToken);
        // Retry the request with the new token
        return fetch(url, {
          ...options,
          headers: {
            ...options.headers,
            'Authorization': `Bearer ${newAccessToken}`,
          },
        });
      }
    }

    return response;
  };

  try {
    const response = await fetchData(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error('API request error:', error);
    throw error;
  }
};

export default fetchWithAuth;
