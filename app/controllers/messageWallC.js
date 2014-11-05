/**
 * Created by Vignan on 10/15/2014.
 */

var messageWallR = require('../models/MessageWallRest');

module.exports = function(_,io,participants,passport){
    return{
       getPublicWallPage : function(req,res){
            res.render('messageWall', {title: "Hello " +req.session.passport.user.user_name+" !!"} );
        },

        getPublicWallPageInfo : function(req,res){
            var user_name = req.session.passport.user.user_name;
            var role;
            for(var i = 0; i < participants.all.length; i++) {

                if(participants.all[i].userName==user_name){
                     role = participants.all[i].privilegeLevel;
                }
            }

            messageWallR.getWallMessages(role,function(err,body){
                res.json(200, {});
            });
        },

       sendWallMessage : function(req,res){
            var user_name = req.session.passport.user.user_name;
            var content = req.body.message;
            messageWallR.sendWallMessage(user_name,content,function(body){
                if(body=="wall message saved"){res.render('messageWall', {message: req.flash('Message updated on Wall')} );}
                else{console.log(body);}
            });
       },

        sendTestWallMessage : function (req,res){
            var user_name = "tester";
            var content = req.body.message;
            messageWallR.sendWallMessage(user_name,content,function(body){
                if(body){
                    res.json(body);
                }
            });
        }
    }
};