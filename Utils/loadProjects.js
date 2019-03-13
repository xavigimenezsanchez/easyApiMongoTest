var fs = require('fs');
var parse = require('csv-parse');
var mongo = require('../db');
var Project = require('../models/projects.model');
var projects = [];


mongo().then((db)=>{
    let parseNull = function(object) {
        for (prop in object) {
            if (object.hasOwnProperty(prop)) {
                if (object[prop] === "NULL") {
                    delete object[prop];
                }
            }
        }
        return object;
    }

    parser = parse({columns:header => header.map( column => column.trim())},
                    (err,data)=> {
                            if (err) {
                                console.log(err);
                                return null;
                            }
                            return data;
                        }
                );

    fs.createReadStream('./Utils/projects.csv')
            .pipe(parser)
            .on('data', function(data){
                try {
                    projects.push(parseNull(data));
                }
                catch(err) {
                    console.error(err);
                }
            })
            .on('end',function(){
                Project.insertMany(projects,
                                    (err,doc) => {
                                        if (err) {
                                            console.error(err);
                                        }
                                        console.log("Load finished");
                                        db.connection.close(()=>console.warn("Moongoose connection disconnected"));
                                    });
            });  
    });