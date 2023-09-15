const router = require("express").Router();
const google = require("./google/router.js");
const facebook = require("./facebook/route.js");
const passport = require("passport");

router.get( '/google/callback',
    passport.authenticate( 'google' , {
        successRedirect: '/auth/success',
        failureRedirect: '/auth/failure'    
}));

router.use('/google',
  passport.authenticate('google', { scope:
      [ 'email', 'profile' ] }
), google);



router.get( '/facebook/callback',
    passport.authenticate( 'facebook', {
        failureRedirect: "/auth/facebook",
        failureFlash: true
}), (req , res) => console.log(req.user));

router.use('/facebook',
  passport.authenticate('facebook', { scope:
      [ 'gaming_profile'] }
), facebook);



module.exports = router;