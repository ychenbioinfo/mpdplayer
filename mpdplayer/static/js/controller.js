$(document).ready(function () {
    $('#btn-pause').hide();
    $('#btn-repeat_one').hide();
    $('#btn-repeat').css('color', 'gray');

    $('#btn-play').click(function (e) {
        // e.preventDefault();
        console.log("play button clicked!");
        // $('#btn-play').css('color', 'red');
        $('#btn-play').hide();
        $('#btn-pause').show();
        $.ajax({
            type: 'POST',
            url: $SCRIPT_ROOT + '_play',
            contentType: false,
            processData: false,
            success: function (data) {
                console.log(data);

            },
        });
    });
    $('#btn-pause').click(function (e) {
        // e.preventDefault();
        console.log("play button clicked!");
        $('#btn-pause').hide();
        $('#btn-play').show();
        $.ajax({
            type: 'POST',
            url: $SCRIPT_ROOT + '_pause',
            contentType: false,
            processData: false,
            success: function (data) {
                console.log(data);
            },
        });
    });

    $('#btn-backward').click(function(e) {
        $.ajax({
            type: 'POST',
            url: $SCRIPT_ROOT + '_backward',
            contentType: false,
            processData: false,
            success: function (data) {
                console.log(data);
            },
        });
    });

    $('#btn-forward').click(function(e) {
        $.ajax({
            type: 'POST',
            url: $SCRIPT_ROOT + '_forward',
            contentType: false,
            processData: false,
            success: function (data) {
                console.log(data);
            },
        });
    });

    $('#btn-stop').click(function(e) {
        $.ajax({
            type: 'POST',
            url: $SCRIPT_ROOT + '_stop',
            contentType: false,
            processData: false,
            success: function (data) {
                console.log(data);
            },
        });
    });

    $('#btn-volume-up').click(function(e) {
        $.ajax({
            type: 'POST',
            url: $SCRIPT_ROOT + '_vol_up',
            contentType: false,
            processData: false,
            success: function (data) {
                console.log(data);
            },
        });
    });

    $('#btn-volume-down').click(function(e) {
        $.ajax({
            type: 'POST',
            url: $SCRIPT_ROOT + '_vol_down',
            contentType: false,
            processData: false,
            success: function (data) {
                console.log(data);
            },
        });
    });

    function update_status(data){
        $('#name').text(data.name);
    }

    function load_status(){
        $.ajax({
            type: 'POST',
            url: $SCRIPT_ROOT + '_status',
            contentType: false,
            processData: false,
            success: function (data) {
                console.log(data);
                update_status(data);
            },
        });
    }

    load_status();
    setInterval(function(){
        load_status();
    }, 1000);
});



