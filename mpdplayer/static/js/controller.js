$(document).ready(function () {
    var timer = null;
    var sync_interval = 2000;
    var enable_color = '#256298';
    // mpd_mode === 0 when stopped
    var mpd_mode = 0;
    var first_load = 1;

    $('#btn-play').click(function (e) {
        play_mode();
        mpd_mode = 1;
        $.ajax({
            type: 'POST',
            url: $SCRIPT_ROOT + '_play',
            contentType: false,
            processData: false,
            success: function (data) {
                update_status(data);
            },
        });
    });
    $('#btn-pause').click(function (e) {
        // e.preventDefault();
        // console.log("play button clicked!");
        pause_mode();
        mpd_mode = 1;
        $.ajax({
            type: 'POST',
            url: $SCRIPT_ROOT + '_pause',
            contentType: false,
            processData: false,
            success: function (data) {
                update_status(data);
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
                update_status(data);
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
                update_status(data);
            },
        });
    });

    $('#btn-stop').click(function(e) {
        stop_mode();
        mpd_mode = 0;
        $.ajax({
            type: 'POST',
            url: $SCRIPT_ROOT + '_stop',
            contentType: false,
            processData: false,
            success: function (data) {
                update_status(data);
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
                update_status(data);
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
                update_status(data);
            },
        });
    });


    $('#btn-shuffle').click(function(e) {
        $.ajax({
            type: 'POST',
            url: $SCRIPT_ROOT + '_shuffle',
            contentType: false,
            processData: false,
            success: function (data) {
                // console.log(data);
                update_status(data);
            },
        });
    });


    $('#btn-repeat').click(function(e) {
        $.ajax({
            type: 'POST',
            url: $SCRIPT_ROOT + '_repeat',
            contentType: false,
            processData: false,
            success: function (data) {
                update_status(data);
            },
        });
    });


    $('#btn-single').click(function(e) {
        $.ajax({
            type: 'POST',
            url: $SCRIPT_ROOT + '_single',
            contentType: false,
            processData: false,
            success: function (data) {
                update_status(data);
            },
        });
    });

    $('.music_play').click(function(e) {
        var parent = $(e.target).closest('.play-group').html();
        var index = $(parent).children("span");
        play_mode();
        $.ajax({
            type: 'POST',
            url: $SCRIPT_ROOT + '_play_index',
            data: JSON.stringify({'index': index.text()}),
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                update_status(data);
            },
        });
    });


    function change_button_status(button, status) {
        if(status === 0){
            $(button).css('color', 'gray');
        }
        else{
            $(button).css('color', enable_color);
        }
    }

    function update_settings(data) {
        if(data.shuffle === 0){
            // console.log("update shuffle");
            change_button_status($('#btn-shuffle'), 0);
        }
        else{
            change_button_status($('#btn-shuffle'), 1);
        }

        if(data.single === 0){
            change_button_status($('#btn-single'), 0);
        }
        else{
            change_button_status($('#btn-single'), 1);
        }

        if(data.repeat === 0){
            change_button_status($('#btn-repeat'), 0);
        }
        else{
            change_button_status($('#btn-repeat'), 1);
        }
    }

    function play_mode(){
        // console.log("call play mode");
        $('#btn-play').hide();
        $('#btn-pause').show();
        $('#btn-backward').css('color', enable_color);
        $('#btn-backward').attr('href', '#');
        $('#btn-forward').css('color', enable_color);
        $('#btn-forward').attr('href', '#');
        start_sync();
    }

    function pause_mode() {
        $('#btn-play').show();
        $('#btn-pause').hide();
        $('#btn-backward').css('color', enable_color);
        $('#btn-backward').attr('href', '#');
        $('#btn-forward').css('color', enable_color);
        $('#btn-forward').attr('href', '#');
        stop_sync();
    }

    function stop_mode() {
        // console.log("call stop mode");
        $('#btn-play').show();
        $('#btn-pause').hide();
        $('#btn-backward').css('color', 'gray');
        $('#btn-backward').removeAttr('href');
        $('#btn-forward').css('color', 'gray');
        $('#btn-forward').removeAttr('href');
        $('#play_percentage').val(0);
        stop_sync();
    }


    function update_status(data){
        if(first_load === 1){
            if(data.mode === 0){
                stop_mode();
                mpd_mode = 0;
            }
            else{
                if(data.play_mode == 0){
                    pause_mode();
                }
                else{
                    play_mode();
                }
                mpd_mode = 1;
            }
            first_load = 0;
        }

        update_settings(data);
        if(data.mode === 0){
            $('#play_percentage').val(0);
        }
        else {
            $('#name').text(data.play_num + ". " + data.name);
            $('#play_percentage').val(data.percentage);
        }

        $('#volume').text('Volume: ' + data.volume);

        $('#volume-percentage').val(data.volume);
    }

    function load_status(){
        // console.log("load status");
        $.ajax({
            type: 'POST',
            url: $SCRIPT_ROOT + '_status',
            contentType: false,
            processData: false,
            success: function (data) {
                // console.log(data);
                update_status(data);
            },
        });
    }

    load_status();

    function start_sync() {
        // console.log("Call start sync");
        if(timer === null) {
            timer = setInterval(function () {
                load_status();
            }, sync_interval);
        };
    }

    function stop_sync() {
        clearInterval(timer);
        timer = null;
    }

});



