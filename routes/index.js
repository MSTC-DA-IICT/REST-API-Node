var express = require("express");
var router = express.Router();
const {isUserValid, verifyUser} = require("../middlewares/validateUser");

/* GET home page. */

router.get("/", function (req, res, next) {
  let loggedIn = false;
  if (req.cookies && req.cookies.user && req.cookies.login) {
    loggedIn = isUserValid(req.cookies.user, req.cookies.login);
  }

  res.render("index", { title: "Express" , loggedIn});
});

router.get('/signup', (req, res, next) => {
  const {
    src = '/'
  } = req.query;
  res.render('signup', { title: 'Express', src });
});

router.get('/login', (req, res, next) => {
  const {
    src = '/'
  } = req.query;
  res.render('login', { title: 'Express', src });
});

router.get('/order', verifyUser,  function(req, res, next) {
  res.render('order', { title: 'Express' });

});

router.get('/updateOrder', function(req, res, next) {
  res.render('updateOrder', { title: 'Express' });

});

module.exports = router;
