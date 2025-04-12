const supabase = require("../utils/supabase");

const getAllFood = async (request, h) => {
  try {
    const { ingredients } = request.payload;

    if (!Array.isArray(ingredients) || ingredients.length === 0) {
      return h
        .response({
          status: "fail",
          message: "Ingredient tidak boleh kosong",
        })
        .code(400);
    }

    const normalizedIngredients = ingredients.map((ingredient) =>
      ingredient.trim().toLowerCase()
    );

    const { data, error } = await supabase
      .from("foods")
      .select("id, name, ingredients, url")
      .contains("ingredients", normalizedIngredients);

    if (error) {
      console.error(error);
      return h
        .response({
          status: "fail",
          message: error.message,
        })
        .code(500);
    }
    if (data.length === 0) {
      return h
        .response({
          status: "fail",
          message: "Tidak ada makanan yang ditemukan",
        })
        .code(404);
    }
    
    return h
      .response({
        status: "success",
        foods: {
          data,
        },
      })
      .code(200);
  } catch (err) {
    console.error(err);
    return h
      .response({
        status: "fail",
        message: "Terjadi kesalahan pada server",
      })
      .code(500);
  }
};

// const getFoodRecomendations = async (request, h) => {
//   try {

//   } catch (err) {
//     console.error(err);
//     return h
//       .response({
//         status: "fail",
//         message: "Terjadi kesalahan pada server",
//       })
//       .code(500);
//   }
// }

module.exports = {
  getAllFood,
  // getFoodRecomendations,
};
