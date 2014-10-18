/**
 * Created by Admin on 2014/10/14.
 */
function init() {
    var serverBaseUrl = document.domain;

    var socket = io.connect(serverBaseUrl);

    var test;

    var sTime = $('#startTime').val();
    var eTime = $('#endTime').val();


    $('#ssn').click(function () {
        //startSSNanalysis();
        console.info("in abcdef");
        //$("#table").find("tbody").html('');
        $.ajax({
            url: '/ssn/',
            type: 'GET',
            dataType: 'json',
            //data: {username:$("#username").val(), content:$("#content").val()},
            data : {startTime: $('#startTime').val(), endTime: $("#endTime").val()}
        }).done(function (data) {
            console.info("sssssssssssss");
            for(var i= 0 ;i <data.length;++i) {
                $("#table tbody").append("<br><p>" + "here is cluster No."+i+ "</p>");
                $("#table tbody").append("<p>");
                for (var j= 0;j <data[i].length;++j) {

                    $("#table tbody").append(
                            "&nbsp;&nbsp;" + data[i][j] + "</p>"
                    );

                }
                $("#table tbody").append("</p>");
            }
           $('#table').show();
        }).error(function (err) {
            console.log("fffffffffffff");
            console.log(err);
        });
    });


    socket.on('connect', function () {
        socket.emit('getTestStatus');
    });

    socket.on('testStatus', function (data) {
        test = data.test;
        if (test == 0) {
            $("#alert").html("Below here are all the clusters that exist");
        }
        else {
            $("#alert").html("Still need something........");
        }


        //console.log(test);
    });
}

$(document).on('ready', init);