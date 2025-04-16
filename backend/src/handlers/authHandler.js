const supabase = require("../utils/supabase");

const loginHandler = async (request, h) => {
  const { email, password } = request.payload;

  if (!email || !password) {
    return h
      .response({
        message: "Tolong isi semua field",
      })
      .code(400);
  }

  const { data: user, error: userError } = await supabase.auth.signInWithPassword({
    email: email.toLowerCase(),
    password,
  });

  if (userError) {
    console.error(userError);
    return h
      .response({
        status: "fail",
        message: userError.message,
      })
      .code(userError.status === 400 ? 400 : 500);
  }

  if (user.user) {
    const token = user.session.access_token;
    const userData = {
      id: user.user.id,
      email: user.user.email,
      username: user.user.user_metadata.username,
    };

    h.state("session", token, {
      isHttpOnly: true,
      isSecure: false,
      isSameSite: "Lax", // Production Ganti ke None, Development Ganti ke Lax
      path: "/",
      ttl: 24 * 60 * 60 * 1000,
    });

    return h
      .response({
        status: "success",
        message: "User berhasil login",
        data: {
          user: {
            username: user.user.user_metadata.username,
          },
        },
      })
      .header("Authorization", `Bearer ${token}`)
      .header("User-Data", JSON.stringify(userData))
      .code(200);
  }

  return h
    .response({
      status: "fail",
      message: "User tidak ditemukan",
    })
    .code(404);
};

const registerHandler = async (request, h) => {
  const { email, username, password } = request.payload;

  if (!email || !username || !password) {
    return h
      .response({
        message: "Please fill in all fields",
      })
      .code(400);
  }

  const { data: user, error: userError } = await supabase.auth.signUp({
    email: email.toLowerCase(),
    password,
    options: {
      data: {
        username,
      },
    },
  });

  if (userError) {
    if (userError.message.includes("User already registered")) {
      return h
        .response({
          status: "fail",
          message: "Email is already registered",
        })
        .code(400);
    }

    return h
      .response({
        status: "fail",
        message: userError.message,
      })
      .code(500);
  }

  return h
    .response({
      status: "success",
      message: "User registered successfully",
    })
    .code(201);
};

const signoutHandler = async (request, h) => {
  try {
    h.unstate("session");

    return h
      .response({
        status: "success",
        message: "User berhasil logout",
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
};

const authStatusHandler = async (request, h) => {
  try {
    const token = request.state.session;

    if (!token) {
      console.error("Token is missing or invalid");
      return h
        .response({
          status: "fail",
          message: "Token tidak ditemukan",
        })
        .code(401);
    }

    const { data: user, error: userError } = await supabase.auth.getUser(token);

    if (userError) {
      // console.error("authStatusHandler - Error from Supabase:", userError);
      return h
        .response({
          status: "fail",
          message: userError.message,
        })
        .code(userError.status === 400 ? 400 : 500);
    }

    return h
      .response({
        status: "success",
        message: "User terdaftar",
        data: user.user,
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
};

const getUserIdByToken = async (request) => {
  const token = request.state.session;

  if (!token) {
    console.error("Token is missing or invalid");
    return null;
  }

  const { data: user, error: userError } = await supabase.auth.getUser(token);

  if (userError) {
    console.error("getUserIdByToken - Error from Supabase:", userError);
    return null;
  }

  return user.user.id;
}


module.exports = {
  loginHandler,
  registerHandler,
  signoutHandler,
  authStatusHandler,
  getUserIdByToken,
};
