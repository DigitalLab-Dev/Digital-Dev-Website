/*console.log("I am Ali coming from external file");

function btnclicked(){
    console.log("Button clicked boss now show something...")
}

btn= document.getElementById("mybtn");
btn.addEventListener("mouseenter",updateResults);
function updateResults(){
    var input=document.getElementById("myinput").value;
    var ouput=document.getElementById("results");
    ouput.innerHTML=input;
}*/


//Window on load implementation
/*window.onload = function () {
    add_btn = document.getElementById("add");
    add_btn.addEventListener("click", add_row);

    del_btn = document.getElementsByClassName("del_btn");
    for (var i = 0; i < del_btn.length; i++) {
        del_btn[i].addEventListener("click", del_row);
    }

}

function add_row() {
    name = document.getElementById("name").value;
    gender = document.getElementById("gender").value;
    var table = document.getElementById("TODO");
    var row = table.insertRow();
    var cell1 = row.insertCell();
    var cell2 = row.insertCell();
    var cell3 = row.insertCell();
    var cell4 = row.insertCell();

    var last_row = table.rows.length - 2;
    var last_id = parseInt(table.rows[last_row].cells[0].innerHTML);
    cell1.innerHTML = last_id + 1;
    cell2.innerHTML = name;
    cell3.innerHTML = gender;
    cell4.innerHTML = "<button class='del_btn'>Delete</button>";
    document.getElementById("name").value = "";
    document.getElementById("gender").value = "";
}

function del_row() {
    var btn = event.target;
    var row = btn.parentNode.parentNode;
    row.parentNode.removeChild(row);
}*/


//Jquery implementation

/*$(function () {
    $("#add").click(add_row);

    $("#TODO").on("click", ".del_btn", function () {
        $(this).closest("tr").remove();
    });
})


function add_row() {
    var name = $("#name").val();
    var gender = $("#gender").val();
    var table = $("#TODO");

    if(name=="" || gender==""){
        alert("Please fill all the fields");
        $("#name").focus();
        return;
    }

    var last_id = parseInt(table.find("tr:last td:first").text());
    var new_id = last_id + 1;

    var newRow = `
    <tr>
    <td>${new_id}</td>
    <td>${name}</td>
    <td>${gender}</td>
    <td><button class='del_btn'>Delete</button></td>
    </tr>`;

    table.append(newRow);
    $("#name").val("");
    $("#gender").val("");
};*/


//Practice question for Gemini

$(function () {
    $("#add").click(add_row);

    $("#items").on("click", ".remove", function () {
        $(this).closest("tr").remove();
    });

    $("#items").on("click", ".mark_btn", mark_btn);

    $("#Load_data").click(function () {
        $.get("./data.txt", handle_data);
    });
});

function add_row() {
    var name = $("#Itname").val();
    var quantity = $("#quantity").val();
    var table = $("#items");

    if (name == "" && quantity == "") {
        alert("Please fill all the fields");
        $("#Itname").addClass("error");
        $("#quantity").addClass("error");
        return;
    }
    else if (quantity == "") {
        alert("Please enter quantity");
        $("#quantity").addClass("error");
        return;
    }
    else if (name == "") {
        alert("Please enter item name");
        $("#Itname").addClass("error");
        return;
    }
    else {
        $("#Itname").removeClass("error");
        $("#quantity").removeClass("error");
    }

    var newRow = `
    <tr>
    <td>${name}</td>
    <td>${quantity}</td>
    <td><button class='remove'>Remove</button> <button class='mark_btn'>Mark Brought</button></td>
    </tr>`;

    table.append(newRow);
    $("#name").val("");
    $("#quantity").val("");
}


function mark_btn() {
    var row = $(this).closest("tr");
    row.css("background-color", "lightgreen");
    row.css("text-decoration", "line-through");
}


function handle_data(data) {
    $("#result").empty();
    $("#result").append(data);
    $("#result").addClass("ajax");
}