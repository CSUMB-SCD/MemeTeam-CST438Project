var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('events.jade', { title: 'Events' });
});
router.get('/home', function(req, res, next) {
  res.render('index.jade', { title: 'Home' });
});
router.get('/profile', function(req, res, next) {
  res.render('profile.jade', { title: 'Profile' });
});

module.exports = router;
