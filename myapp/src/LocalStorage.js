
export const getLocalStorageItem = (key) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error('Error fetching from local storage:', error);
      return null;
    }
  };
  
  export const setLocalStorageItem = (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error setting item in local storage:', error);
    }
  };
  
export const getAccessToken = () => localStorage.getItem('accessToken');
export const getRefreshToken = () => localStorage.getItem('refreshToken');
export const setAccessToken = (token) => localStorage.setItem('accessToken', token);
export const setRefreshToken = (token) => localStorage.setItem('refreshToken', token);
export const clearTokens = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('favorites');
};
