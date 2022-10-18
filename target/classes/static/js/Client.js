//variables globales
let URL_BASE = "http://localhost:8080";
let Client = null;

//Ejecutar cuando se carge la paguina
$(document).ready(function (){
    getAllClient();

    $("#modalClient").hide();
});
//Acciones con el modal
function openModal(id) {
    if(id==-1){                         //activar para agregar
        $("#btnAdd").show();
        $("#btnUpdate").hide();
        $("#txtId").val(-1);
        $("#client_name").val("");
        $("#client_email").val("");
        $("#client_password").val("");
        $("#client_age").val("");
    }
    else{                               //activar para actualizar
        $("#btnAdd").hide();
        $("#btnUpdate").show();
        Client = getClient(id);
        $("#txtId").val(Client.idClient);
        $("#client_name").val(Client.name);
        $("#client_email").val(Client.email);
        $("#client_password").val(Client.password);
        $("#client_age").val(Client.age);
    }
    $("#modalClient").show();

}

function closeModal() {
    $("#modalClient").hide();

}
//Actualizar la tabla de datos
function updateDataGrid(items) {
    $("#tblClient").find("tr:gt(0)").remove();
    let data = "";
    for (let i = 0; i < items.length; i++) {
        data += "<tr>";
        data += "<td>" + items[i].name + "</td>";
        data += "<td>" + items[i].email + "</td>";
        data += "<td>" + items[i].password + "</td>";
        data += "<td>" + items[i].age + "</td>";
        data += "<td><span onclick=\"openModal(" + items[i].id + ")\">A</span></td>";
        data += "<td><span onclick=\"deleteClient(" + items[i].id + ")\">E</span></td>";
        data += "</tr>";
    }
    $("#tblClient> tbody:last-child").append(data);
}

//Llamado Backend para CRUD
function getAllClient() {
        $.ajax({
            url: URL_BASE + "/api/Client/all",
            type: "GET",
            datatype: "JSON"
        })
            .done(function (response) {
                console.log(response);
                updateDataGrid(response);
            })
            .fail(function (jqXHR, textStatus, errorThrown) {
                alert("Falla obteniendo los Clientes");
            });
    }

    function getClient(idClient) {
        $.ajax({
            async: false,
            url: URL_BASE + "/api/Client/" + idClient,
            type: "GET",
            datatype: "JSON"
        })
            .done(function (response) {
                console.log(response);
                Client = response;
            })
            .fail(function (jqXHR, textStatus, errorThrown) {
                console.log("Falla obteniendo los id" + idClient);
            });
        return Client;

    }


    function insertClient() {
        Client = {
            name: $("#client_name").val(),
            email: $("#client_email").val(),
            password: $("#client_password").val(),
            age: $("#client_age").val()
        }

        let body = JSON.stringify(Client)
        $.ajax({
            url: URL_BASE + "/api/Client/save",
            type: "POST",
            datatype: "JSON",
            data: body,
            contentType: "application/json;charset=UFT-8"
        })
            .done(function (response) {
                console.log(response);
                alert("Cliente agregado")
                getAllClient();

            })
            .fail(function (jqXHR, textStatus, errorThrown) {
                alert("Falla creando el nuevo cliente.");
            });
        closeModal();


    }

    function updateClient() {
        Client = {
            id: $("#txtId").val(),
            name: $("#client_name").val(),
            email: $("#client_email").val(),
            password: $("#client_password").val(),
            age: $("#client_age").val()
        }
        let body = JSON.stringify(Client)
        $.ajax({
            url: URL_BASE + "/api/Client/update",
            type: "PUT",
            datatype: "JSON",
            data: body,
            contentType: "application/json;charset=UFT-8"
        })
            .done(function (response) {
                console.log(response);
                alert("Client actualizado");
                getAllClient();

            })
            .fail(function (jqXHR, textStatus, errorThrown) {
                alert("Falla actualizando el Cliente")
            });
        closeModal();

    }

    function deleteClient(idClient) {
        $.ajax({
            url: URL_BASE + "/api/Client/delete" + idClient,
            type: "DELETE",
            datatype: "JSON"
        })
            .done(function (response) {
                console.log(response);
                alert("Cliente eliminado");
                getAllClient();

            })
            .fail(function (jqXHR, textStatus, errorThrown) {
                alert("falla eliminando el client" + idClient)

            });
    }
