// show dropdown profile
function showDropdown() {
    document.getElementById("profile_dropdown").classList.toggle("profile-show");
}

// show toolbar
function showToolbar() {
    document.getElementById("toolbar_container").classList.toggle("toolbar-show");
}

function showTime() {
    document.getElementById("time_choose_dropdown").classList.toggle("time-show");
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
            if (openDropdown.classList.contains('time-show')) {
                openDropdown.classList.remove('time-show');
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