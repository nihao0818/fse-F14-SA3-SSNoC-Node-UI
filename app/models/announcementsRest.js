/**
 * Created by Vignan on 10/24/2014.
 */
var bcrypt = require('bcrypt-nodejs');
var request = require('request');
var rest_api = require('../../config/rest_api')

function announcements(){}

    announcements.sendAnnouncement = function(user_name,content,title,callback){
      var options={
          url : rest_api.announcement + user_name,
          body : {content:content, title:title},
          json : true
      };
        request.post(options, function (err, res) {
            if(res==201){
                return;
            }else{
                callback(res.statusCode);
                return;
            }
            if(err){
                callback(err.statusCode);
                return;
            }
        });
    };

    announcements.getAnnouncements = function(callback){
      request(rest_api.announcement,{json:true}, function (err, res, body) {
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
module.exports = announcements;
