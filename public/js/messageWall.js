/**
 * Created by Vignan on 10/16/2014.
 */
function init(){
    var serverBaseUrl = document.domain;
    var socket = io.connect(serverBaseUrl);
    var usernameraw = $("p.navbar-brand").find("span").html();
    var names = usernameraw.split(" ");
    var userName = names[1];
    socket.emit("refreshWall",{user_name: userName});

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

        socket.on('publicWallMessages',function(data){
            updatePublicWall(data.messages);
        });

        socket.on('error', function (reason) {
            console.log('Unable to connect to server', reason);
        });

}
$(document).on('ready', init);