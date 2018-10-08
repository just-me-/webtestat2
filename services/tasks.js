const Datastore = require('nedb');
const db = new Datastore({ filename: './data/tasks.db', autoload: true, timestampData: true });  //timestampData adds created field automatically.

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
    //wenn das Done-Checkbox unchecked ist, wird es einfach nicht übertragen, drum:
    if (done === undefined) {
        done = false;
    }
    let task = new Task(title, desc, prio, date, done);
    db.insert(task, function(err, newDoc){
        if(callback){
            callback(err, newDoc);
        }
    });
}

function publicEditTask(id, title, desc, prio, date, done, callback){

    if (done === undefined) {
        done = false;
    }

    db.findOne({ _id: id }, function (err, doc) {  //eigentlich optional, das document zuerst zu suchen.

        if (doc) {
            db.update({_id: id}, {$set: {
                    "title":title,
                    "desc":desc,
                    "prio":prio,
                    "date":date,
                    "done":done
                }
            }, {returnUpdatedDocs:true}, function (err, numDocs, doc) {
                callback(err, doc);
            });
        } else {
            console.log("3rr0r - task to be edited was not f0u|/|tttt!!! Scheisse, was?")
        }

    });
}

function publicGet(id, callback)
{   db.findOne({ _id: id }, function (err, doc) {
        callback( err, doc);
    });
}


//gets messy otherwise
function publicRemove(id, callback) {
    db.remove({_id: id}, function (err, numDocs, doc) {
        callback(err, doc);
    });
}


function publicAll(config, callback)
{
    //getting filter in right format:
    let filter = null;
    if(config.filter === 'done') {
        filter = { done: false };    //TODO: bisschen untested aber so halb tuts zum Teil wenn man die url selbst eingibt.
    }

    orderByObj = {};
    orderByObj[config.order] = config.sorting;           //die zeile ist ziemlich ahrdcore, sollte man ev noch verstehen, warum as klappt (ich hab keine ahnung).
    db.find(filter).sort(orderByObj).exec(callback);
}

module.exports = {
    add : publicAddTask,
    delete: publicRemove,
    edit: publicEditTask,
    get : publicGet,
    all : publicAll};


