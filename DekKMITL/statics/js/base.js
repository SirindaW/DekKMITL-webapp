// prevent form submit by enter key
jQuery(function($) {
    $('form').on('keydown', function(ev) {
        if (ev.key === "Enter" && !$(ev.target).is('textarea')) {
            ev.preventDefault();
        }
    });

});

// show edit post
function showEdit() {
    document.getElementById("edit_post_content").classList.toggle("edit-show");
}
// show dropdown profile
function showDropdown() {
    document.getElementById("profile_dropdown").classList.toggle("profile-show");
}

// show toolbar
function showToolbar() {
    document.getElementById("toolbar_container").classList.toggle("toolbar-show");
}
//show time select
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

//change unfollow button html text
function changeText(text) {
    var display = document.getElementById('unfollow_btn');
    display.innerHTML = "";
    display.innerHTML = text;
}

function changeBack(text) {
    var display = document.getElementById('unfollow_btn');
    display.innerHTML = "";
    display.innerHTML = text;
}

function closeDropdown(contentClass, showClass) {
    // Close the dropdown if the user clicks outside of it
    var dropdowns = document.getElementsByClassName(contentClass);
    var i;
    for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains(showClass)) {
            openDropdown.classList.remove(showClass);
        }
    }
}
window.onclick = function(event) {
    // Close the dropdown if the user clicks outside of it
    if (!event.target.matches('.edit-post-dropdown-btn')) {
        closeDropdown('edit-post-dropdown-content', 'edit-show')
    }

    // Close the dropdown if the user clicks outside of it
    if (!event.target.matches('.user-profile-navbar')) {
        closeDropdown('profile-dropdown-content', 'profile-show')
    }

    // Close the dropdown if the user clicks outside of it
    if (!event.target.matches('.time-choose-dropbtn')) {
        closeDropdown('time-choose-dropdown-content', 'time-show')
    }

    // Close toolbar if the user clicks outside of it
    if (!event.target.matches('.hide-toolbar')) {
        closeDropdown('toolbar-container', 'toolbar-show')
    }

    // Close profile cover if the user clicks outside of it
    if (!event.target.matches('.profile-cover')) {
        closeDropdown('popup_cover_img', 'img-show')
    }

    // Close profile picture if the user clicks outside of it
    if (!event.target.matches('.profile-picture')) {
        closeDropdown('popup_profile_img', 'img-show')
    }
}