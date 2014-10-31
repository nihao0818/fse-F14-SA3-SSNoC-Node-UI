/**
 * Created by Vignan on 10/16/2014.
 */
var bcrypt = require('bcrypt-nodejs');
var request = require('request');
var rest_api = require('../../config/rest_api')

function wallMessages(){}

        wallMessages.sendWallMessage = function(user_name,content,callback){
        var options = {
            url : rest_api.message + user_name,
            body : {content:content},
            json: true
        };
        request.post(options,function(err,res) {
            if (err){
                console.log(err);
                callback(err);
                return;
            }
            if (res.body) {
                console.log(res.body);
                callback(res.body);
                return;
            }
            else {
                console.log(res.body);
                callback(res.body);
                return;
            }
        });

    };

    wallMessages.getWallMessages = function(callback){
        request(rest_api.messages+'/wall',{json:true},function(err,res,body){
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

module.exports = wallMessages;