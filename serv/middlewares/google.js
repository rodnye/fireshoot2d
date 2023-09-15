const passport = require("passport");
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
const dotenv = require("dotenv");
dotenv.config();
const config = require("../../config.js");
const {User} = require(config.SERV + "/helpers/db.js");
const uid = require(config.SERV + "/helpers/uid.js");

passport.use("google" , new GoogleStrategy({
    clientID:     process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: config.URL + "/auth/google/callback",
    passReqToCallback   : true
  },
  async (request, accessToken, refreshToken, profile, done) => {
    const [user, created] = await User.findOrCreate({
      where: { google_id: profile.id },
      defaults: {
        username: profile.displayName || profile.given_name,
        user_id: uid.alphanum(8)
      }
    });

    done(null , user || created);
  }
));