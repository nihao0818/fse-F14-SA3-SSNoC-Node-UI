var User = require('./models/UserRest');

module.exports = function(app, _, io, participants, passport) {
  var user_controller = require('./controllers/user')(_, io, participants, passport, refreshAllUsers);
  var people_controller = require('./controllers/people')(_, io, participants, passport);

  app.get("/", user_controller.getLogin);

  app.post("/signup", user_controller.postSignup);

  app.get("/welcome", isLoggedIn, user_controller.getWelcome);

  app.get("/user", isLoggedIn, user_controller.getUser);
<<<<<<< HEAD

  app.post("/status/:name", user_controller.updateStatus);

  app.get('/signup', user_controller.getSignup);

=======
  app.get('/signup', user_controller.getSignup);
>>>>>>> 0cd38623b295c99a9e8eaf467e7bc52f31eff874
  app.get("/logout", isLoggedIn, user_controller.getLogout);
  app.post("/login", passport.authenticate('local-login', {
    successRedirect : '/people',
    failureRedirect : '/',
    failureFlash: true
  }));

  app.get("/people", isLoggedIn, people_controller.getPeople);
};

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
    return next();

  res.redirect('/');
}

function refreshAllUsers(participants, callback) {
  participants.all = [];
  User.getAllUsers(function(err, users) {
    users.forEach(function(user) {
<<<<<<< HEAD
      participants.all.push({'userName' : user.local.name, 'userStatus' : user.local.status});
=======
      participants.all.push({'userName' : user.local.name});
>>>>>>> 0cd38623b295c99a9e8eaf467e7bc52f31eff874
    });
    callback();
  });
}
