const Datastore = require('nedb');
const db = new Datastore({ filename: './data/tasks.db', autoload: true });

function Task(title, desc, prio, date, done)
{
    this.title = title;
    this.desc = desc;
    this.prio = prio;
    this.date = date;
    this.done = done;
}

function publicAddTask(title, desc, prio, date, done, callback)
{
    let task = new Task(title, desc, prio, date, done);
    db.insert(task, function(err, newDoc){
        if(callback){
            callback(err, newDoc);
        }
    });
}


function publicGet(id, callback)
{   db.findOne({ _id: id }, function (err, doc) {
        callback( err, doc);
    });
}

function publicAll(callback)
{
    db.find({}, function (err, docs) {
        callback( err, docs);
    });
}

module.exports = {add : publicAddTask, get : publicGet, all : publicAll};


