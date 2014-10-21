/**
 * Created by Admin on 2014/10/14.
 */
var bcrypt = require('bcrypt-nodejs');
var request = require('request');
var rest_api = require('../../config/rest_api'),
    _ = require('underscore');

function SSNanalysis(startTime, endTime) {
    this.local = {
        startTime : startTime,
        endTime : endTime

    };

}
/*
    SSNanalysis.startSSNanalysis = function(){
        request.post(rest_api.SSN_analysis,function(err, res, body){
        console.log("start SSN Analysis request sent to REST");
            return;
        });
        return;
    };
*/
    SSNanalysis.startSSNanalysis = function(startTime, endTime, callback) {
    request(rest_api.SSN_analysis +startTime+'/'+endTime, {json:true}, function(err, res, body) {
        if (err){
            callback(err,res);
            return;
        }
        if (res.statusCode === 200) {
            callback(null, body);
            return;
        }
        if (res.statusCode !== 200) {
            callback(null, null);
            return;
        }
    });
};



module.exports = SSNanalysis;
