const {
  loginHandler,
  registerHandler,
  signoutHandler,
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
    method: "POST",
    path: "/signout",
    handler: signoutHandler,
    options: {
      auth: false,
    },
  },
];

module.exports = routes;
