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
//display class
function displayClass(objID) {
    document.getElementById(objID).style.display = "block";
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
// --------------create post------------------

//var for enable disable submit
var header, body,
    room = false,
    unsetTime = false,
    setTime = false;
//เช็คถ้าเลข < 10 ใส่ 0 ข้างหน้า 
function checkOnesNum(num) {
    if (num < 10) {
        num = '0' + num;
    }
    return num;
}
//รวมวันที่เต็ม
function getFullDate(date) {
    var day = date.getDate();
    var month = date.getMonth() + 1; //January is 0!
    var year = date.getFullYear();
    var hour = date.getHours();
    var minute = date.getMinutes();

    day = checkOnesNum(day);
    month = checkOnesNum(month);
    hour = checkOnesNum(hour);
    minute = checkOnesNum(minute);
    return year + '-' + month + '-' + day + 'T' + hour + ":" + minute;
}
//disable submit form button ถ้ากรอกข้อมูลที่จำเป็นไม่ครบ
function buttonAble(buttonID) {
    if (header && body && room && (unsetTime || setTime)) {
        document.getElementById(buttonID).disabled = false;
    } else {
        document.getElementById(buttonID).disabled = true;
    }
}
//disable report button ถ้ากรอกข้อมูลไม่ครบ
var canSubmit;

function buttonReportAble(buttonID) {
    if (canSubmit) {
        document.getElementById(buttonID).disabled = false;
    } else {
        document.getElementById(buttonID).disabled = true;
    }
}
//function count word
function countWord(val) {
    var wom = val.match(/.+/g);
    var len = 0;
    if (wom) {
        len = wom[0].length;
    }
    return len;
}
//limit text and button disable enable
function limitText(textID, showID, min, max) {
    var len = countWord(textID.value);
    var check;
    if (showID) {
        showID.innerHTML = String(len) + "/" + String(max);
        if (len > max || (len < min && len != 0)) {
            showID.classList.add("overflow-text");
        } else {
            showID.classList.remove("overflow-text");
        }
    }
    //---------------enable disable submit button-------------
    if (len > max || len < min) {
        check = false;
    } else {
        check = true;
    }
    return check;
}
//limit min text 
function limitMinText(textID, min) {
    var len = countWord(textID.value);
    var check;
    //---------------enable disable submit button-------------
    if (len < min) {
        check = false;
    } else {
        check = true;
    }
    return check;
}
//remove special text on keyboard only
function removeSpChar(text) {
    return text.replace(/[&\/\\#^+()$~%.'":;, ฿=_\-*?\n<>{}!@`\[\]|]/g, '');
}

//limit tag text
function countTag() {
    var tagLen = 0;
    let tag = document.querySelectorAll('.post-tag');
    if (tag) {
        tagLen = tag.length;
    }
    return tagLen;
}

//---------------- Tags suggestion ---------------  
function autocomplete(inp, arr) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function(e) {
        var a, b, i, val = this.value;
        val = removeSpChar(val);
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) {
            return false;
        }
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
            /*check if the item starts with the same letters as the text field value:*/
            if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                /*create a DIV element for each matching element:*/
                b = document.createElement("DIV");
                /*make the matching letters bold:*/
                b.innerHTML = arr[i].substr(0, val.length);
                b.innerHTML += arr[i].substr(val.length);
                /*insert a input field that will hold the current array item's value:*/
                b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                /*execute a function when someone clicks on the item value (DIV element):*/
                b.addEventListener("click", function(e) {
                    /*insert the value for the autocomplete text field:*/
                    inp.value = this.getElementsByTagName("input")[0].value;
                    /*close the list of autocompleted values,
                    (or any other open lists of autocompleted values:*/
                    closeAllLists();
                });
                a.appendChild(b);
            }
        }
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function(e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
            /*If the arrow DOWN key is pressed,
            increase the currentFocus variable:*/
            currentFocus++;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 38) { //up
            /*If the arrow UP key is pressed,
            decrease the currentFocus variable:*/
            currentFocus--;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 13) {
            /*If the ENTER key is pressed, prevent the form from being submitted,*/
            e.preventDefault();
            if (currentFocus > -1) {
                /*and simulate a click on the "active" item:*/
                if (x) x[currentFocus].click();
            }
        }
    });

    function addActive(x) {
        /*a function to classify an item as "active":*/
        if (!x) return false;
        /*start by removing the "active" class on all items:*/
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        /*add class "autocomplete-active":*/
        x[currentFocus].classList.add("autocomplete-active");
    }

    function removeActive(x) {
        /*a function to remove the "active" class from all autocomplete items:*/
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }

    function closeAllLists(elmnt) {
        /*close all autocomplete lists in the document,
        except the one passed as an argument:*/
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }
    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function(e) {
        closeAllLists(e.target);
    });
}

//preview image function
function previewImg(inputImg, outputImg) {
    let input = document.querySelector(inputImg);
    let preview = document.querySelector(outputImg);
    const [file] = input.files;
    var tmp_path = URL.createObjectURL(file);
    if (file) {
        preview.src = tmp_path;
    }
}

// -----------------------search--------------------------
//search not found display 
function displayCheck(tableID, notfoundID) {
    var notfound = document.getElementById(notfoundID);
    var table = document.getElementById(tableID);
    var tr = table.getElementsByTagName("tr");
    var display = true;
    for (i = 0; i < tr.length; i++) {
        if (tr[i].style.display == '') {
            display = false;
        }
    }
    if (display) {
        notfound.style.display = "flex";
    } else {
        notfound.style.display = "none";
    }

}

//search
function search(notfoundID, inputID, tableID, checkRow) {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById(inputID);
    filter = input.value.toUpperCase();
    table = document.getElementById(tableID);
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[checkRow];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
    displayCheck(tableID, notfoundID);
}

// ------------back to top button-------------

function scrollFunction() {
    var backtopBtn = document.getElementById('back_to_top');
    if (backtopBtn) {
        if (document.documentElement.scrollTop > 50) {
            backtopBtn.style.width = "75px"
        } else {
            backtopBtn.style.width = "0px"
        }
    }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    document.documentElement.scrollTop = 0;
}

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {
    scrollFunction();
};

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