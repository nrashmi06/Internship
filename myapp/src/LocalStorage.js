import CryptoJS from 'crypto-js';

// Retrieve SECRET_KEY from environment variables
const SECRET_KEY = process.env.REACT_APP_HASH_SECRET;

if (!SECRET_KEY) {
  throw new Error('SECRET_KEY is not defined');
}

// Encrypt a value with a secret key
const encryptValue = (value) => {
  try {
    const stringValue = JSON.stringify(value);
    return CryptoJS.AES.encrypt(stringValue, SECRET_KEY).toString();
  } catch (error) {
    console.error('Error encrypting value:', error);
    throw new Error('Encryption failed');
  }
};

// Decrypt a value with a secret key
const decryptValue = (encryptedValue) => {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedValue, SECRET_KEY);
    const decryptedString = bytes.toString(CryptoJS.enc.Utf8);
    return JSON.parse(decryptedString);
  } catch (error) {
    console.error('Error decrypting value:', error);
    return null;
  }
};

// Set an item in local storage with encryption
export const setLocalStorageItem = (key, value) => {
  try {
    const encryptedValue = encryptValue(value);
    localStorage.setItem(key, encryptedValue);
  } catch (error) {
    console.error('Error setting item in local storage:', error);
  }
};

// Get an item from local storage and decrypt it
export const getLocalStorageItem = (key) => {
  try {
    const encryptedItem = localStorage.getItem(key);
    if (encryptedItem) {
      return decryptValue(encryptedItem);
    }
    return null;
  } catch (error) {
    console.error('Error fetching from local storage:', error);
    return null;
  }
};

export const getAccessToken = () => getLocalStorageItem('accessToken');
export const getRefreshToken = () => getLocalStorageItem('refreshToken');
export const setAccessToken = (token) => setLocalStorageItem('accessToken', token);
export const setRefreshToken = (token) => setLocalStorageItem('refreshToken', token);
export const clearTokens = () => {
  try {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('favorites');
  } catch (error) {
    console.error('Error clearing tokens:', error);
  }
};
