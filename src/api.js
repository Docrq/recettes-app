// src/services/api.js
const recettes = [
    { id: 1, nom: 'Sushi', categorie: 'Seafood', image: 'url_de_l_image_sushi.jpg' },
    { id: 2, nom: 'Burek', categorie: 'Side', image: 'url_de_l_image_burek.jpg' },
    // Ajoutez les autres recettes ici
  ];
  
  export const getRecettes = () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(recettes), 500);
    });
  };