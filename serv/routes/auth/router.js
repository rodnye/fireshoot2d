const router = require("express").Router();
const google = require("./google/router.js");
const facebook = require("./facebook/route.js");
const passport = require("passport");
const config = require("../../../config.js");
const jwt = require(config.HELPERS + "/jwt.js");

router.get('/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/auth/failure',
        failureFlash: true
    }), (req, res) => {
        return res.json({
            status: true,
            data: jwt.generate(req.user.user_id)
        });
    });

router.use('/google',
    passport.authenticate('google', {
        scope:
            ['profile']
    }
    ), google);



router.get('/facebook/callback',
    passport.authenticate('facebook', {
        failureRedirect: "/auth/facebook",
        failureFlash: true
    }), (req, res) => {
        return res.json({
            status: true,
            data: jwt.generate(req.user.user_id)
        });
    });

router.use('/facebook',
    passport.authenticate('facebook', {
        scope:
            ['gaming_profile']
    }
    ), facebook);



module.exports = router;