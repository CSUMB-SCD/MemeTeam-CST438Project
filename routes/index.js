var app = require('../app');
var express = require('express');

var router = express.Router();
//var database;
// router.get('/', function(req, res) {
//     datareq.app.locals.port)
//     res.send('Hello from index.js!')
// })
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/profile', function(req, res) {
  res.render('profile.jade', { title: 'Profile' });
});

router.get('/events', function(req, res, next) {
  var database = req.app.locals.database;
  
  res.render('events.jade', { title: 'Events', corn: database });
});

router.get('/messages', function(req, res, next) {
  res.render('chat.jade', { title: 'Chat' });
});

module.exports = router;
