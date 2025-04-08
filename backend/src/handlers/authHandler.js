const supabase = require("../utils/supabase");

const loginHandler = async (request, h) => {
  const { email, password } = request.payload;

  if (!email || !password) {
    return h
      .response({
        message: "Please fill in all fields",
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
      path: "/",
      ttl: 24 * 60 * 60 * 1000,
    });
    h.header("Authorization", `Bearer ${token}`);

    h.state("user_data", userData, {
      isHttpOnly: false,
      isSecure: false,
      path: "/",
      ttl: 24 * 60 * 60 * 1000,
    });
  }

  return h
    .response({
      status: "success",
      message: "User logged in successfully",
      data: {
        user: {
          id: data.user.id,
          username: data.user.user_metadata.username,
          email: data.user.email,
        },
      },
    })
    .header("User-Data", JSON.stringify(userData))
    .code(200);
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
      data: {
        user: {
          id: data.user.id,
          username: data.user.user_metadata.username,
          email: data.user.email,
        },
      },
    })
    .code(201);
};

const signoutHandler = async (request, h) => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error(error);
    return h
      .response({
        status: "fail",
        message: error.message,
      })
      .code(error.status === 400 ? 400 : 500);
  }

  h.unstate("session");
  return h
    .response({
      status: "success",
      message: "User signed out successfully",
    })
    .code(200);
};

const authStatusHandler = async (request, h) => {
  const token = request.headers.authorization?.replace("Bearer ", "");

  if (!token) {
    return h
      .response({
        status: "fail",
        message: "Token is missing or invalid",
      })
      .code(401);
  }

  const { data, error } = await supabase.auth.getUser(token);
  if (error) {
    console.error(error);
    return h
      .response({
        status: "fail",
        message: error.message,
      })
      .code(error.status === 400 ? 400 : 500);
  }

  let event = null;
  supabase.auth.onAuthStateChange((authEvent, session) => {
    if (authEvent === "SIGNED_IN") {
      console.log("User signed in");
      event = "SIGNED_IN";
    } else if (authEvent === "SIGNED_OUT") {
      console.log("User signed out");
      event = "SIGNED_OUT";
    }
  });

  const session = { access_token: token, user };

  const userData = {
    id: data.user.id,
    email: data.user.email,
    username: data.user.user_metadata.username,
  };

  return h
    .response({
      event: event,
      session: {
        user: userData,
      },
    })
    .header("Authorization", `Bearer ${session.access_token}`)
    .header("User-Data", JSON.stringify(userData))
    .state("session", token)
    .code(200);
};

module.exports = {
  loginHandler,
  registerHandler,
  signoutHandler,
  authStatusHandler,
};
