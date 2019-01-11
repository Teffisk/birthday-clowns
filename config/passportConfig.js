var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var db = require('../models');

//Provide serialize/deserialize function so we can store user in session

passport.serializeUser(function(user, done){
	//(errorData, userData)
  done(null, user.id);
});

//Option 1
passport.deserializeUser(function(id, done){
  db.user.findByPk(id)
  .then(function(user){
    done(null, user)
  })
  .catch(function(err){
    done(err, null)
  })
})

// Do the actual logging in (authentication)
passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, function(email, password, callback){
  db.user.findOne({
    where: { email: email }
  })
  .then(function(foundUser){
    // if I didn't find a valid user or that user's password, once hashed, doesn't match the hash in the db
    if(!foundUser || !foundUser.validPassword(password)){
      // bad
      callback(null, null);
    }
    else {
      console.log("Success!!!!!")
      callback(null, foundUser);
    }
  })
  .catch(function(err){
    callback(err, null);
  });
}));

//Make sure I can include this module in pther pages in my app
module.exports = passport














