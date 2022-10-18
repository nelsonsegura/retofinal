//variables globales
let URL_BASE = "http://localhost:8080";
let Message = null;

//Ejecutar cuando se carge la paguina
$(document).ready(function (){
    getAllMessage();

    $("#modalMessage").hide();
});
//Acciones con el modal
function openModal(id) {
    if(id==-1){                         //activar para agregar
        $("#btnAdd").show();
        $("#btnUpdate").hide();
        $("#txtId").val(-1);
        $("#messageText").val("");
        $("#messageComputer").val("");
        $("#idClient").val("");
    }
    else{                               //activar para actualizar
        $("#btnAdd").hide();
        $("#btnUpdate").show();
        Message = getMessage(id);
        $("#txtId").val(Message.idMessage);
        $("#messageText").val(Message.messageTex);
        $("#messageComputer").val(Message.messageComputer);
        $("#idClient").val(Message.idClient);
    }
    $("#modalMessage").show();

}

function closeModal() {
    $("#modalMessage").hide();

}
//Actualizar la tabla de datos
function updateDataGrid(items) {
    $("#tblMessage").find("tr:gt(0)").remove();
    let data = "";
    for (let i = 0; i < items.length; i++) {
        data += "<tr>";
        data += "<td>" + items[i].messageTex + "</td>";
        data += "<td>" + items[i].messageComputer + "</td>";
        data += "<td>" + items[i].idClient + "</td>";
        data += "<td><span onclick=\"openModal(" + items[i].id + ")\">A</span></td>";
        data += "<td><span onclick=\"deleteMessage(" + items[i].id + ")\">E</span></td>";
        data += "</tr>";
    }
    $("#tblMessage> tbody:last-child").append(data);
}

//Llamado Backend para CRUD
function getAllMessage() {
    $.ajax({
        url: URL_BASE + "/api/Message/all",
        type: "GET",
        datatype: "JSON"
    })
        .done(function (response) {
            console.log(response);
            updateDataGrid(response);
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            alert("Falla obteniendo los Messageistradores");
        });
}

function getMessage(idMessage) {
    $.ajax({
        async: false,
        url: URL_BASE + "/api/Message/" + idMessage,
        type: "GET",
        datatype: "JSON"
    })
        .done(function (response) {
            console.log(response);
            Message = response;
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            console.log("Falla obteniendo los id" + idMessage);
        });
    return Message;

}


function insertMessage() {
    Message = {
        messageTex: $("#messageText").val(),
        messageComputer: $("#messageComputer").val(),
        idClient: $("#idClient").val()
    }

    let body = JSON.stringify(Message)
    $.ajax({
        url: URL_BASE + "/api/Message//save",
        type: "POST",
        datatype: "JSON",
        data: body,
        contentType: "application/json;charset=UFT-8"
    })
        .done(function (response) {
            console.log(response);
            alert("Mensaje agregado")
            getAllMessage();

        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            alert("Falla creando el nuevo mensaj.");
        });
    closeModal();


}

function updateMessage() {
    Message = {
        id: $("#txtId").val(),
        messageTex: $("#messageTex").val(),
        message_computer: $("#messageComputer").val(),
        idClient: $("#idClient").val()

    }
    let body = JSON.stringify(Message)
    $.ajax({
        url: URL_BASE + "/api/Message/update",
        type: "PUT",
        datatype: "JSON",
        data: body,
        contentType: "application/json;charset=UFT-8"
    })
        .done(function (response) {
            console.log(response);
            alert("mensaje actualizado");
            getAllMessage();

        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            alert("Falla actualizando el mensaje")
        });
    closeModal();

}

function deleteMessage(idMessage) {
    $.ajax({
        url: URL_BASE + "/api/Message/delete" + idMessage,
        type: "DELETE",
        datatype: "JSON"
    })
        .done(function (response) {
            console.log(response);
            alert("Mensaje eliminado");
            getAllMessage();

        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            alert("falla eliminando el mensaje" + idMessage)

        });
}
