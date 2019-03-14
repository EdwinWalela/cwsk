const Router = require("express").Router();
const bcrypt = require('bcrypt');
const passport = require("passport");
const User = require("../models/users");
const saltRounds = 10;

Router.get('/login',(req,res)=>{
    //res.render('login-page')
})

Router.post('/login',passport.authenticate('local',
{
	failureRedirect:'',
	failureFlash:false
}),(req,res)=>{

});

Router.get('/logout',(req,res)=>{
    req.logout();
    res.redirect('/auth/login');
  })

module.exports = Router;
