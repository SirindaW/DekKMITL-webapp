// prevent form submit by enter key
jQuery(function($) {
    $('form').on('keydown', function(ev) {
        if (ev.key === "Enter" && !$(ev.target).is('textarea')) {
            ev.preventDefault();
        }
    });

});

//change unfollow button html text
function changeText(text, textID) {
    var display = document.getElementById(textID);
    display.innerHTML = "";
    display.innerHTML = text;
}

//add class
function addClass(objID, classID) {
    document.getElementById(objID).classList.add(classID);
}

//remove class
function removeClass(objID, classID) {
    document.getElementById(objID).classList.remove(classID);
}

//toggle class
function toggleClass(objID, classID) {
    document.getElementById(objID).classList.toggle(classID);
}

// add and remove at same time
function changeClass(objID, classAdd, classRemove) {
    document.getElementById(objID).classList.add(classAdd);
    document.getElementById(objID).classList.remove(classRemove);
}

//close dropdown
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