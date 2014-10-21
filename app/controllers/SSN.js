/**
 * Created by Admin on 2014/10/14.
 */

var SSNanalysis = require('../models/SSNRest')

module.exports = function(_, io, passport) {

    return{

        getSSNanalysisPage : function(req, res) {
            res.render('SSNanalysis', {title: "Hello " + " !!"} );
        },


/*
        setStartSSNanalysis : function(req,res){
            console.info("inside setStartSSNanalysis.js");
            SSNanalysis.startSSNanalysis();
            res.render('SSNanalysis', {message: req.flash('SSN Analysis Started...')} );
        },
*/
        setStartSSNanalysis : function(req,res){
            //res.redirect('/ssn');
            console.info('inside setStartSSNanalysis.js');


            if (req.param('startTime') == "infinite"){
                var startTime = "1900-01-01 00:00"; //cite parameter here-----
            }
            else{
                var startTime = req.param('startTime');
            }

            var endTime;

            var datenow = new Date();
            if (req.param('endTime') == "infinite"){
                endTime = datenow.getFullYear() + "-" + datenow.getMonth() + "-" + datenow.getDate() + " " +datenow.getHours() + ":" +datenow.getMinutes();
            }
            else{
                endTime = req.param('endTime');
            }
            console.info(endTime);


            console.info('date assignment finished');
            SSNanalysis.startSSNanalysis(startTime,endTime,function(err,results){
                if(err){
                    console.info('errrrrrrrrrrrrrrrr');
                }
                if(results){
                    console.info('Can get results');
                    res.json(200,results);
                }
            });


        }


    };
};