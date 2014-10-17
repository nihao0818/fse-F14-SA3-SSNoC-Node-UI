/**
 * Created by Vignan on 10/15/2014.
 */

var messageWallR = require('../models/MessageWallRest');

module.exports = function(_,io,participants,passport){
    return{
       getPublicWallPage : function(req,res){
            res.render('messageWall', {title: "Hello " +req.session.passport.user.user_name+" !!"} );
        },

       sendWallMessage : function(req,res){
            var user_name = req.session.passport.user.user_name;
            var content = req.body.message;
            console.log(content);
            var d = new Date();
            var minute = d.getMinutes();
            var hour = d.getHours();
            var date = d.getDate();
            var month = d.getMonth()+1;
            var year = d.getFullYear();
            var postedAt =  year + '-' + (month < 10 ? '0' + month : month) + '-' + (date < 10 ? '0' + date : date) + ' ' + (hour < 10 ? '0' + hour : hour) + ':' + (minute < 10 ? '0' + minute : minute);
            messageWallR.sendWallMessage(user_name,content,postedAt);
            res.render('messageWall', {message: req.flash('Message updated on Wall')} );

    }
    };
};