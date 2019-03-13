
const passport = require('passport');
const bcrypt = require("bcrypt");
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/users');

passport.use(new LocalStrategy(
	{usernameField:"email", passwordField:"password"},
	function(email,password,done){
		    //Query user and hash password
		}
));

passport.serializeUser(function(user,done){
    done(null,user.id)
})

passport.deserializeUser(function(id,done){
    //Query user and call done()
})

module.exports = passport;
