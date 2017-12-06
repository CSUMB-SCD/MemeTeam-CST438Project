var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
  res.render('profile', { title: 'Profile' });
});

router.get('/home', function(req, res, next) {
  res.render('index.jade', { title: 'Home' });
});

router.get('/events', function(req, res, next) {
  res.render('events.jade', { title: 'Events' });
});

module.exports = router;