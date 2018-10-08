var express = require('express');
var router = express.Router();
const task_controller = require('../controller/controller.js');

/* GET home page. */
router.get('/', task_controller.showIndex);    //index zeigt alle task an, oder gibt es eine separate Indexpage? [tasks.showIndex]
router.get('/task/', task_controller.registerTask);
router.post('/task', task_controller.createTask);
router.delete("/task/:id/", task_controller.deleteTask);
router.get('/task/:id/', task_controller.showTask);
router.post('/task/:id/', task_controller.editTask);


module.exports = router;
