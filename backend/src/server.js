require("dotenv").config();
const Hapi = require("@hapi/hapi");
const authRoutes = require("./routes/auth");
const setupAuthListener = require("./utils/authListener");
const Cookie = require("@hapi/cookie");

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: "localhost",
    routes: {
      cors: {
        origin: ["*"],
      },
    },
  });

  await server.register(Cookie);

  server.auth.strategy("session", "cookie", {
    cookie: {
      name: "session",
      password: process.env.COOKIE_PASSWORD,
      isSecure: false,
      path: "/",
      ttl: 24 * 60 * 60 * 1000,
    },
  });

  server.route(authRoutes);

  setupAuthListener(server);

  await server.start();
  console.log("Server running on %s", server.info.uri);
};

init();
