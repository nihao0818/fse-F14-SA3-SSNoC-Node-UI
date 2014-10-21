/**
 * Created by Admin on 2014/10/14.
 */
function init() {
    var serverBaseUrl = document.domain;

    var socket = io.connect(serverBaseUrl);

    $('#ssn').click(function () {
        console.info("in abcdef");
        //location.reload();
        $.ajax({
            url: '/ssn/',
            type: 'GET',
            dataType: 'json',
            data : {startTime: ($('#startTime').val() == "" ? "infinite" : $('#startTime').val()), endTime: ($('#endTime').val() == "" ? "infinite" : $('#endTime').val())}
        }).done(function (data) {
            $('#table').show();

            console.info("Data Received");
            for(var i= 0 ;i <data.length;++i) {
                $("#table tbody").append("<tr><td><b>" + "CLUSTER No."+i+ "</b></td></tr>");
                //$("#table tbody").append("<p>");
                for (var j= 0;j <data[i].length;++j) {
                    $("#table tbody").append("<tr><td>&nbsp;&nbsp;" + data[i][j] + "</td></tr>");
                }
                //$("#table tbody").append("</p>");
            }
            //$('#table').hide();
        }).error(function (err) {
            console.log("Here is an err");
            console.log(err);
        });
    });


    socket.on('connect', function () {
        socket.emit('getTestStatus');
    });

    socket.on('testStatus', function (data) {
        test = data.test;
        if (test == 0) {
            $("#alert").html("Type in and Click Button Above\nInfinite Time Duration by Default");
        }
        else {
            $("#alert").html("Still need something........");
        }

    });
}

$(document).on('ready', init);