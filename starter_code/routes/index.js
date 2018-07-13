const express = require("express");
const router = express.Router();
const ensureLogin = require("connect-ensure-login");
const User = require("../models/User");

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});
router.get("/dashboard",ensureLogin.ensureLoggedIn(), (req, res, next) => {
  res.render("laundry/dashboard");
});
router.post("/launderers",ensureLogin.ensureLoggedIn(), (req, res, next) => {
  const { fee } = req.body;
  User.findByIdAndUpdate(req.user._id, { isLaunderer: true, fee }).then(
    user => {
      res.redirect("/dashboard");
    }
  );
});
router.get("/stopBeingLaunderer",ensureLogin.ensureLoggedIn(), (req, res, next) => {
  
  User.findByIdAndUpdate(req.user._id, { isLaunderer: false }).then(
    user => {
      res.redirect("/dashboard");
    }
  );
});

router.get("/launderers", ensureLogin.ensureLoggedIn(), (req, res, next) => {
  User.find({isLaunderer: true})
    .then(launderers => {
      res.render("laundry/launderers", {launderers})
    })
    .catch(() => {
      console.log("Error getting launderers");
    })
})


module.exports = router;
