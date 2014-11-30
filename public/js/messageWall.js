/**
 * Created by Vignan on 10/16/2014.
 */
function init(){
    var serverBaseUrl = document.domain;
    var socket = io.connect(serverBaseUrl);
    var usernameraw = $("p.navbar-brand").find("span").html();
    var names = usernameraw.split(" ");
    var userName = names[1];
    var name;

        function updatePublicWall(data){
            $('#messageWall').html('');
            for(var i=0; i<data.length; i++) {
                var name = data[i].author;
                var content = data[i].content;
                var postedAt = data[i].postedAt;
                var message = '<div class="panel panel-info">' +
                    '<div class="panel-heading"><strong>' + name + '</strong></div>' +
                    '<table class="table" style="table-layout: fixed" width="100%">' +
                    '<tr><td width="57%" style="word-wrap: break-word ">' + content + '</td>' +
                    '<td width="43%">' + postedAt + '</td></tr>' +
                    '</table>' +
                    '</div>';
                $('#messageWall').append(message);
            }
        };

    function userLocation(){
        //user location gathering
        var userPosLat;
        var userPosLong;
        getLocation();
        function getLocation() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(showPosition);
            } else {
                x.innerHTML = "Geolocation is not supported by this browser.";
                console.log("MapLocation not found");
            }
        }
        function showPosition(position) {
            userPosLat = position.coords.latitude;
            userPosLong = position.coords.longitude;

            socket.emit('emitUserLoc', {name: name, userPosLat:userPosLat, userPosLong:userPosLong});
        }
    }

        socket.on('publicWallMessages',function(data){
            updatePublicWall(data.messages);
        });

        socket.on('error', function (reason) {
            console.log('Unable to connect to server', reason);
        });

        socket.emit("refreshWall",{user_name: userName});

    socket.on("newChatMsgAlert",function(data){
        if(name=data.target){
            alert(data.source+' has sent you a private message \n' +
            'Message: '+data.content);
        }
    });

    socket.on('getLocation',function(){
        userLocation();
    });

    socket.on('connect', function () {
        sessionId = socket.socket.sessionid;
        $.ajax({
            url:  '/user',
            type: 'GET',
            dataType: 'json'
        }).done(function(data) {
            name = data.name;
            var status = data.status;
            var statusDate = data.statusDate;
            socket.emit('newUser', {id: sessionId, name: name, status:status, statusDate:statusDate});
            userLocation();
        });
    });

}
$(document).on('ready', init);