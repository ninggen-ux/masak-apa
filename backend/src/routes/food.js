const {
  getAllFood,
  // getFoodRecomendations,
} = require("../handlers/foodHandler");

const routes = [
  {
    method: "POST",
    path: "/search",
    handler: getAllFood,
  },
  // {
  //   method: "GET",
  //   path: "/search/recomendations",
  //   handler: getFoodRecomendations,
  // }
]

module.exports = routes;