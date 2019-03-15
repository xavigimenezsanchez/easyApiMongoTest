var fs = require('fs');
var parse = require('csv-parse');
const parseNull = require('./parseNull');
var mongo = require('../db');
var PortfolioResource = require('../models/portfolioResource.model');
var portfolioResources = [];


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

    fs.createReadStream('./Utils/portfolioResources.csv')
            .pipe(parser)
            .on('data', function(data){
                try {
                    portfolioResources.push(parseNull(data));
                }
                catch(err) {
                    console.error(err);
                }
            })
            .on('end',function(){
                PortfolioResource.insertMany(portfolioResources,
                                    (err,doc) => {
                                        if (err) {
                                            console.error(err);
                                        }
                                        console.log("Load finished");
                                        db.connection.close(()=>console.warn("Moongoose connection disconnected"));
                                    });
            });  
    });