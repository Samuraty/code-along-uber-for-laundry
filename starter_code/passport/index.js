const passport = require("passport");
require("./localStrategy");
require("./serializer");

module.exports = (app) => {
  app.use(passport.initialize())
  app.use(passport.session())
}