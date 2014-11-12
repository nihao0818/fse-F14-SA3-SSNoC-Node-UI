var User = require('./models/UserRest');
var memoryMonitor = require('./models/MemoryMonitorRest');

var publicWall=require('./models/MessageWallRest');


module.exports = function(app, _, io, participants, passport) {
  var user_controller = require('./controllers/user')(_, io, participants, passport, refreshAllUsers);
  var people_controller = require('./controllers/people')(_, io, participants, passport);
  var memory_controller = require('./controllers/Memory')(_,io,participants,passport);
  var performance_controller = require('./controllers/performance')(_,io,participants,passport);

  var SSN_controller = require('./controllers/SSN')(_,io,participants,passport);

  var wall_controller = require('./controllers/messageWallC')(_,io,participants,passport);
  var ann_controller = require('./controllers/announcementsC')(_,io,participants,passport);

  var search_controller = require('./controllers/search')(_,io,passport,participants);
  var chat_controller = require('./controllers/chatController')(_,io,passport,participants);

  app.get("/", user_controller.getLogin);

  app.post("/signup", user_controller.postSignup);

  app.get("/welcome", isLoggedIn, user_controller.getWelcome);

  app.get("/user", isLoggedIn, user_controller.getUser);

  app.get("/normalpeople", isLoggedIn, people_controller.getNormalPeople);

  app.post("/status/:name", user_controller.updateStatus);

  app.get('/signup', user_controller.getSignup);


  app.get("/logout", isLoggedIn, user_controller.getLogout);

  app.get("/messageWall", isLoggedIn,wall_controller.getPublicWallPage);

  app.post("/sendWallMessage",isLoggedIn,wall_controller.sendWallMessage);

  app.get("/getMessageWall",wall_controller.getPublicWallPageInfo);

  app.post("/sendTestWallMessage",wall_controller.sendTestWallMessage);
  app.post("/chatMessagePage",isLoggedIn,chat_controller.getChatMessagePage);
  app.post("/sendChatMessage",isLoggedIn,chat_controller.sendChatMessage);
  app.post("/getChatHistory",isLoggedIn,chat_controller.getChatMessages);

  app.get("/measurePerformance", isLoggedIn, performance_controller.getPerformanceMeasurePage);

  app.post("/setup",isLoggedIn,performance_controller.setUpPerformanceMonitor);

  app.post("/teardown",performance_controller.tearDownPerformanceMonitor);

  app.get("/getMeasurePerformanceStats",performance_controller.viewPerformanceMonitor);

  app.get("/measureMemory", isLoggedIn, memory_controller.getMemoryMeasurePage);

  app.post("/start",isLoggedIn,memory_controller.setStartMemoryMonitor);

  app.post("/stop",isLoggedIn,memory_controller.setStopMemoryMonitor);

  app.delete("/delete",isLoggedIn,memory_controller.setDeleteMemoryHistory);

  app.get("/getMeasureMemoryStats",isLoggedIn, memory_controller.getMeasureMemoryStats);


  app.get("/SSN_Analysis", isLoggedIn, SSN_controller.getSSNanalysisPage);

  app.get("/ssn",isLoggedIn,SSN_controller.setStartSSNanalysis);


  app.get("/announcements", isLoggedIn,ann_controller.getAnnoucementsPage);

  app.post("/postAnnouncement",isLoggedIn,ann_controller.sendAnnouncement);


  app.put("/UpdateAll",isLoggedIn,user_controller.getStatusUpdated);

  app.get("/search", isLoggedIn,search_controller.getSearchPage);

  app.post("/search", isLoggedIn,search_controller.sendSearchQuery);

  app.get("/");


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

      participants.all.push({'userName' : user.local.name, 'userStatus' : user.local.status, 'statusDate' : user.local.statusDate, 'accountStatus' : user.local.accountStatus, 'privilegeLevel' : user.local.privilegeLevel});

    });
    callback();
  });

}
