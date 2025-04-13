const supabase = require("../utils/supabase");
const {
  getUserIdByToken,
} = require("./authHandler");

const addIngredientHistory = async (userId, ingredients) => {
  const normalizedIngredients = ingredients.map((ingredient) =>
    ingredient.trim().toLowerCase()
  );

  for (const ingredient of normalizedIngredients) {
    const { error: rpcError } = await supabase.rpc(
      "increment_ingredient_count",
      {
        p_user_id: userId,
        p_ingredient: ingredient,
      }
    );

    if (rpcError) {
      console.error(
        `Gagal tambah histori untuk '${ingredient}':`,
        rpcError.message
      );
    }
  }
};

const fetchFoodsByIngredients = async (ingredients) => {
  const normalizedIngredients = ingredients.map((ingredient) =>
    ingredient.trim().toLowerCase()
  );

  const { data: foodsData, error: foodError } = await supabase
    .from("foods")
    .select("id, name, ingredients, url")
    .contains("ingredients", normalizedIngredients);

  if (foodError) {
    console.error(foodError);
    throw new Error(foodError.message);
  }

  return foodsData;
};

const getFoodByIngredients = async (request, h) => {
  try {
    const ingredients = request.payload;
    const userId = await getUserIdByToken(request);

    if (!Array.isArray(ingredients) || ingredients.length === 0) {
      return h
        .response({
          status: "fail",
          message: "Ingredient tidak boleh kosong",
        })
        .code(400);
    }

    await addIngredientHistory(userId, ingredients);

    const foodsData = await fetchFoodsByIngredients(ingredients);

    if (foodsData.length === 0) {
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
        foodsData,
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

const getFoodRecomendations = async (request, h) => {
  try {
    const userId = await getUserIdByToken(request);

    const { data: ingredientsData, error: ingredientsError } = await supabase
      .from("ingredient_history")
      .select("ingredient")
      .eq("user_id", userId)
      .order("count", { ascending: false })
      .limit(1);

    if (ingredientsError) {
      console.error(ingredientsError);
      return h
        .response({
          status: "fail",
          message: ingredientsError.message,
        })
        .code(500);
    }

    if (ingredientsData.length === 0) {
      return h
        .response({
          status: "fail",
          message: "Tidak ada riwayat bahan makanan",
        })
        .code(404);
    }

    const ingredients = ingredientsData.map((item) => item.ingredient);

    const foodsData = await fetchFoodsByIngredients(ingredients);

    if (foodsData.length === 0) {
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
        foodsData,
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

module.exports = {
  getFoodByIngredients,
  getFoodRecomendations,
};
