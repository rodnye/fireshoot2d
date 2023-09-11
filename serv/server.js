// Modules imports
const config = require("../config.js");
const express = require("express");
const sessions = require("express-session");
const app = express();
const passport = require("passport");
const router = require("./routes/router.js");

//Google Middleware
require("./middlewares/google.js");
//Facebook Middleware
require("./middlewares/facebook.js");

// Global middlewares
app.use(express.json());
app.use(sessions({
    secret: "supersecretkey",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, done) {
    done(null, user.googleId || user.id);
});

passport.deserializeUser(function (obj, done) {
    done(null, obj);
});

app.use(router);




// Start the server and listen on the specified port
app.listen(config.PORT, () => {
    console.log("Running in port " + config.PORT);
});


//
// Serve static pages
//
if (!config.isProduction) {
    // Development mode - Use Webpack server for serving static files
    const webpackRouter = require('./webpack-router');
    app.use("/", webpackRouter);
    console.log("Using Webpack server for development mode...");
}
else {
    // Production mode - Use static server for serving static files
    app.use("/", express.static(config.DIST));
    console.log("Using static server for production mode...");
}