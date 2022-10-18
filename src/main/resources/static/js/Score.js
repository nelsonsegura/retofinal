//variables globales
let URL_BASE = "http://localhost:8080";
let Score = null;

//Ejecutar cuando se carge la paguina
$(document).ready(function (){
    getAllScore();

    $("#modalScore").hide();
});
//Acciones con el modal
function openModal(id) {
    if(id==-1){                         //activar para agregar
        $("#btnAdd").show();
        $("#btnUpdate").hide();
        $("#txtId").val(-1);
        $("#score_score").val("");
        $("#score_reservation").val("");
    }
    else{                               //activar para actualizar
        $("#btnAdd").hide();
        $("#btnUpdate").show();
        Score = getScore(id);
        $("#txtId").val(Score.idScore);
        $("#score_score").val(Score.score);
        $("#score_reservation").val(Score.reservation);
    }
    $("#modalScore").show();

}

function closeModal() {
    $("#modalScore").hide();

}
//Actualizar la tabla de datos
function updateDataGrid(items) {
    $("#tblScore").find("tr:gt(0)").remove();
    let data = "";
    for (let i = 0; i < items.length; i++) {
        data += "<tr>";
        data += "<td>" + items[i].score + "</td>";
        data += "<td>" + items[i].score_reservation + "</td>";
        data += "<td><span onclick=\"openModal(" + items[i].id + ")\">A</span></td>";
        data += "<td><span onclick=\"deleteScore(" + items[i].id + ")\">E</span></td>";
        data += "</tr>";
    }
    $("#tblScore> tbody:last-child").append(data);
}

//Llamado Backend para CRUD
function getAllScore() {
    $.ajax({
        url: URL_BASE + "/api/Score/all",
        type: "GET",
        datatype: "JSON"
    })
        .done(function (response) {
            console.log(response);
            updateDataGrid(response);
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            alert("Falla obteniendo los Scoreistradores");
        });
}

function getScore(idScore) {
    $.ajax({
        async: false,
        url: URL_BASE + "/api/Score/" + idScore,
        type: "GET",
        datatype: "JSON"
    })
        .done(function (response) {
            console.log(response);
            Score = response;
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            console.log("Falla obteniendo los id" + idScore);
        });
    return Score;

}


function insertScore() {
    Score = {
        name: $("#score_score").val(),
        email: $("#score_reservation").val()
    }

    let body = JSON.stringify(Score)
    $.ajax({
        url: URL_BASE + "/api/Score//save",
        type: "POST",
        datatype: "JSON",
        data: body,
        contentType: "application/json;charset=UFT-8"
    })
        .done(function (response) {
            console.log(response);
            alert("Scoreistrador agregado")
            getAllScore();

        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            alert("Falla creando el nuevo scoreistrador.");
        });
    closeModal();


}

function updateScore() {
    Score = {
        id: $("#txtId").val(),
        name: $("#score_score").val(),
        email: $("#score_reservation").val()
      }
    let body = JSON.stringify(Score)
    $.ajax({
        url: URL_BASE + "/api/Score/update",
        type: "PUT",
        datatype: "JSON",
        data: body,
        contentType: "application/json;charset=UFT-8"
    })
        .done(function (response) {
            console.log(response);
            alert("Score actualizado");
            getAllScore();

        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            alert("Falla actualizando el Scoreistrador")
        });
    closeModal();

}

function deleteScore(idScore) {
    $.ajax({
        url: URL_BASE + "/api/Score/delete" + idScore,
        type: "DELETE",
        datatype: "JSON"
    })
        .done(function (response) {
            console.log(response);
            alert("Score eliminado");
            getAllScore();

        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            alert("falla eliminando el score" + idScore)

        });
}
