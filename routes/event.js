var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('event', { title: 'FUCKING WORKS' });
});

module.exports = router;
