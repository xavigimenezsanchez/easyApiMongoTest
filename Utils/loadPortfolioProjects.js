var fs = require('fs');
var parse = require('csv-parse');
const parseNull = require('./parseNull');
var mongo = require('../db');
var PortfolioProject = require('../models/portfolioProject.model');
var portfolioProjects = [];


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

    fs.createReadStream('./Utils/portfolioProjects.csv')
            .pipe(parser)
            .on('data', function(data){
                try {
                    portfolioProjects.push(parseNull(data));
                }
                catch(err) {
                    console.error(err);
                }
            })
            .on('end',function(){
                PortfolioProject.insertMany(portfolioProjects,
                                    (err,doc) => {
                                        if (err) {
                                            console.error(err);
                                        }
                                        console.log("Load finished");
                                        db.connection.close(()=>console.warn("Moongoose connection disconnected"));
                                    });
            });  
    });