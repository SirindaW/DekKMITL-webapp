// show dropdown profile
function showDropdown() {
    document.getElementById("profile_dropdown").classList.toggle("profile-show");
}

// show dropdown choose time
function myFunction() {
    document.getElementById("time_choose_dropdown").classList.toggle("time-choose-show");
}

// show search
function showSearch() {
    document.getElementById("mysearch").classList.toggle("search-show");
}

// show search
function showToolbar() {
    document.getElementById("toolbar_container").classList.toggle("toolbar-show");
    document.getElementById("already_login").classList.toggle("already-login-show");
    // document.getElementById("login_frame").classList.toggle("login-show");
}
// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
    if (!event.target.matches('.user-profile-navbar')) {
        var dropdowns = document.getElementsByClassName("profile-dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('profile-show')) {
                openDropdown.classList.remove('profile-show');
            }
        }
    }
    if (!event.target.matches('.time-choose-dropbtn')) {
        var dropdowns = document.getElementsByClassName("time-choose-dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('time-choose-show')) {
                openDropdown.classList.remove('time-choose-show');
            }
        }
    }
    if (!event.target.matches('.btn-search') && !event.target.matches('.input-search')) {
        var dropdowns = document.getElementsByClassName("input-search");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('search-show')) {
                openDropdown.classList.remove('search-show');
            }
        }
    }
    if (!event.target.matches('.hide-toolbar')) {
        var dropdowns = document.getElementsByClassName("toolbar-container");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('toolbar-show')) {
                openDropdown.classList.remove('toolbar-show');
            }
        }
    }
}

// search script
// var input = document.getElementById("mysearch");
//     input.addEventListener("keyup", function(event) {
//         if (event.keyCode === 13) {
//             event.preventDefault();
//             var q = input.value
//             location.replace(q)
//         }
//     });