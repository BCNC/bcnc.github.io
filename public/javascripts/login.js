function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.


    var userEntity = {};
    userEntity.Id = profile.getId();
    userEntity.Name = profile.getName();
    userEntity.email = profile.getEmail();

    sessionStorage.setItem('userEntity', JSON.stringify(userEntity));


};

function onSignOut() {
    console.log('yay');
    alert('signing out');
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });

    sessionStorage.clear();

};
