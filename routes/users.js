const bcrypt = require("bcrypt");
var express = require('express');
var router = express.Router();
const passport = require('passport');
const conf = require('../config/constants');
const User = require("../models/user.model");
const { jwtSignUser } = require('../middlewares/jwt');



// Login
router.post("/login", (req, res, next) => {
    const {
        src = '/',
        username
    } = req.body;
    console.log("In login");
    passport.authenticate("local", function (err, user, info) {
        if (err) {
            console.log(1);
            return res.redirect('/');
        }
        if (!user) {
            console.log(2);
            return res.redirect('/');
        }
        let key = {
            username: username,
            id: user._id
        };

        let token = jwtSignUser(
            key,
            conf.authentication.validity,
            conf.authentication.jwtSecret
        );
        res.cookie('login', key.id, { maxAge: 24 * 60 * 60 * 1000 });
        res.cookie('user', token, { maxAge: 24 * 60 * 60 * 1000 });
        return res.redirect(`${src}`);
    })(req, res, next);

});

// Register
router.post("/register", (req, res, next) => {
    const {
        username,
        email,
        number,
        password,
        src='/'
    } = req.body;
    
    console.log("SRC is");
    console.log(src);
    try {
        const newUser = new User({
            password,
            username,
            email: email.toLowerCase(),
            number
        });
        // Hash password before saving in database
        bcrypt.genSalt(10, (err, salt) => {
            console.log(salt);
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) {
                    console.log(err);
                    return res.redirect('/');
                }
                newUser.password = hash;
                newUser
                    .save()
                    .then(user => {
                        let key = {
                            username: username,
                            id: user._id
                        };

                        let token = jwtSignUser(
                            key,
                            conf.authentication.validity,
                            conf.authentication.jwtSecret
                        );
                        res.cookie('login', key.id, { maxAge: 24 * 60 * 60 * 1000 });
                        res.cookie('user', token, { maxAge: 24 * 60 * 60 * 1000 });
                        return res.redirect(src);
                    })
                    .catch(error => {
                        console.log(error);
                        return res.redirect('/');
                    });
            });
        });

    } catch (error) {
        console.log(error);
        return res.redirect('/');
    }

});
module.exports = router;
