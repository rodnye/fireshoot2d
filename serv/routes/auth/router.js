const router = require("express").Router();
const passport = require("passport");
const config = require("../../../config.js");
const jwt = require(config.HELPERS + "/jwt.js");

router.get('/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/auth',
        failureFlash: true
    }), (req, res) => {
        /*return res.json({
            status: true,
            data: jwt.generate(req.user.user_id)
        });*/
        return res.redirect('/game');
    });

router.use('/google',
    passport.authenticate('google', {
        scope:
            ['profile']
    }
    ));



router.get('/facebook/callback',
    passport.authenticate('facebook', {
        failureRedirect: "/auth",
        failureFlash: true
    }), (req, res) => {
        /*return res.json({
            status: true,
            data: jwt.generate(req.user.user_id)
        });*/
        return res.redirect('/game');
    });

router.use('/facebook',
    passport.authenticate('facebook', {
        scope:
            ['gaming_profile']
    }
    ));


module.exports = router;