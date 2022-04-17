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

// show full cover image
function fullCoverImg() {
    document.getElementById("full_cover_img").classList.add("img-show");
}

// close full cover image
function closeFullCoverImg() {
    document.getElementById("full_cover_img").classList.remove("img-show");
}

// show full profile image
function fullProfileImg() {
    document.getElementById("full_profile_img").classList.add("img-show");
}

// close full profile image
function closeFullProfileImg() {
    document.getElementById("full_profile_img").classList.remove("img-show");
}

window.onclick = function(event) {
    // Close the dropdown if the user clicks outside of it
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

    // Close the dropdown if the user clicks outside of it
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

    // Close toolbar if the user clicks outside of it
    if (!event.target.matches('.hide-toolbar')) {
        var toolbar = document.getElementsByClassName("toolbar-container");
        var i;
        for (i = 0; i < toolbar.length; i++) {
            var temp = toolbar[i];
            if (temp.classList.contains('toolbar-show')) {
                temp.classList.remove('toolbar-show');
            }
        }
    }

    // Close profile cover if the user clicks outside of it
    if (!event.target.matches('.profile-cover')) {
        var img = document.getElementsByClassName("popup_cover_img");
        var i;
        for (i = 0; i < img.length; i++) {
            var temp = img[i];
            if (temp.classList.contains('img-show')) {
                temp.classList.remove('img-show');
            }
        }
    }

    // Close profile picture if the user clicks outside of it
    if (!event.target.matches('.profile-picture')) {
        var img = document.getElementsByClassName("popup_profile_img");
        var i;
        for (i = 0; i < img.length; i++) {
            var temp = img[i];
            if (temp.classList.contains('img-show')) {
                temp.classList.remove('img-show');
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