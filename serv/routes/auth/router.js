const router = require("express").Router();
const google = require("./google/router.js");
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


module.exports = router;