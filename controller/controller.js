const tasks = require("../services/tasks.js");

module.exports.showIndex = function (re, res) {
    let dark_mode = true; // 2do via cookie/session...
    tasks.all(function (err, tasks) {
        res.render('index', {
            title: 'Overview',
            tasks: tasks,
            dark_mode: true
        });
    });
};

module.exports.registerTask = function (req, res) {
        res.render('add_task', { title: 'New Task - Add View' })
};

module.exports.createTask = function (req, res) {
    tasks.add(req.body.title, req.body.desc, req.body.prio, req.body.date, req.body.done, function (err, doc) {
        res.redirect(`/task/${doc._id}`); //redirect und doc._id müsste stimmen oda?
    });
};

module.exports.showTask = function (req, res) {
    tasks.get(req.params.id, function (err, task) {
        if (task) {
            res.render('task', task); //iwie so?
        } else {
            res.end("Bloeda Cheib, oeppis gschids igeh!!")
        }
    });
};