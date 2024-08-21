
module.exports = {
    devServer: {
      proxy: {
        '/api': {
          target: 'https://recipie-webapp.onrender.com', 
          changeOrigin: true,
          secure: false,
        },
      },
    },
  };
  