const {
  getFoodByIngredients,
  getFoodRecomendations,
} = require("../handlers/foodHandler");

const routes = [
  {
    method: "POST",
    path: "/search",
    handler: getFoodByIngredients,
  },
  {
    method: "GET",
    path: "/search/recomendations",
    handler: getFoodRecomendations,
  },
];

module.exports = routes;