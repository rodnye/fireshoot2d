const passport = require("passport");
const FacebookStrategy = require( 'passport-facebook' ).Strategy;
const {config} = require("dotenv");
config();

passport.use("facebook" , new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:3000/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    /*User.findOrCreate({ facebookId: profile.id }, function (err, user) {
      return cb(err, user);
    });*/
    console.log(accessToken , profile);

    cb(null , profile);
  }
));