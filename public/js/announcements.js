/**
 * Created by Vignan on 10/24/2014.
 */

function init(){
    var serverBaseUrl=document.domain;
    var socket = io.connect(serverBaseUrl);

    function updateAnnouncements(data){
        $('#announcementsWall').html('');
        for(var i=0;i<data.length;i++){
            var name = data[i].author;
            var title = data[i].title;
            var content = data[i].content;
            var postedAt = data[i].postedAt;
            var announcement = '<div class="panel panel-warning">'+
                    '<div class="panel-heading"><strong>'+ title+'</strong>'+'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;announced by&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+'<strong>'+name+ '</strong></div>'+
                    '<table class="table" style="table-layout: fixed" width="100%">' +
                    '<tr><td width="57%" style="word-wrap: break-word ">' + content + '</td>' +
                    '<td width="43%">' + postedAt + '</td></tr>' +
                    '</table>' +
                    '</div>';
            $('#announcementsWall').append(announcement);
        }
    };

    socket.on('announcements', function (data) {
        updateAnnouncements(data.messages);
    })

    socket.on('error', function (reason) {
        console.log('Unable to connect to server', reason);
    })
}
$(document).on('ready',init);