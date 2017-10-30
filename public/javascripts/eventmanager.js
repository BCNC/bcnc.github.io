$(document).ready(function() {


    // redirects the user to log in if needed
    if(sessionStorage.getItem('userEntity') === null) {
        window.location.href = 'login';
    } else {

        var user = {};
        user = JSON.parse(sessionStorage.getItem('userEntity'));

        console.log(user.Name + " is logged in!");
    }
/*
    // load up the table
    $('#table').removeClass('table-hover');

    $(".fancybox").fancybox({
        openEffect  : 'fade',
        closeEffect : 'elastic',
        iframe : {
            preload: false
        }
    });*/


});