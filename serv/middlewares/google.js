const passport = require("passport");
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
const {config} = require("dotenv");
config();

passport.use("google" , new GoogleStrategy({
    clientID:     process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback",
    passReqToCallback   : true
  },
  function(request, accessToken, refreshToken, profile, done) {
    /*User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return done(err, user);
    });*/
    console.log(accessToken , profile.id);
    done(null , profile);
  }
));