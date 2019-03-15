var fs = require('fs');
var parse = require('csv-parse');
const parseNull = require('./parseNull');
var mongo = require('../db');
var PortfolioAssignment = require('../models/portfolioAsignment.model');
var portfolioAssignments = [];


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

    fs.createReadStream('./Utils/portfolioAssignments.csv')
            .pipe(parser)
            .on('data', function(data){
                try {
                    portfolioAssignments.push(parseNull(data));
                }
                catch(err) {
                    console.error(err);
                }
            })
            .on('end',function(){
                PortfolioAssignment.insertMany(portfolioAssignments,
                                    (err,doc) => {
                                        if (err) {
                                            console.error(err);
                                        }
                                        console.log("Load finished");
                                        db.connection.close(()=>console.warn("Moongoose connection disconnected"));
                                    });
            });  
    });