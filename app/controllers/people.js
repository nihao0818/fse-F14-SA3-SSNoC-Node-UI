module.exports = function(_, io, participants, passport) {
  return {

    getPeople: function(req, res) {
        //get participants
        for(var i = 0; i < participants.all.length; i++) {
            console.log("gooood" + participants.all[i]);
            if(participants.all[i].userName==req.session.passport.user.user_name){
                var status = participants.all[i].userStatus;
            }
        }

        if (req.session.passport.user.user_name.toString() != "Qihao"){

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
