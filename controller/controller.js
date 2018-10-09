const tasks = require("../services/tasks.js");
const configurator = require("../services/configurator.js");

module.exports.showIndex = function (req, res) {
    let config = configurator(req, res);  //gets config from cookie and/or url arguments

    console.log("======~~~~~~~~~~~~~~~~CONFIG ELEMENT IN CONTROLLER BEFORE SHOW INDEX CALL:::::::::\n", config);
    tasks.all(config, function (err, tasks) {
        res.render('index', {
            title: 'Overview',
            tasks: tasks,
            config: config
        });
    });
};

module.exports.registerTask = function (req, res) {
    let config = configurator(req, res);
    res.render('add_task', {title:"Add a new Task", config: config})
};

module.exports.createTask = function (req, res) {
    tasks.add(req.body.tasktitle, req.body.desc, req.body.prio, req.body.due, req.body.done, function (err, doc) {
        res.redirect(`/`);
    });
};

module.exports.showTask = function (req, res) {
    tasks.get(req.params.id, function (err, task) {
        if (task) {
            let config = configurator(req, res);
            let data = {
                title: "View and edit your task",
                id: req.params.id,
                tasktitle: task.title,
                desc: task.desc,
                prio: task.prio,
                due: task.date,
                done: task.done,
                config: config
            };
            console.log("=====task========\n", task, "=========\n");
            console.log("=====data========\n", data, "=========\n");
            res.render('edit_task', data);
        } else {
            res.end("Bloeda Cheib, oeppis gschids igeh!!")
        }
    });
};


module.exports.editTask = function (req, res) {

    console.log("============EDIT TASK AS FOLLOWS=========\n",req.params.id, req.body.tasktitle, req.body.desc, req.body.prio, req.body.due, req.body.done);

    tasks.edit(req.params.id, req.body.tasktitle, req.body.desc, req.body.prio, req.body.due, req.body.done, function (err, doc) {
        res.redirect(`/`);
    });
};


module.exports.deleteTask = function (req, res) {
    tasks.delete(req.params.id, function (err, task) {
        res.redirect(`/`);
    });
};
