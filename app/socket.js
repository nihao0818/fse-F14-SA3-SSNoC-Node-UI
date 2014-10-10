module.exports = function(_, io, participants) {
  io.on("connection", function(socket){
    socket.on("newUser", function(data) {

      participants.online[data.id] = {'userName' : data.name, 'status': data.status, 'statusDate' : data.statusDate};
      io.sockets.emit("newConnection", {participants: participants});
    });

    socket.on("statusUpdate", function(data) {
      participants.online[data.id] = {'userName' : data.name, 'status': data.status, 'statusDate' : data.statusDate};
      /* for(person in participants.all){
           console.log(person);
           if(person.userName==data.name){
               person.userStatus=data.status;
               person.statusDate=data.statusDate;
           }
       }*/
      io.sockets.emit("newConnection", {participants: participants});
    });

    socket.on("disconnect", function() {
      delete participants.online[socket.id];
      io.sockets.emit("userDisconnected", {id: socket.id, sender:"system", participants:participants});
    });

  });
};
