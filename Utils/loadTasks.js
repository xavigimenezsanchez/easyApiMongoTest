var fs = require('fs');
const EventEmitter = require('events'); 
var eventDb = new EventEmitter();
var parseNull = require('./parseNull');
var parse = require('csv-parse');
var mongo = require('../db');
var Task = require('../models/task.model');
var Project = require('../models/project.model');
var tasks = [];


eventDb.on('done', (db) => {
    console.log("Load finished");
    db.connection.close(()=>console.warn("Moongoose connection disconnected"));
} );

mongo().then((db)=>{
    parser = parse({columns:header => header.map( column => column.trim())},
                    (err,data)=> {
                            if (err) {
                                console.log(err);
                                return null;
                            }
                            return data;
                        }
                );

    fs.createReadStream('./Utils/tasks.csv')
            .pipe(parser)
            .on('data', function(data){
                try {
                    tasks.push(parseNull(data));
                }
                catch(err) {
                    console.error(err);
                }
            })
            .on('end',function(){
                let counter = 0,
                    count = () => ++counter===(tasks.length - 1)?eventDb.emit('done',db):null;

                tasks.forEach((task) => {
                    Project.findOne({ UID: task.ProjectUID }, (err, project) => {
                        if (err) {
                            count();
                            return err;
                        }
                        task.Project = project._id;
                        let newTask =new Task(task)
                        newTask.save(()=>count());
                    })
                })
            });  
    });



