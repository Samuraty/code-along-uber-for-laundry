const mongoose = require("mongoose");
const User = require("../models/User");

mongoose.connect("mongodb://localhost/uber-for-laundry");

const list = [{
  name: "paco",
  password: "paco",
  email: "aaaa@gmail.com",
  isLaunderer: true,
  fee: 10
},
{
  name: "paco1",
  password: "paco1",
  email: "aaaa1@gmail.com",
  isLaunderer: true,
  fee: 20
},
{
  name: "paco2",
  password: "paco2",
  email: "aaaa2@gmail.com",
  isLaunderer: true,
  fee: 30
}
]

User.create(list)
  .then(() => {
    console.log("Seed success!")
  })
  .catch(() =>{
    console.log("Seed fail!")
  }) 