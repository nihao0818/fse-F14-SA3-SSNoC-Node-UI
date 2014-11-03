module.exports = function(_, io, participants, passport) {
  return {

    getPeople: function(req, res) {
        //get participants
        for(var i = 0; i < participants.all.length; i++) {
            console.log("gooood" + participants.all[i]);
            if(participants.all[i].userName==req.session.passport.user.user_name){
                var role = participants.all[i].privilegeLevel;
            }
        }

        if (role != "Administrator"){
//        if (0){
            res.render("people", {userId: req.session.userId, title:("People"), user_name:req.session.passport.user.user_name});
            console.log(req.body);
        }
        else{
            res.render("peopleAdmin", {userId: req.session.userId, title:("Admin_View "), user_name:req.session.passport.user.user_name});

            console.log(req.body);
        }



    }
  };
};
