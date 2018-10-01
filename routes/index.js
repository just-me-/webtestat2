var express = require('express');
var router = express.Router();
const tasks = require('../controller/controller.js');


/* GET home page. */
router.get('/', tasks.showAllTasks);    //index zeigt alle task an, oder gibt es eine separate Indexpage? [tasks.showIndex]
router.get('/all', tasks.showAllTasks); //<--ist dann obsolete
router.get('/task/', tasks.registerTask);
router.get('/task/:id/', tasks.showTask);
router.post("/task", tasks.createTask);

module.exports = router;




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

