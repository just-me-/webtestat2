var express = require('express');
var router = express.Router();
const tasks = require('../controller/controller.js');

/*
//////////////////////////////*

aus der Vorlage:

/////////////////////////////
const express = require('express');
const router = express.Router();
const orders = require('../controller/ordersController.js');

router.get("/", orders.showIndex);
router.get("/orders", orders.createOrder);
router.post("/orders", orders.createPizza);
router.get("/orders/:id/", orders.showOrder);
router.delete("/orders/:id/", orders.deleteOrder);

module.exports = router;


*/////////////////////////////////////




/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Overview' });
});

router.get('/task/', function(req, res, next) {
    res.render('add_task', { title: 'NEw Task Add View' });
});

router.get('/task/:id/', function(req, res, next) {
    res.render('task', { action: 'View',
        title:req.title,
        desc:req.desc,
        priority:req.priority,
        due:req.due });
});

router.post("/task", tasks.createTask);

module.exports = router;
