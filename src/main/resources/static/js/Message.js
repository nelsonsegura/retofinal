//variables globales
let URL_BASE = "http://localhost:8080";
let Message = null;

//Ejecutar cuando se carge la paguina
$(document).ready(function (){
    getAllMessage();

    $("#modalMessage").hide();
});
//Acciones con el modal
function openModal(idMessage) {
    if(idMessage==-1){                         //activar para agregar
        $("#btnAdd").show();
        $("#btnUpdate").hide();
        $("#txtId").val(-1);
        $("#messageText").val("");
    }
    else{                               //activar para actualizar
        $("#btnAdd").hide();
        $("#btnUpdate").show();
        Message = getMessage(idMessage);
        $("#txtId").val(Message.idMessage);
        $("#messageText").val(Message.messageText);
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
        data += "<td></td>";
        data += "<td>" + items[i].messageText + "</td>";
        data += "<td><span onclick=\"openModal(" + items[i].idMessage + ")\">A</span></td>";
        data += "<td><span onclick=\"deleteMessage(" + items[i].idMessage + ")\">E</span></td>";
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
            console.log("Falla obteniendo los idMessage" + idMessage);
        });
    return Message;

}


function insertMessage() {
    Message = {
        messageText: $("#messageText").val()
    }

    let body = JSON.stringify(Message)
    $.ajax({
        url: URL_BASE + "/api/Message/save",
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
            alert("Falla creando el nuevo mensaje.");
        });
    closeModal();


}

function updateMessage() {
    Message = {
        idMessage: $("#txtId").val(),
        messageText: $("#messageText").val()

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
        url: URL_BASE + "/api/Message/" + idMessage,
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
