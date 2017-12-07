var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  console.log("ON THE EVENT DASHBOARD PAGE")
  res.render('eventdashboard', { title: 'Express', className: 'CST438' });
});

module.exports = router;
