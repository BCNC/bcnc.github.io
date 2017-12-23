//Using: https://github.com/chingyawhao/materialize-clockpicker/
$('.timepicker').pickatime({
    default: 'now', // Set default time: 'now', '1:30AM', '16:30'
    fromnow: 0,       // set default time to * milliseconds from now (using with default = 'now')
    twelvehour: true, // Use AM/PM or 24-hour format
    donetext: 'OK', // text for done-button
    cleartext: 'Clear', // text for clear-button
    canceltext: 'Cancel', // Text for cancel-button
    autoclose: false, // automatic close timepicker
    ampmclickable: true, // make AM PM clickable
    aftershow: function(){} //Function for after opening timepicker
});


$('.datepicker').pickadate({
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 15, // Creates a dropdown of 15 years to control year,
    format: 'yyyy/mm/dd',
    formatSubmit: 'yyyy/mm/dd',
    today: 'Today',
    clear: 'Clear',
    close: 'Ok',
    closeOnSelect: false // Close upon selecting a date,
});

// called from button on event manager page
function eventsubmit() {

    console.log("Submitting event...");
    var eventname = $('#eventname').val().trim();
    var link = $('#link').val().trim();
    var date = $('#date').val().trim();
    var time = $('#time').val().trim();
    var org = $('#org').val().trim();
    var eventdescription = $('#event_description').val().trim();

    // make sure all the fields are fields are filled out
    if (eventname != '' && link != '' && date != '' && time != '' && org != '' && eventdescription != '') {

        console.log("All fields are good! Uploading event to database");

        $.ajax({
            type: "POST",
            url: '/eventsubmit',
            data: {
                'eventname': eventname,
                'link': link,
                'date': date,
                'time': time,
                'org': org,
                'eventdescription': eventdescription
            },
            success: function(resp) {
                $('#eventname').val('');
                $('#link').val('');
                $('#date').val('');
                $('#time').val('');
                $('#org').val('');
                $('#eventdescription').val('');
                window.location = '/eventsuccess';
            }
        });
    }
    else {
        alert("You must fill out all fields");
    }
}

$(document).ready(function() {

    $('select').material_select();

    $('.datepicker').pickadate({
        selectMonths: true, // Creates a dropdown to control month
        selectYears: 15 // Creates a dropdown of 15 years to control year
    });

    /* Disable button until all fields are filled out */
    $('form').keyup(function() {

        console.log("Key up!");
        var eventname = $('#eventname').val().trim();
        var link = $('#link').val().trim();
        var date = $('#date').val().trim();
        var time = $('#time').val().trim();
        var org = $('#org').val().trim();
        var eventdescription = $('#event_description').val().trim();

        if (eventname != '' && link != '' && date != '' && time != '' && org != '' && eventdescription != '') {
            $('#submit').removeClass('disabled');
        }
        else {
            $('#submit').addClass('disabled')
        }
    });
});