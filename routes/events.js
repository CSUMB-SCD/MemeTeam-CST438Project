var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/:title/:picture/:overview/:posterpath', function(req, res, next) {
  var title = req.params.title;
  var picture = req.params.picture;
  var overview = req.params.overview;
  var posterpath = req.params.posterpath;
  console.log(req.params)
  console.log("ON THE EVENTS PAGE")
  res.render('events.jade', { title: 'Events', title: title, picture: picture, overview: overview, posterpath: posterpath });
});

// router.get('/', function(req, res, next) {
//   console.log(req.params.name)
//   console.log("ON THE EVENTS variable PAGE")
//   res.render('events.jade', { title: 'Events' });
// });


// router.get('/home', function(req, res, next) {
//   res.render('index.jade', { title: 'Home' });
// });
// router.get('/profile', function(req, res, next) {
//   res.render('profile.jade', { title: 'Profile' });
// });

module.exports = router;
