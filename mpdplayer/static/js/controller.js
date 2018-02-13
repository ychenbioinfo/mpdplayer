$(document).ready(function () {
    $('#btn-play').click(function (e) {
        // e.preventDefault();
        console.log("play button clicked!");
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
});



