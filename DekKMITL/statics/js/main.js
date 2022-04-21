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

// displayCheck('tag_table', 'not_found');
// displayCheck('follower_table', 'user_not_found');
// displayCheck('following_table', 'following_not_found');