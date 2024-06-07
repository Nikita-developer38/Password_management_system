var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Password Management System' });
});

router.get('/signup', function (req, res, next) {
  res.render('signup', { title: 'Password Management System' });
});

router.get('/password_category', function (req, res, next) {
  res.render('password_category', { title: 'Password Management System' });
});

module.exports = router;
