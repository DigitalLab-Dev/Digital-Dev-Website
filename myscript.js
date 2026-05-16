$(function(){
    $("#mydiv").click(function(){
        $(this).append("Loading data...");
    });

    $("#btnadd").click(function(){
        $("#table-body").empty();
        loadData();
        $(this).text("Refresh Content");
    });

    $("#table-body").on("click", "#delete-btn", function(){
        var row=$(this).closest("tr");
        var id = row.attr("data-id");    ;
        console.log(id);
        $(this).prop("disabled",true);
        $.ajax({
            url: "https://jsonplaceholder.typicode.com/todos/" + id,
            method: "DELETE",
            success: function(){
                console.log("Deleted successfully");
                loadData();
            },
            error: function(){
                console.log("Error deleting");
            }
        });

    
    });


    $("#table-body").on("click", "#edit-btn", function(){
        var row=$(this).closest("tr");
        var id = row.attr("data-id");
        $("#edit-form").show();
        $("#edit-user-id").attr("placeholder", row.find("td:eq(0)").text());
        $("#edit-id").attr("placeholder", row.find("td:eq(1)").text());
        $("#edit-title").val(row.find("td:eq(2)").text());
        if(row.find("td:eq(3)").text()==="true"){
            $("#edit-status").val("True").change();
        }
        else{
            $("#edit-status").val("False").change();
            
        }
    });


    $("#update-btn").click(function(){
            handle_edit();
    });
    

    $("#cancel-btn").click(function(){
            $("#edit-form").hide();
        });

});










function loadData(){
    $.ajax({
        url: "https://jsonplaceholder.typicode.com/todos",
        method: "GET",
        success: function(response){
            for(let i=0; i<response.length; i++){
                row = "<tr data-id='" + response[i].id + "'><td scope='row'>" + response[i].userId + "</td><td>" + response[i].id + "</td><td>" + response[i].title + "</td><td>" + response[i].completed + "</td><td><button class='btn btn-danger' id='delete-btn'>Delete</button> <button class='btn btn-primary' id='edit-btn'>Edit</button></td></tr>";
                
                $("#table-body").append(row);
            }       
        }    
    }
    )
}


function handle_edit(){
        var id = $("#edit-id").attr("placeholder");
        var userId = $("#edit-user-id").attr("placeholder");
        var title = $("#edit-title").val();
        var completed = $("#edit-status").val();

        $.ajax({
            url: "https://jsonplaceholder.typicode.com/todos/" + id,
            method: "PUT",
            data: {
                userId: userId,
                id: id,
                title: title,
                completed: completed
            },
            success: function(response){
                alert("Updated successfully");
                $("#edit-form").hide();
            }
        });
}