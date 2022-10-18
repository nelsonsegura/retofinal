//variables globales
let URL_BASE = "http://localhost:8080";
let Computer = null;

//Ejecutar cuando se carge la paguina
$(document).ready(function (){
    getAllComputer();

    $("#modalComputer").hide();
});
//Acciones con el modal
function openModal(id) {
    if(id==-1){                         //activar para agregar
        $("#btnAdd").show();
        $("#btnUpdate").hide();
        $("#txtId").val(-1);
        $("#computer_brand").val("");
         $("#computer_description").val("");
        $("#computer_name").val("");
        $("#computer_year").val("");

    }
    else{                               //activar para actualizar
        $("#btnAdd").hide();
        $("#btnUpdate").show();
        Computer = getComputer(id);
        $("#txtId").val(Computer.id);
        $("#computer_brand").val(Computer.brand);
        $("#computer_description").val(Computer.description);
        $("#computer_name").val(Computer.name);
        $("#computer_year").val(Computer.year);

    }
    $("#modalComputer").show();

}

function closeModal() {
    $("#modalComputer").hide();

}
//Actualizar la tabla de datos
function updateDataGrid(items) {
    $("#tblComputer").find("tr:gt(0)").remove();
    let data = "";
    for (let i = 0; i < items.length; i++) {
        data += "<tr>";
        data += "<td></td>";
        data += "<td>" + items[i].brand + "</td>";
        data += "<td>" + items[i].description + "</td>";
        data += "<td>" + items[i].name + "</td>";
        data += "<td>" + items[i].year + "</td>";

        data += "<td><span onclick=\"openModal(" + items[i].id + ")\">A</span></td>";
        data += "<td><span onclick=\"deleteComputer(" + items[i].id + ")\">E</span></td>";
        data += "</tr>";
    }
    $("#tblComputer> tbody:last-child").append(data);
}

//Llamado Backend para CRUD
function getAllComputer() {
    $.ajax({
        url: URL_BASE + "/api/Computer/all",
        type: "GET",
        datatype: "JSON"
    })
        .done(function (response) {
            console.log(response);
            updateDataGrid(response);
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            alert("Falla obteniendo la lista de Computadores");
        });
}

function getComputer(id) {
    $.ajax({
        async: false,
        url: URL_BASE + "/api/Computer/" + id,
        type: "GET",
        datatype: "JSON"
    })
        .done(function (response) {
            console.log(response);
            Computer = response;
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            console.log("Falla obteniendo los id" + id);
        });
    return Computer;

}


function insertComputer() {
    Computer = {
        brand: $("#computer_brand").val(),
        description: $("#computer_description").val(),
        name: $("#computer_name").val(),
        year: $("#computer_year").val()

    }

    let body = JSON.stringify(Computer)
    $.ajax({
        url: URL_BASE + "/api/Computer/save",
        type: "POST",
        datatype: "JSON",
        data: body,
        contentType: "application/json;charset=UFT-8"
    })
        .done(function (response) {
            console.log(response);
            alert("Computador agregado")
            getAllComputer();

        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            alert("Falla creando el nuevo computador.");
        });
    closeModal();


}

function updateComputer() {
    Computer = {
        id: $("#txtId").val(),
        brand: $("#computer_brand").val(),
        description: $("#computer_description").val(),
        name: $("#computer_name").val(),
        year: $("#computer_year").val()


    }
    let body = JSON.stringify(Computer)
    $.ajax({
        url: URL_BASE + "/api/Computer/update",
        type: "PUT",
        datatype: "JSON",
        data: body,
        contentType: "application/json;charset=UFT-8"
    })
        .done(function (response) {
            console.log(response);
            alert("Computer actualizado");
            getAllComputer();

        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            alert("Falla actualizando el Computeristrador")
        });
    closeModal();

}

function deleteComputer(id) {
    $.ajax({
        url: URL_BASE + "/api/Computer/" + id,
        type: "DELETE",
        datatype: "JSON"
    })
        .done(function (response) {
            console.log(response);
            alert("Computador  eliminado");
            getAllComputer();

        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            alert("falla eliminando el computer" + id)

        });
}
