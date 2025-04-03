const Hapi = require("@hapi/hapi");
const authRoutes = require("./routes/auth");


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

  server.route(authRoutes);

  await server.start();
  console.log("Server running on %s", server.info.uri);
};

init();
