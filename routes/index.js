const Router = require("express").Router();

//MODELS
const Asset = require("../models/assets");
const User = require("../models/users");
const Role = require("../models/roles");
const Type = require("../models/type");
const Tps = require("../models/tps");
const Insurance = require("../models/insurance");
const Disposal = require("../models/disposal");
const AssetValuation = require("../models/assetValuation");

//CONFIGS
const saltRounds = 10;

Router.get('/',(req,res)=>{
    res.render('site/index')
});

Router.get('/initialize',(req,res)=>{
  User.create({
    id: 1,
    email: "admin@admin.com",
    password: "1234",
  }).then(data => {
    res.json(data)
  })
});

module.exports = Router;
