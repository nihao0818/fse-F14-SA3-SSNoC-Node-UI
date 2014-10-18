/**
 * Created by Vignan on 10/16/2014.
 */
var bcrypt = require('bcrypt-nodejs');
var request = require('request');
var rest_api = require('../../config/rest_api')

function wallMessages(){

}
    wallMessages.sendWallMessage = function(user_name,content,postedAt){
        request.post({url:rest_api.message + user_name, body: {content:content,postedAt:postedAt}, json:true},function(err,res,body) {
            if (err || res.statusCode !== 200){
                console.log("return unsuccessfully!");
                console.log(res.statusCode);
            }
            else{console.log("return successfully");}
            return;
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