//variables globales
let URL_BASE = "http://localhost:8080";
let Reservation = null;

//Ejecutar cuando se carge la paguina
$(document).ready(function (){
    getAllReservation();

    $("#modalReservation").hide();
});
//Acciones con el modal
function openModal(idReservation) {
    if(idReservation==-1){                         //activar para agregar
        $("#btnAdd").show();
        $("#btnUpdate").hide();
        $("#txtId").val(-1);
        $("#reservation_startDate").val("");
        $("#reservation_devolutionDate").val("");
        $("#reservation_status").val("");
    }
    else{                               //activar para actualizar
        $("#btnAdd").hide();
        $("#btnUpdate").show();
        Reservation = getReservation(idReservation);
        $("#txtId").val(Reservation.idReservation);
        $("#reservation_startDate").val(Reservation.startDate);
        $("#reservation_devolutionDate").val(Reservation.devolutionDate);
        $("#reservation_status").val(Reservation.status);
    }
    $("#modalReservation").show();

}

function closeModal() {
    $("#modalReservation").hide();

}
//Actualizar la tabla de datos
function updateDataGrid(items) {
    $("#tblReservation").find("tr:gt(0)").remove();
    let data = "";
    for (let i = 0; i < items.length; i++) {
        data += "<tr>";
        data += "<td></td>";
        data += "<td>" + items[i].startDate + "</td>";
        data += "<td>" + items[i].devolutionDate + "</td>";
        data += "<td>" + items[i].status + "</td>";
        data += "<td><span onclick=\"openModal(" + items[i].idReservation + ")\">A</span></td>";
        data += "<td><span onclick=\"deleteReservation(" + items[i].idReservation + ")\">E</span></td>";
        data += "</tr>";
    }
    $("#tblReservation> tbody:last-child").append(data);
}

//Llamado Backend para CRUD
function getAllReservation() {
    $.ajax({
        url: URL_BASE + "/api/Reservation/all",
        type: "GET",
        datatype: "JSON"
    })
        .done(function (response) {
            console.log(response);
            updateDataGrid(response);
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            alert("Falla obteniendo los Reservationistradores");
        });
}

function getReservation(idReservation) {
    $.ajax({
        async: false,
        url: URL_BASE + "/api/Reservation/" + idReservation,
        type: "GET",
        datatype: "JSON"
    })
        .done(function (response) {
            console.log(response);
            Reservation = response;
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            console.log("Falla obteniendo los idReservation" + idReservation);
        });
    return Reservation;

}


function insertReservation() {
    Reservation = {
        startDate: $("#reservation_startDate").val(),
        devolutionDate: $("#reservation_devolutionDate").val(),
        status: $("#reservation_status").val()
    }

    let body = JSON.stringify(Reservation)
    $.ajax({
        url: URL_BASE + "/api/Reservation/save",
        type: "POST",
        datatype: "JSON",
        data: body,
        contentType: "application/json;charset=UFT-8"
    })
        .done(function (response) {
            console.log(response);
            alert("Reservación agregada")
            getAllReservation();

        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            alert("Falla creando la nueva reservacion.");
        });
    closeModal();


}

function updateReservation() {
    Reservation = {
        idReservation: $("#txtId").val(),
        startDate: $("#reservation_startDate").val(),
        devolutionDate: $("#reservation_devolutionDate").val(),
        status: $("#reservation_status").val()

    }
    let body = JSON.stringify(Reservation)
    $.ajax({
        url: URL_BASE + "/api/Reservation/update",
        type: "PUT",
        datatype: "JSON",
        data: body,
        contentType: "application/json;charset=UFT-8"
    })
        .done(function (response) {
            console.log(response);
            alert("Reservation actualizado");
            getAllReservation();

        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            alert("Falla actualizando la Reservacion")
        });
    closeModal();

}

function deleteReservation(idReservation) {
    $.ajax({
        url: URL_BASE + "/api/Reservation/" + idReservation,
        type: "DELETE",
        datatype: "JSON"
    })
        .done(function (response) {
            console.log(response);
            alert("Reservacion eliminada");
            getAllReservation();

        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            alert("falla eliminando la reservacion" + idReservation)

        });
}
