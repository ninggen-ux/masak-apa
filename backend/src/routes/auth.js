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
  },
  {
    method: "POST",
    path: "/signup",
    handler: registerHandler,
  },
  {
    method: "POST",
    path: "/signout",
    handler: signoutHandler,
  },
];

module.exports = routes;