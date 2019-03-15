var fs = require('fs');
var parse = require('csv-parse');
const parseNull = require('./parseNull');
var mongo = require('../db');

var PortfolioTimephasedData = require('../models/portfolioTimephasedData.model');
var portfolioTimephasedData = [];


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

    fs.createReadStream('./Utils/PortfolioTimephasedData.2.csv')
            .pipe(parser)
            .on('data', function(data){
                try {
                    portfolioTimephasedData.push(parseNull(data));
                }
                catch(err) {
                    console.error(err);
                }
            })
            .on('end',function(){
                // let counter = 0,
                //     count = () => ++counter===(tasks.length - 1)?eventDb.emit('done',db):null;
                
                // portfolioTimephasedData.forEach((timephase) => {
                //     let portfolioTimephasedData = new PortfolioTimephasedData(timephase);
                //     portfolioTimephasedData.save(count);
                // }
                // );
                PortfolioTimephasedData.insertMany(portfolioTimephasedData,
                                    (err,doc) => {
                                        if (err) {
                                            console.error(err);
                                        }
                                        console.log("Load finished");
                                        db.connection.close(()=>console.warn("Moongoose connection disconnected"));
                                    });
            });  
    });