/**
 * Created by Vignan on 10/24/2014.
 */

var annRest = require('../models/announcementsRest');

module.exports = function(_,io,passport) {

    return{

        getAnnoucementsPage : function(req,res){
            res.render('announcements',{title:"Hello "+req.session.passport.user.user_name+" !!"});
        },
        sendAnnouncement : function (req, res) {
            var user_name = req.session.passport.user.user_name;
            var content = req.body.announcement;
            annRest.sendAnnouncement(user_name,content, function(body) {
                if(body=="Announcement saved"){res.render('announcements', {message: req.flash('Announcement saved')} );}
                else{console.log(body);}
            });
        }
    }
};