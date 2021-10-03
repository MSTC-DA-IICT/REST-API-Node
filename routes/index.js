var express = require("express");
var router = express.Router();

/* GET home page. */

router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get('/order', function(req, res, next) {
  res.render('order', { title: 'Express' });

});

router.get('/updateOrder', function(req, res, next) {
  res.render('updateOrder', { title: 'Express' });

});

module.exports = router;
