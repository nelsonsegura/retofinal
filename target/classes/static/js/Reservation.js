//variables globales
let URL_BASE = "http://localhost:8080";
let Reservation = null;

//Ejecutar cuando se carge la paguina
$(document).ready(function (){
    getAllReservation();

    $("#modalReservation").hide();
});
//Acciones con el modal
function openModal(id) {
    if(id==-1){                         //activar para agregar
        $("#btnAdd").show();
        $("#btnUpdate").hide();
        $("#txtId").val(-1);
        $("#reservation_name").val("");
        $("#reservation_Email").val("");
        $("#reservation_Password").val("");
    }
    else{                               //activar para actualizar
        $("#btnAdd").hide();
        $("#btnUpdate").show();
        Reservation = getReservation(id);
        $("#txtId").val(Reservation.idReservation);
        $("#reservation_name").val(Reservation.name);
        $("#reservation_Email").val(Reservation.email);
        $("#reservation_Password").val(Reservation.password);
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
        data += "<td>" + items[i].name + "</td>";
        data += "<td>" + items[i].email + "</td>";
        data += "<td>" + items[i].password + "</td>";
        data += "<td><span onclick=\"openModal(" + items[i].id + ")\">A</span></td>";
        data += "<td><span onclick=\"deleteReservation(" + items[i].id + ")\">E</span></td>";
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
            console.log("Falla obteniendo los id" + idReservation);
        });
    return Reservation;

}


function insertReservation() {
    Reservation = {
        name: $("#reservation_name").val(),
        email: $("#reservation_Email").val(),
        password: $("#reservation_Password").val()
    }

    let body = JSON.stringify(Reservation)
    $.ajax({
        url: URL_BASE + "/api/Reservation//save",
        type: "POST",
        datatype: "JSON",
        data: body,
        contentType: "application/json;charset=UFT-8"
    })
        .done(function (response) {
            console.log(response);
            alert("Reservationistrador agregado")
            getAllReservation();

        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            alert("Falla creando el nuevo reservationistrador.");
        });
    closeModal();


}

function updateReservation() {
    Reservation = {
        id: $("#txtId").val(),
        name: $("#reservation_name").val(),
        email: $("#reservation_Email").val(),
        password: $("#reservation_Password").val()

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
            alert("Falla actualizando el Reservationistrador")
        });
    closeModal();

}

function deleteReservation(idReservation) {
    $.ajax({
        url: URL_BASE + "/api/Reservation/delete" + idReservation,
        type: "DELETE",
        datatype: "JSON"
    })
        .done(function (response) {
            console.log(response);
            alert("Reservationistrador eliminado");
            getAllReservation();

        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            alert("falla eliminando el reservation" + idReservation)

        });
}
