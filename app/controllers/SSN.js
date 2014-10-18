/**
 * Created by Admin on 2014/10/14.
 */
var memoryMonitor = require('../models/MemoryMonitorRest');
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
            console.info('inside setStartSSNanalysis.js-------------------');

            var startTime = req.param('startTime');  //cite parameter here-----

            console.info(startTime);

            var endTime = req.param('endTime');
            console.info('inside 22222222');
            SSNanalysis.startSSNanalysis(startTime,endTime,function(err,results){
                if(err){
                    console.info('errrrrrrrrrrrrrrrr');
                }
                if(results){
                    console.info('inside 3333333333');
                    res.json(200,results);
                }
            });
        }


    };
};