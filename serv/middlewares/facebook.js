const passport = require("passport");
const FacebookStrategy = require( 'passport-facebook' ).Strategy;
const dotenv = require("dotenv");
dotenv.config();
const config = require("../../config.js");
const {User} = require(config.SERV + "/helpers/db.js");
const uid = require(config.SERV + "/helpers/uid.js");

passport.use("facebook" , new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: config.URL + "/auth/facebook/callback"
  },
  async (accessToken, refreshToken, profile, cb) => {
    const [user, created] = await User.findOrCreate({
      where: { facebook_id: profile.id },
      defaults: {
        username: profile.username,
        user_id: uid.alphanum(8)
      }
    });
    cb(null , user);
  }
));