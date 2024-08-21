// config.js

const isProduction = process.env.NODE_ENV === 'production';

const config = {
  apiUrl: isProduction 
    ? 'https://recipie-webapp.onrender.com'
    : 'http://localhost:5000', 
};

export default config;
