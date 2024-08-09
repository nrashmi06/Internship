
module.exports = {
    devServer: {
      proxy: {
        '/api': {
          target: 'https://recipie-webapp.onrender.com', // Replace with your backend URL
          changeOrigin: true,
          secure: false,
        },
      },
    },
  };
  