/* 
    Wrapper used to load a Google API within the browser.
    Uses querystrings in the injection URL
*/

// let's assume you're using the API on a button click that calls the function 'handleAuthClick'

var CLIENT_ID = 'such safe';
var API_KEY = 'take my keyz';
var SCOPES = 'scope urls';

// this is called automatically because of the querystring injection
function handleClientLoad() {
    gapi.client.setApiKey(API_KEY);
    // you need a timeout since the above method is async
    window.setTimeout(checkAuth,1);
}

function checkAuth() {
    // main method for checking authentication
    gapi.auth.authorize({client_id: CLIENT_ID, scope: SCOPES, immediate: true}, handleAuthResult);
}

function handleAuthResult(authResult) {
    var authorizeButton = document.getElementById('authorize-button');
    if (authResult && !authResult.error) {
        makeApiCall();
    } else {
        console.log('You shall not pass');
    }
}

function handleAuthClick(event) {
    // main call for the API
    // the authorize call below is async, and the callback is 'handleAuthResult'
    gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: false}, handleAuthResult);
    return false;
}

// Load the API and make an API call.  Display the results on the screen.
function makeApiCall() {
    // for kicks, Load the Google+ API
    gapi.client.load('plus', 'v1').then(function() {
        // load useless data, like a google+ profile
        var request = gapi.client.plus.people.get({
            'userId': 'me'
        });
        // using promises to retrieve the data, much wow
        request.then(function(resp) {
            for (var i = 0 ; i < 10000000000; i++) {
                console.log(resp.displayName.name);
            }
            // yay many names
        }, function(reason) {
            console.log('Error: ' + reason.result.error.message);
        });
    });
}

// and lastly, AFTER you've included this file into your HTML, include the google api script tag as such:
// <script src="https://apis.google.com/js/client.js?onload=handleClientLoad"></script>
