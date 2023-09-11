const router = require("express").Router();
const google = require("./google/router.js");
const facebook = require("./facebook/route.js");
const passport = require("passport");

router.use('/google',
  passport.authenticate('google', { scope:
      [ 'email', 'profile' ] }
), google);

router.get( '/auth/google/callback',
    passport.authenticate( 'google', {
        successRedirect: '/auth/google/success',
        failureRedirect: '/auth/google/failure'
}));

router.use('/facebook',
  passport.authenticate('facebook', { scope:
      [ 'gaming_profile'] }
), facebook);

router.get( '/auth/facebook/callback',
    passport.authenticate( 'facebook', {
        successRedirect: '/auth/facebook/success',
        failureRedirect: '/auth/facebook/failure'
}));

module.exports = router;