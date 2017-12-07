var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/profile', function(req, res) {
  res.render('profile.jade', { title: 'Profile' });
});

router.get('/events', function(req, res, next) {
  res.render('events.jade', { title: 'Events' });
});

router.get('/messages', function(req, res, next) {
  res.render('chat.jade', { title: 'Chat' });
});

module.exports = router;
