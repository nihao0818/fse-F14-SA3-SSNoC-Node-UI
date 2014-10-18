var User = require('./models/UserRest');
var memoryMonitor = require('./models/MemoryMonitorRest');

var publicWall=require('./models/MessageWallRest');


module.exports = function(app, _, io, participants, passport) {
  var user_controller = require('./controllers/user')(_, io, participants, passport, refreshAllUsers);
  var people_controller = require('./controllers/people')(_, io, participants, passport);
  var memory_controller = require('./controllers/Memory')(_,io,participants,passport);

    var SSN_controller = require('./controllers/SSN')(_,io,participants,passport);

  var wall_controller = require('./controllers/messageWallC')(_,io,passport);



  app.get("/", user_controller.getLogin);

  app.post("/signup", user_controller.postSignup);

  app.get("/welcome", isLoggedIn, user_controller.getWelcome);

  app.get("/user", isLoggedIn, user_controller.getUser);


  app.post("/status/:name", user_controller.updateStatus);

  app.get('/signup', user_controller.getSignup);


  app.get("/logout", isLoggedIn, user_controller.getLogout);



  app.get("/messageWall", isLoggedIn,wall_controller.getPublicWallPage);

  app.post("/sendWallMessage",isLoggedIn,wall_controller.sendWallMessage);


  app.get("/measureMemory", isLoggedIn, memory_controller.getMemoryMeasurePage);

  app.post("/start",isLoggedIn,memory_controller.setStartMemoryMonitor);

  app.post("/stop",isLoggedIn,memory_controller.setStopMemoryMonitor);

  app.delete("/delete",isLoggedIn,memory_controller.setDeleteMemoryHistory);

  app.get("/getMeasureMemoryStats",isLoggedIn, memory_controller.getMeasureMemoryStats);


  app.get("/SSN_Analysis", isLoggedIn, SSN_controller.getSSNanalysisPage);

  app.get("/ssn",isLoggedIn,SSN_controller.setStartSSNanalysis);



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
};

function refreshAllUsers(participants, callback) {
  participants.all = [];
  User.getAllUsers(function(err, users) {
    users.forEach(function(user) {

      participants.all.push({'userName' : user.local.name, 'userStatus' : user.local.status});

    });
    callback();
  });

}
