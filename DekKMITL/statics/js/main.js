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
//disable button ถ้ากรอกข้อมูลที่จำเป็นไม่ครบ
function buttonAble() {
    if (header && body && room && (unsetTime || setTime)) {
        document.getElementById("submit_form").disabled = false;
    } else {
        document.getElementById("submit_form").disabled = true;
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
    showID.innerHTML = String(len) + "/" + String(max);
    if (len > max || (len < min && len != 0)) {
        showID.classList.add("overflow-text");
    } else {
        showID.classList.remove("overflow-text");
    }
    //---------------enable disable submit button-------------
    if (len > max || len < min) {
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

//----------------limit header text---------------------
var headerTextContent = document.getElementById("header_text");
var headerShowWordCount = document.getElementById("header_count");


//ค่าเริ่มต้น
header = limitText(headerTextContent, headerShowWordCount, 4, 120);


headerTextContent.addEventListener("input", function() {
    header = limitText(headerTextContent, headerShowWordCount, 4, 120);
    buttonAble()
});


//----------------limit body text---------------------
var bodyTextContent = document.getElementById("body_text");
var bodyShowWordCount = document.getElementById("body_count");


//ค่าเริ่มต้น
body = limitText(bodyTextContent, bodyShowWordCount, 6, 4000);


bodyTextContent.addEventListener("input", function() {
    body = limitText(bodyTextContent, bodyShowWordCount, 6, 4000);
    buttonAble()
});
//---------------tag--------------------
var TagTextContent = document.getElementById("tag_input");
var TagShowWordCount = document.getElementById("tag_count");
let container = document.querySelector('.all-tag')
var tagList = document.getElementById('tag_list');
tagList.value = '';


//ค่าเริ่มต้น
limitText(TagTextContent, TagShowWordCount, 0, 50);


//limit tag text
function countTag() {
    var tagLen = 0;
    let tag = document.querySelectorAll('.post-tag');
    if (tag) {
        tagLen = tag.length;
    }
    return tagLen;
}
TagTextContent.addEventListener("input", function() {
    limitText(TagTextContent, TagShowWordCount, 0, 50);
    TagTextContent.value = TagTextContent.value.substring(0, 49);
});

//submit tag
TagTextContent.addEventListener('keyup', (event) => {
    TagTextContent.classList.remove('no-sp-text');
    if ((event.which == 32 || event.which == 13) && TagTextContent.value.length > 0) { //spacebar or enter to add tag
        var p = document.createElement('p');
        var text = removeSpChar(TagTextContent.value);
        tagLen = countTag();

        //add tag
        if (text && tagLen < 10) {
            TagShowWordCount.innerHTML = "0/50";

            //keep value to backend
            tagList.value += text + ',';

            text = '#' + text;
            var text_node = document.createTextNode(text);
            TagTextContent.parentNode.insertBefore(p, TagTextContent);
            p.appendChild(text_node);
            p.classList.add('post-tag');
            TagTextContent.value = '';
            tagLen = countTag();
        } else {
            TagTextContent.classList.add('no-sp-text');
        }

        //show input if tag length <10
        if (tagLen >= 10) {
            TagTextContent.disabled = true;
            TagTextContent.style.display = 'none';
        } else {
            TagTextContent.disabled = false;
            TagTextContent.style.display = 'flex';
        }

        let tag = document.querySelectorAll('.post-tag');
        //delete tag
        for (let i = 0; i < tag.length; i++) {
            tag[i].addEventListener('click', () => {
                tagLen = countTag();
                //limit 10 tag
                if (tagLen >= 10) {
                    TagTextContent.disabled = true;
                    TagTextContent.style.display = 'none';
                } else {
                    TagTextContent.disabled = false;
                    TagTextContent.style.display = 'flex';
                }
                tag[i].parentNode.removeChild(tag[i]);
            });
        }
    }
});

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

/*initiate the autocomplete function on the "myInput" element, and pass along the countries array as possible autocomplete values:*/
autocomplete(document.getElementById("tag_input"), tagArray);

//----------------set min max date today (+7 day from today)---------------------
var dateTime = document.getElementById("date_time")
dateTime.addEventListener("click", function() {
    //today date
    var today = new Date();
    var todayFullDate = getFullDate(today);
    //max date
    var adddate = today.setDate(today.getDate() + 7);
    var maxdate = new Date(adddate);
    //get full date
    maxdate = getFullDate(maxdate);
    //set min max date
    dateTime.setAttribute('min', todayFullDate)
    dateTime.setAttribute('max', maxdate)


});
//----------------set min time today (+10min from now)---------------------
dateTime.addEventListener("input", function() {
    //today plus 10 minutes date
    var todayPlus = new Date();
    var adddate = todayPlus.setMinutes(todayPlus.getMinutes() + 10);
    todayPlus = new Date(adddate);
    todayPlusFullDate = getFullDate(todayPlus);


    //input date
    if (dateTime.value) {
        var inputDate = new Date(dateTime.value);
        if (inputDate < todayPlus) {
            $('#date_time').val(todayPlusFullDate);
        }
    }
    //-----------time set checked------------
    if (dateTime.value == '') {
        setTime = false;
    } else {
        setTime = true;
    }
    buttonAble();
});


//-----------time set checked------------
var unset = document.querySelector('#unset_time');
var set = document.querySelector('#set_time');
unset.addEventListener("click", function() {
    if (unset.checked == true) {
        dateTime.value = '';
        setTime = false;
        unsetTime = true;
    }
});
set.addEventListener("click", function() {
    if (set.checked == true) {
        unsetTime = false;
    }
});


//-----------room checked------------
var roomArray = document.querySelectorAll('input[name=room]');
for (var i = 0; i < roomArray.length; i++) {
    roomArray[i].addEventListener("click", function() {
        console.log(header, body, room, unsetTime, setTime);
        console.log(header && body && room && (unsetTime || setTime));
        room = true;
    });
}


//----------------prevent form submit---------------   
document.querySelector('form').addEventListener("click", function() {
    buttonAble()
});
$('form').submit(function(event) {
    if (header && body && room && (unsetTime || setTime)) {
        tagLen = 0;
        return true;
    } else {
        return false;
    }
});
buttonAble();


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