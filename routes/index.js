
var express = require('express');
// var app = express();
var router = express.Router();
//var database;
// router.get('/', function(req, res) {
//     datareq.app.locals.port)
//     res.send('Hello from index.js!')
// })
/* GET home page. */
// app.get('/events/:data', function(req, res) {
//   res.send(req.params);
// });

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// router.get('/profile', function(req, res) {
//   res.render('profile.jade', { title: 'Profile' });
// });


// router.get('/messages', function(req, res, next) {
//   res.render('chat.jade', { title: 'Chat' });
// });

// router.get('/events'), function(req, res, next){
//   var dat = req.params.data;
//   var uhg = "";
//   if(dat == undefined){
//     uhg = "undefined";
//   } else {
//     uhg = "not undefined";
//   }
//   res.render('events.jade', {title: 'Events', uhg: uhg})
// }

module.exports = router;
