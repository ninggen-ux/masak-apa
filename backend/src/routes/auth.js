const {
  loginHandler,
  registerHandler,
  signoutHandler,
  authStatusHandler,
} = require("../handlers/authHandler");

const routes = [
  {
    method: "POST",
    path: "/login",
    handler: loginHandler,
    options: {
      auth: false,
    },
  },
  {
    method: "POST",
    path: "/signup",
    handler: registerHandler,
    options: {
      auth: false,
    },
  },
  {
    method: "DELETE",
    path: "/signout",
    handler: signoutHandler,
    options: {
      auth: false,
    },
  },
  {
    method: "GET",
    path: "/auth/status",
    handler: authStatusHandler,
    options: {
      auth: false,
    },
  },
];

module.exports = routes;
