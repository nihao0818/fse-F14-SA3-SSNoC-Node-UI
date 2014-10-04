module.exports = function(_, io, participants) {
  io.on("connection", function(socket){
    socket.on("newUser", function(data) {
<<<<<<< HEAD
      participants.online[data.id] = {'userName' : data.name, 'status': data.status, 'statusDate' : data.statusDate};
      io.sockets.emit("newConnection", {participants: participants});
    });

    socket.on("statusUpdate", function(data) {
      participants.online[data.id] = {'userName' : data.name, 'status': data.status, 'statusDate' : data.statusDate};
=======
      participants.online[data.id] = {'userName' : data.name, 'status': data.status};
>>>>>>> 0cd38623b295c99a9e8eaf467e7bc52f31eff874
      io.sockets.emit("newConnection", {participants: participants});
    });

    socket.on("disconnect", function() {
      delete participants.online[socket.id];
      io.sockets.emit("userDisconnected", {id: socket.id, sender:"system", participants:participants});
    });

  });
};
