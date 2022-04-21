//search not found display 
function displayCheck(id, show) {
    notfound = document.getElementById(show);
    table = document.getElementById(id);
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        if (tr[i].style.display == 'none') {
            notfound.style.display = "flex";
        } else {
            notfound.style.display = "none";
        }
    }
}

//search
function search(notfoundID, inputID, tableID, checkRow) {
    var input, filter, table, tr, td, i, txtValue;
    notfound = document.getElementById(notfoundID);
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