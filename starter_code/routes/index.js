const express = require("express");
const router = express.Router();
const ensureLogin = require("connect-ensure-login");
const User = require("../models/User");
const LaundryPickup = require("../models/Laundry-pickup");

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
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

router.get("/launderers/:id", (req, res, next) => {
  User.findById(req.params.id)
    .then(theLaunderer => {
      res.render("laundry/launderer-profile", {theLaunderer})
    })
    .catch(() => {
      console.log("Error showing launderer");
    })
});

router.post('/laundry-pickups', (req, res, next) => {
  console.log(req.user)
  const pickupInfo = {
    pickupDate: req.body.pickupDate,
    launderer: req.body.laundererId,
    user: req.user._id
  };
  const thePickup = new LaundryPickup(pickupInfo);
  thePickup.save((err) => {
    if (err) {
      next(err);
      return;
    }
    res.redirect('/dashboard');
  });
});

router.get('/dashboard', (req, res, next) => {
  let query;

  if (req.user.isLaunderer) {
    query = { launderer: req.user._id };
  } else {
    query = { user: req.user._id };
  }

  LaundryPickup
    .find(query)
    .populate('user', 'name')
    .populate('launderer', 'name')
    .sort('pickupDate')
    .exec((err, pickupDocs) => {
      if (err) {
        next(err);
        return;
      }

      res.render('laundry/dashboard', {
        pickups: pickupDocs
      });
    });
});





module.exports = router;
