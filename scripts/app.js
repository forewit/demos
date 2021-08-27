// -----------------------------
// FIREBASE AUTHENTICATION
let ui = new firebaseui.auth.AuthUI(firebase.auth());

// Auth UI configuration
var uiConfig = {
    callbacks: {
        signInSuccessWithAuthResult: function (authResult, redirectUrl) {
            // User successfully signed in.
            // Return type determines whether we continue the redirect automatically
            // or whether we leave that to developer to handle.
            return false;
        },
        uiShown: function () {
            // The widget is rendered.
            // Hide the loader.
            document.getElementById('loader').style.display = 'none';
        }
    },
    // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    signInFlow: 'popup',
    //signInSuccessUrl: 'app.canvas.gg',
    signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        //firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        //firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        //firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        firebase.auth.GithubAuthProvider.PROVIDER_ID,
        //firebase.auth.EmailAuthProvider.PROVIDER_ID,
        //firebase.auth.PhoneAuthProvider.PROVIDER_ID
    ],
    // Terms of service url.
    tosUrl: '<your-tos-url>',
    // Privacy policy url.
    privacyPolicyUrl: '<your-privacy-policy-url>'
};

// The start method will wait until the DOM is loaded.
ui.start('#firebaseui-auth-container', uiConfig);



// -----------------------------
// FIREBASE USER PROFILE
var user = firebase.auth().currentUser;
// user.displayName
// user.email
// user.uid



// -----------------------------
// RANDOMIZED SVG Curves
// How to write SVG path: https://css-tricks.com/svg-path-syntax-illustrated-guide/
function wave(svg, duration, frequency, amplitude, flipped = false) {
    let path = svg.querySelector("path");
    let animate = path.querySelector("animate");
    
    // prevent multiple animations
    if (svg.classList.contains("playing")) return;

    // define starting point
    let d = (flipped) ? 'M0,2' : 'M0,-1';
    d += `L0,${Math.random() * amplitude}`;

    let x1, x2, y1, y2;

    for (var i = 0; i < frequency; i++) {
        // define bezier handle and point
        x1 = 0.5 + i * 2;
        y1 = Math.random() * amplitude;
        x2 = 1.5 + i * 2;
        y2 = Math.random() * amplitude;
        d += `S${x1},${y1},${x2},${y2}`;
    }

    // define last bezier handle and point
    x1 = 0.5 + frequency * 2;
    y1 = Math.random() * amplitude;
    x2 = 1 + frequency * 2;
    y2 = Math.random() * amplitude;
    d += `S${x1},${y1},${x2},${y2}`

    // define ending point
    d += (flipped) ? `L${x2},2Z` : `L${x2},-1Z`;

    // set SVG attributes
    svg.classList.add("playing");

    svg.setAttribute("viewBox", `0,-1,${frequency * 2 + 1},3`);

    let from = animate.getAttribute("to");
    animate.setAttribute("from", from);
    animate.setAttribute("to", d);
    animate.setAttribute("dur", `${duration / 1000}s`)

    animate.beginElement();

    setTimeout(() => { 
        path.setAttribute("d", d);
        svg.classList.remove("playing");
     }, duration - 10);
}

// Create page top curve
let topSVG = document.querySelector("#top-curve svg");

// create page bottom curve
let bottomSVG = document.querySelector("#bottom-curve svg");


// -----------------------------
// DEBOUNCED RESIZE EVENT
var rtime;
var timeout = false;
var delta = 200;
window.addEventListener('resize', function () {
    rtime = new Date();
    if (timeout === false) {
        timeout = true;
        setTimeout(resizeend, delta);
    }
});

function resizeend() {
    if (new Date() - rtime < delta) {
        setTimeout(resizeend, delta);
    } else {
        timeout = false;

        // Resize finished
        wave(bottomSVG, 2000, 3, 0.7, true)

        wave(topSVG, 2000, 7, 1);
    }
}


// -----------------------------
// TOGGLE OPTIONS MENU
function openOptionsMenu() {
    document.getElementById("options-menu").classList.add("open");
    document.getElementById("overlay").classList.add("open");
}
function closeOptionsMenu() {
    document.getElementById("options-menu").classList.remove("open");
    document.getElementById("overlay").classList.remove("open");
}