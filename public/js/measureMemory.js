/**
 * Created by Admin on 2014/10/14.
 */
function init() {
    var serverBaseUrl = document.domain;

    var socket = io.connect(serverBaseUrl);

    var test;





    function startMeasureMemory() {
        $.ajax({
            url: '/start',
            type: 'POST',
            dataType: 'json'
        }).done(function (data) {
            console.info("Start Memory Monitor request Sent");
        });
    }

    function stopMeasureMemory() {
        $.ajax({
            url: '/stop',
            type: 'POST',
            dataType: 'json'
        }).done(function (data) {
            console.info("Stop Memory Monitor request Sent");
        });
    }

    function deleteMeasureMemoryHistory() {
        $.ajax({
            url: '/delete',
            type: 'DELETE',
            dataType: 'json'
        }).done(function (data) {
            console.info("Delete Measure Memory History request Sent");
        });
    }

    $('#start').click(function () {
        socket.emit('getTestStatus');
        if (test == 0) {
            startMeasureMemory();
            $('#alert').text("Memory Monitor Started....");
            $('#alert').show();
            $('#table').hide();
            test = 1;
            socket.emit('updateTestStatus', {test: test});
        }
        else {
            alert("Measure Memory Testing already in progress!!!!!");
        }
    });

    $('#stop').click(function () {
        if (test == 1) {
            stopMeasureMemory();
            $('#alert').text("Memory Monitor Stopped....");
            $('#alert').show();
            $("#table").find("tbody").html('');
            $.ajax({
                url: '/getMeasureMemoryStats',
                type: 'GET',
                dataType: 'json'
            }).done(function (data) {
                console.log(data.length);
                for (var i = 0; i < data.length; i++) {
                    $("#table tbody").append("<tr><td>" + data[i].createdAt + "</td>"
                        + "<td>" + data[i].usedVolatile + "</td>"
                        + "<td>" + data[i].remainingPersistent + "</td>"
                        + "<td>" + data[i].remainingVolatile + "</td>"
                        + "<td>" + data[i].usedPersistent + "</td></tr>");
                }
                $('#table').show();
            });
            test = 0;
            socket.emit('updateTestStatus', {test: test});
        }
        else {
            alert("No Measure Memory Usage tests running to STOP!!!!!");
        }

    });
    $('#delete').click(function () {
        if(test == 0) {
            deleteMeasureMemoryHistory();
            $('#alert').text("Measured Memory History Deleted....");
            $('#alert').show();
            $('#table').hide();
        }
        else
        {
            alert("Measure Memory Usage test running........");
        }
    });

    $('#view').click(function () {
        $("#table").find("tbody").html('');
        $.ajax({
            url: '/getMeasureMemoryStats',
            type: 'GET',
            dataType: 'json'
        }).done(function (data) {
            console.log(data.length);
            for (var i = 0; i < data.length; i++) {
                $("#table tbody").append("<tr><td>" + data[i].createdAt + "</td>"
                    + "<td>" + data[i].usedVolatile + "</td>"
                    + "<td>" + data[i].remainingPersistent + "</td>"
                    + "<td>" + data[i].remainingVolatile + "</td>"
                    + "<td>" + data[i].usedPersistent + "</td></tr>");
            }
            $('#table').show();
        });
    })


    socket.on('connect', function () {
        socket.emit('getTestStatus');
    });

    socket.on('testStatus', function (data) {
        test = data.test;
        if (test == 0) {
            $("#alert").html("No Measure Memory Usage Test Running!!!!!!");
        }
        else {
            $("#alert").html("Measure Memory Testing Running........");
        }


        console.log(test);
    });
}

$(document).on('ready', init);