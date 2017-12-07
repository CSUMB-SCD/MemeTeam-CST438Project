var express = require('express');
var router = express.Router();
var app = express();
/* GET home page. */
app.get('/events/:data', function(req, res) {
  // res.send(req.params);
  console.log(req.params);
});

// router.get('/', function(req, res, next) {
//   res.render('eventdashboard.jade', { title: 'Events' });
// });
router.get('/home', function(req, res, next) {
  res.render('index.jade', { title: 'Home' });
});
router.get('/profile', function(req, res, next) {
  res.render('profile.jade', { title: 'Profile' });
});

// router.get('/events'), function(req, res, next){
  
  // var dat = req.params.data;
  // var uhg = "";
  // if(dat == undefined){
  //   uhg = "undefined";
  // } else {
  //   uhg = "not undefined";
  // }
//   res.render('events.jade', {title: 'Events', uhg: uhg})
// }
router.get('/eventdashboard', function(req, res, next) {
  res.render('eventdashboard.jade', { title: 'Event Dashboard', database: req.app.locals.database});
});



module.exports = router;
