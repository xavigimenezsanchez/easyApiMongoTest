const fs = require('fs');
const parseNull = require('./parseNull');
const parse = require('csv-parse');
const mongo = require('../db');
const Project = require('../models/project.model');
const projects = [];


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