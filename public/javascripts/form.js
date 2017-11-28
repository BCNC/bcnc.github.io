
// store filename that was used on serverside on client side for linking between initial upload and final submit
var resp_filename;
var filecount;

// called from button on form page
function submit() {

    console.log("Submitting...");
    var first = $('#firstname').val().trim();
    var last = $('#lastname').val().trim();
    var phone = $('#phone').val().trim();
    var email = $('#email').val().trim();
    var pos = [];
    var school = "University of California, Davis (UCD)";
    var year = $('#year').val().trim();
    var major = $('#major').val().trim();
    var q1 = $('#q1').val().trim();
    var q2 = $('#q2').val().trim();
    var refer = $('#refer').val().trim();

    console.log("Referred by: " + refer);

    $.each($('#position option:selected'), function(){
        pos.push($(this).val());
    });

    pos.sort();

    var position = JSON.stringify(pos);

    // make sure all the fields are fields are filled out
    if (first != '' && last != '' && phone != '' && email != '' && year != '' && major != '' && q1 != '' && q1 != '' && filecount != 0) {

        console.log("All fields are good! Uploading to database");

        $.ajax({
            type: "POST",
            url: '/submit',
            data: {
                'firstname': first,
                'lastname': last,
                'telephone': phone,
                'email': email,
                'year': year,
                'major': major,
                'position': position,
                'q1': q1,
                'q2': q2,
                'refer': refer,
                'school': school,
                'filename': resp_filename

            },
            success: function(resp) {
                $('#firstname').val('');
                $('#lastname').val('');
                $('#phone').val('');
                $('#email').val('');
                $('#position').val('');
                $('#school').val('');
                $('#year').val('');
                $('#refer').val('');
                window.location = '/thankyou';
            }
        });
    }
    else {
        alert("You must fill out all fields");
    }
}


$(document).ready(function() {
    filecount = 0;
    $('select').material_select();

    $('.datepicker').pickadate({
        selectMonths: true, // Creates a dropdown to control month
        selectYears: 15 // Creates a dropdown of 15 years to control year
    });

    $('#upload2').change(function() {
        $('#display span').text('UPLOADING...');
        var data = new FormData();
        data.append('file', this.files[0]);
        $.ajax({
            url: '/upload',
            type: 'POST',
            data: data,
            processData: false,
            contentType: false,
            success: function(resp) {
                // store filename for when user finally submit's whole application
                resp_filename = resp;

                // notify user of status
                $('#display span').text('UPLOADED');

                // prevent further uploading
                $('#display').click(function(event) {
                    event.preventDefault();
                });

                // store filename for when user finally submit's whole application
                resp_filename = file.xhr.responseText;
                filecount = filecount + 1;

                // enable button if all fields are filled out
                var first = $('#firstname').val().trim();
                var last = $('#lastname').val().trim();
                var phone = $('#phone').val().trim();
                var email = $('#email').val().trim();
                if (first != '' && last != '' && phone != '' && email != '' && filecount != 0) {
                    $('#submit').removeClass('disabled');
                }
                else {
                    $('#submit').addClass('disabled');
                }
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                $('#display span').text("UPLOAD FAILED");
            }
        });
    });

    $('input#school').autocomplete({
        data: {
            "University of California, Davis (UCD)": 'http://logos.statbroadcast.com/ucd.png',
            "University of California, Berkeley (UCB)": 'https://s-media-cache-ak0.pinimg.com/736x/e8/2e/62/e82e62e6f6713935e5c5bdab3d4dac2c.jpg',
            "University of California, Los Angeles (UCLA)": null,
            "University of California, San Diego (UCSD)": null,
            "University of California, Santa Barbara (UCSB)": null,
            "University of California, Irvine (UCI)": null,
            "University of California, Santa Cruz (UCSC)": null,
            "California State University, San Jose (SJSU)": null,
            "California Polytechnic State University, SLO (CalPoly)": null,
            "Stanford": null,
            "Princeton": null,
            "Massachusetts Institute of Technology (MIT)": null,
            "California Institute of Technology (CalTech)": null,
            "Other": null
        }
    });

    Dropzone.options.d1 = {
        init: function() {
            this.on("addedfile", function(file) {
                //filecount = filecount + 1;
            });
            this.on("success", function(file) {
                // store filename for when user finally submit's whole application
                resp_filename = file.xhr.responseText;
                filecount = filecount + 1;

                // enable button if all fields are filled out
                var first = $('#firstname').val().trim();
                var last = $('#lastname').val().trim();
                var phone = $('#phone').val().trim();
                var email = $('#email').val().trim();
                if (first != '' && last != '' && phone != '' && email != '' && filecount != 0) {
                    $('#submit').removeClass('disabled');
                }
                else {
                    $('#submit').addClass('disabled');
                }
            });
            this.on("removedfile", function(file){
                if (resp_filename != ''){
                    $.ajax({
                        type: 'POST',
                        url: '/remove',
                        data: {
                            'filename': resp_filename,
                        },
                        success: function(resp) {
                            filecount = filecount - 1;
                            console.log("deleted");
                            resp_filename = '';
                            /* Disable submit button */
                            var first = $('#firstname').val().trim();
                            var last = $('#lastname').val().trim();
                            var phone = $('#phone').val().trim();
                            var email = $('#email').val().trim();
                            if (first != '' && last != '' && phone != '' && email != '' && filecount != 0) {
                                $('#submit').removeClass('disabled');
                            }
                            else {
                                $('#submit').addClass('disabled');
                            }
                        }
                    });
                }
            });
        },
        paramName: "file", // The name that will be used to transfer the file
        maxFilesize: 2, // MB
        accept: function(file, done) {
            if (file.name == "justinbieber.jpg") {
                done("Naha, you don't.");
            }
            else { done(); }
        },
        maxFiles: 1,
        dictDefaultMessage: 'Drop your resume here',
        autoProcessQueue: true,
        dictFallbackMessage: "Your browser doesn't support drag n' drop uploads.",
        forceFallback: false,
        acceptedFiles: 'image/*,application/pdf',
                               addRemoveLinks: true
                               };

    /* Disable button until all fields are filled out */
    $('form').keyup(function() {
        var first = $('#firstname').val().trim();
        var last = $('#lastname').val().trim();
        var phone = $('#phone').val().trim();
        var email = $('#email').val().trim();
        if (first != '' && last != '' && phone != '' && email != '' && filecount != 0) {
            $('#submit').removeClass('disabled');
        }
        else {
            $('#submit').addClass('disabled')
        }
    });
});
