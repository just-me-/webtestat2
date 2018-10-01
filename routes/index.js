var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Overview' });
});

router.get('/task/', function(req, res, next) {
    res.render('add_task', { title: 'NEw Task Add View' });
});

router.get('/task/:id/', function(req, res, next) {
    res.render('task', { title: 'Detail View' });
});

module.exports = router;
