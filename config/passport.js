const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});

// Local Strategy
passport.use(
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
        console.log("In passprt");
        // Match User
        User.findOne({ email: email.toLowerCase() })
            .then(user => {
                // Create new User
                if (!user) {
                    console.log("User not Found");
                    return done(null, false, { message: "Invalid  User" });
                    // const newUser = new User({ username, password });
                    // Hash password before saving in database
                    
                    // Return other user
                } else {
                    // Match password
                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if (err) throw err;
                        if (isMatch) {
                            console.log("Password match");
                            return done(null, user);
                        } else {
                            console.log("Password did not match");

                            return done(null, false, { message: "Wrong password" });
                        }
                    });
                }
            })
            .catch(err => {
                return done(null, false, { message: err });
            });
    })
);

module.exports = passport;