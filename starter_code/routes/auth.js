const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const bcryptSalt = 10;
const ensureLogin = require("connect-ensure-login");
const passport = require("passport");
const salt = bcrypt.genSaltSync(bcryptSalt);
require("../passport");

router.get("/profile", ensureLogin.ensureLoggedIn(), (req, res) => {
  res.render("passport/profile");
});


router.get("/signup", (req, res) => {
  res.render("passport/signup");
});

router.post("/signup", (req, res) => {
  const { name, password, email } = req.body;
  const hashPass = bcrypt.hashSync(password, salt);
  User.create([{ name, password: hashPass, email }])
    .then(user => {
      console.log("sign up succes");
      res.redirect("/");
    })
    .catch(err => {
      console.log(err.message);
    });
});


router.get("/login", (req, res) => {
  res.render("passport/login");
});

router.post("/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
    passReqToCallback: true
  })
);
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});
router.get("/edit",ensureLogin.ensureLoggedIn(), (req, res) => {
  res.render("passport/editProfile");
});

router.post("/edit/:id",ensureLogin.ensureLoggedIn(),(req, res) =>{
  const {name,password,email} = req.body
  let fee=0
  if(req.body.fee) fee =req.body.fee
  const hashPass = bcrypt.hashSync(password, salt);
 
  User.findByIdAndUpdate(req.params.id,{name,password:hashPass,email,fee})
  .then(user=>{
    res.redirect("/profile")
  })
})



module.exports = router;
