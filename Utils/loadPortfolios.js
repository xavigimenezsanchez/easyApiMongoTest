const fs = require('fs');
const parseNull = require('./parseNull');
const parse = require('csv-parse');
const mongo = require('../db');
const Portfolio = require('../models/portfolio.model');
var portfolios = [];


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

    fs.createReadStream('./Utils/portfolios.csv')
            .pipe(parser)
            .on('data', function(data){
                try {
                    portfolios.push(parseNull(data));
                }
                catch(err) {
                    console.error(err);
                }
            })
            .on('end',function(){
                Portfolio.insertMany(portfolios,
                                    (err,doc) => {
                                        if (err) {
                                            console.error(err);
                                        }
                                        console.log("Load finished");
                                        db.connection.close(()=>console.warn("Moongoose connection disconnected"));
                                    });
            });  
    });