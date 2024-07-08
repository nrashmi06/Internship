export const fetchRecipes = () => {
    return fetch('https://www.themealdb.com/api/json/v1/1/categories.php', {
      method: 'GET',
    })
      .then(response => response.json())
      .then(data => data.categories)
      .catch(error => {
        console.error(error);
        return [];
      });
  };
//   get call