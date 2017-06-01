/*
   var retrieve = function(id) {
   var link = '/resume?filename=' + id;
   window.open(link);
   document.getElementById('ifram1').src = link;

   $.ajax({
   type: "GET",
   url: '/resume',
   data: {
   'filename': id
   },
   success: function(resp) {
   window.open('/resume?filename=' + id);
//window.open('http://stackoverflow.com/', '_blank');

//window.open("data:application/pdf," + encodeURI(resp)); 
//console.log('done');
}
});
};*/
var accept = function(id) {
    // deliberate with yes
    $.ajax({
        url: '/deliberate',
        type: 'POST',
        data: {'id': id,
            'accept': 1},
            success: function(result) {
                // change the color of the row
                if (result > 0) {
                    document.getElementById(id).setAttribute('class', 'accept');
                }
                else {
                    document.getElementById(id).setAttribute('class', 'reject');
                }
            }
    });
}
var reject = function(id) {
    // deliberate with no
    $.ajax({
        url: '/deliberate',
        type: 'POST',
        data: {
            'id': id,
            'accept': 2
        },
        success: function(result) {
            // change the color of the row
            if (result > 0) {
                document.getElementById(id).setAttribute('class', 'accept');
            }
            else {
                document.getElementById(id).setAttribute('class', 'reject');
            }
        }
    });
};

$(document).ready(function() {
    $('#table').removeClass('table-hover');

    $(".fancybox").fancybox({
        openEffect  : 'fade',
        closeEffect : 'elastic',
        iframe : {
            preload: false
        }
    });
});

