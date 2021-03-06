const User = require("../models/User");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

passport.use("local",new LocalStrategy((username, password, next) => {
console.log('entra')
   User.findOne({email:username})
   .then( user =>{
       if (!user) throw new Error('Incorrect email');
       
       if (!bcrypt.compareSync(password, user.password)) throw new Error('Incorrect Password');
       
       return next(null, user);
   })
   .catch(e => {
      console.log(e);
       next(null, false, {
           message: e.message
       })
   })
}));

