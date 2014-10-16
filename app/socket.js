module.exports = function(_, io, participants, test) {
  io.on("connection", function(socket){
    socket.on("newUser", function(data) {

      participants.online[data.id] = {'userName' : data.name, 'status': data.status, 'statusDate' : data.statusDate};
      io.sockets.emit("newConnection", {participants: participants});
    });

    socket.on("statusUpdate", function(data) {
      participants.online[data.id] = {'userName' : data.name, 'status': data.status, 'statusDate' : data.statusDate};
       for(var i = 0; i < participants.all.length; i++){
           console.log("gooood" + participants.all[i]);
           if(participants.all[i].userName==data.name){
               participants.all[i].userStatus=data.status;
               participants.all[i].statusDate=data.statusDate;
           }
       }
      io.sockets.emit("newConnection", {participants: participants});
    });

    socket.on("disconnect", function() {
      delete participants.online[socket.id];
      io.sockets.emit("userDisconnected", {id: socket.id, sender:"system", participants:participants});
    });

      socket.on("getTestStatus", function() {
          io.sockets.emit("testStatus", {test: test});
      });

      socket.on("updateTestStatus", function(data) {
          test = data.test;
          io.sockets.emit("testStatus", {test: test});
      });

  });
};
