const tasks = require("../services/tasks.js");

module.exports.showIndex = function (req, res) {
    tasks.all(function (err, tasks) {
        res.render('index', {
            title: 'Overview',
            tasks: tasks,
            dark_mode: (req.userSettings.darkmode ? true : undefined)
        });
    });
};

module.exports.registerTask = function (req, res) {
        res.render('add_task', {title:"Add a new Task"})
};

module.exports.createTask = function (req, res) {
    tasks.add(req.body.tasktitle, req.body.desc, req.body.prio, req.body.due, req.body.done, function (err, doc) {
        res.redirect(`/`);
    });
};

module.exports.showTask = function (req, res) {
    tasks.get(req.params.id, function (err, task) {
        if (task) {
            let data = {
                title: "View and edit your task",
                id: req.params.id,
                tasktitle: task.title,
                desc: task.desc,
                prio: task.prio,
                due: task.date,
                done: task.done
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
