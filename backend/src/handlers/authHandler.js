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

  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.toLowerCase(),
    password,
  });

  if (error) {
    console.error(error);
    return h
      .response({
        status: "fail",
        message: error.message,
      })
      .code(error.status === 400 ? 400 : 500);
  }

  if (data.user) {
    const token = data.session.access_token;
    const userData = {
      id: data.user.id,
      email: data.user.email,
      username: data.user.user_metadata.username,
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
            username: data.user.user_metadata.username,
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

  const { data, error } = await supabase.auth.signUp({
    email: email.toLowerCase(),
    password,
    options: {
      data: {
        username,
      },
    },
  });

  if (error) {
    if (error.message.includes("User already registered")) {
      return h
        .response({
          status: "fail",
          message: "Email is already registered",
        })
        .code(400);
    }

    console.error(error);
    return h
      .response({
        status: "fail",
        message: error.message,
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

    const { data, error } = await supabase.auth.getUser(token);

    if (error) {
      console.error("Error from Supabase:", error);
      return h
        .response({
          status: "fail",
          message: error.message,
        })
        .code(error.status === 400 ? 400 : 500);
    }

    return h
      .response({
        status: "success",
        message: "User terdaftar",
        data: data.user,
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

const otpChangePasswordHandler = async (request, h) => {
  const { email } = request.payload;

  if (!email) {
    return h
      .response({
        status: "fail",
        message: "Email dibutuhkan",
      })
      .code(400);
  }

  try {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "http://localhost:5173/otp-reset-pass", // Ganti dengan URL yang sesuai
    });

    if (error) {
      console.error("Error from Supabase:", error);
      return h
        .response({
          status: "fail",
          message: error.message,
        })
        .code(error.status === 400 ? 400 : 500);
    }

    return h
      .response({
        status: "success",
        message: "Email untuk mengganti password telah dikirim",
      })
      .code(200);
  } catch (err) {
    console.error("Unexpected error:", err);
    return h
      .response({
        status: "error",
        message: "Kesalahan server internal",
      })
      .code(500);
    };
};

const changePasswordHandler = async (request, h) => {
  const { new_password } = request.payload;

  if (!password) {
    return h
      .response({
        status: "fail",
        message: "Password dibutuhkan",
      })
      .code(400);
  }

  try {
    const { data, error } = await supabase.auth.updateUser({
      new_password,
    });

    if (error) {
      console.error("Error from Supabase:", error);
      return h
        .response({
          status: "fail",
          message: error.message,
        })
        .code(error.status === 400 ? 400 : 500);
    }

    return h
      .response({
        status: "success",
        message: "Password berhasil diubah",
      })
      .code(200);
  } catch (err) {
    console.error("Unexpected error:", err);
    return h
      .response({
        status: "error",
        message: "Kesalahan server internal",
      })
      .code(500);
  }
}

module.exports = {
  loginHandler,
  registerHandler,
  signoutHandler,
  authStatusHandler,
  otpChangePasswordHandler,
  changePasswordHandler,
};
