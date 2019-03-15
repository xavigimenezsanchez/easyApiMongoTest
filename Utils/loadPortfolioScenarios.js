var fs = require('fs');
var parse = require('csv-parse');
const parseNull = require('./parseNull');
var mongo = require('../db');
var PortfolioScenario = require('../models/portfolioScenario.model');
var portfolioScenarios = [];


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

    fs.createReadStream('./Utils/portfolioScenarios.csv')
            .pipe(parser)
            .on('data', function(data){
                try {
                    portfolioScenarios.push(parseNull(data));
                }
                catch(err) {
                    console.error(err);
                }
            })
            .on('end',function(){
                PortfolioScenario.insertMany(portfolioScenarios,
                                    (err,doc) => {
                                        if (err) {
                                            console.error(err);
                                        }
                                        console.log("Load finished");
                                        db.connection.close(()=>console.warn("Moongoose connection disconnected"));
                                    });
            });  
    });