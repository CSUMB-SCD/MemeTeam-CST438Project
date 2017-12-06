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
  //var database = app.locals.database;
  var weee = 'i hate this';
  if(req.app.locals==undefined){
    weee="dfsdf";
  } else {
    weee='not undefined';
  }
  res.render('events.jade', { title: 'Events', corn: weee });
});

router.get('/messages', function(req, res, next) {
  res.render('chat.jade', { title: 'Chat' });
});

module.exports = router;
