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
            var title = req.body.title;
            var content = req.body.announcement;
            annRest.sendAnnouncement(user_name,content,title, function(body) {
                if(body==201){
                    console.info("Announcement posted");
                    res.render('announcements',{message: req.flash('Announcement posted')});
                }else{
                    console.info(body);}
            });
        }
    }
};