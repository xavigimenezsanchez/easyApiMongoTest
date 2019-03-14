const fs = require('fs');
const EventEmitter = require('events'); 
const eventDb = new EventEmitter();
const parseNull = require('./parseNull');
const parse = require('csv-parse');
const mongo = require('../db');
const User = require('../models/User.model');
let users = [];

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

    fs.createReadStream('./Utils/users.csv')
            .pipe(parser)
            .on('data', function(data){
                try {
                    users.push(parseNull(data));
                }
                catch(err) {
                    console.error(err);
                }
            })
            .on('end',function(){
                User.insertMany(users,
                    (err,doc) => {
                        if (err) {
                            console.error(err);
                        }
                        console.log("Load finished");
                        db.connection.close(()=>console.warn("Moongoose connection disconnected"));
                    });
            });  
    });



