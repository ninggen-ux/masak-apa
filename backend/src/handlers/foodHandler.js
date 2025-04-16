const supabase = require("../utils/supabase");
const { getUserIdByToken } = require("./authHandler");

const addIngredientHistory = async (userId, ingredients) => {
  for (const ingredient of ingredients) {
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

const getAllFood = async (request, h) => {
  try{
    const { data: foodsData, error: foodError } = await supabase
      .from("foods")
      .select("id, name, ingredients, url");

    if (foodError) {
      return h
        .response({
          status: "fail",
          message: foodError.message,
        })
        .code(500);
    }

    return h
      .response({
        status: "success",
        data: foodsData,
      })
      .code(200);
  } catch (err) {
    console.error("Unexpected error:", err);
    return h
      .response({
        status: "error",
        message: "Kesalahan pada server",
      })
      .code(500);
  }
}

const getFoodByIngredients = async (request, h) => {
  try {
    const ingredients = request.payload;
    const userId = await getUserIdByToken(request);

    if (!userId) {
      return h
        .response({
          status: "fail",
          message: "User tidak terdaftar",
        })
        .code(401);
    }

    if (!Array.isArray(ingredients) || ingredients.length === 0) {
      return h
        .response({
          status: "fail",
          message: "Ingredient tidak boleh kosong",
        })
        .code(400);
    }

    const normalizedIngredients = ingredients.map((ingredients) =>
      ingredients.trim().toLowerCase()
    );

    await addIngredientHistory(userId, normalizedIngredients);

    const { data: foodsData, error: foodError } = await supabase
      .from("foods")
      .select("id, name, ingredients, url")
      .contains("ingredients", normalizedIngredients)

    if (foodError) {
      return h
        .response({
          status: "fail",
          message: foodError.message,
        })
        .code(500);
    }

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

    const ingredients = ingredientsData.map((item) => item.ingredients);

    const { data: foodsData, error: foodError } = await supabase
      .from("foods")
      .select("id, name, ingredients, url")
      .contains("ingredients", ingredients)
      .limit(3);

    if (foodError) {
      console.error(foodError);
      return h
        .response({
          status: "fail",
          message: foodError.message,
        })
        .code(500);
    }

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
