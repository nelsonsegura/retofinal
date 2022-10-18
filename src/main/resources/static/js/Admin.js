//variables globales
let URL_BASE = "http://localhost:8080";
let Admin = null;

//Ejecutar cuando se carge la paguina
$(document).ready(function (){
    getAllAdmin();

    $("#modalAdmin").hide();
});
//Acciones con el modal
function openModal(idAdmin) {
    if(idAdmin==-1){                         //activar para agregar
        $("#btnAdd").show();
        $("#btnUpdate").hide();
        $("#txtId").val(-1);
        $("#admin_name").val("");
        $("#admin_email").val("");
        $("#admin_password").val("");
    }
    else{                               //activar para actualizar
        $("#btnAdd").hide();
        $("#btnUpdate").show();
        Admin = getAdmin(idAdmin);
        $("#txtId").val(Admin.idAdmin);
        $("#admin_name").val(Admin.name);
        $("#admin_email").val(Admin.email);
        $("#admin_password").val(Admin.password);
    }
    $("#modalAdmin").show();

}

function closeModal() {
    $("#modalAdmin").hide();

}
//Actualizar la tabla de datos
function updateDataGrid(items) {
    $("#tblAdmin").find("tr:gt(0)").remove();
    let data = "";
    for (let i = 0; i < items.length; i++) {
        data += "<tr>";
        data += "<td></td>";
        data += "<td>" + items[i].name + "</td>";
        data += "<td>" + items[i].email + "</td>";
        data += "<td>" + items[i].password + "</td>";
        data += "<td><span onclick=\"openModal(" + items[i].idAdmin + ")\">A</span></td>";
        data += "<td><span onclick=\"deleteAdmin(" + items[i].idAdmin + ")\">E</span></td>";
        data += "</tr>";
    }
    $("#tblAdmin> tbody:last-child").append(data);
}

//Llamado Backend para CRUD
function getAllAdmin() {
        $.ajax({
            url: URL_BASE + "/api/Admin/all",
            type: "GET",
            datatype: "JSON"
        })
            .done(function (response) {
                console.log(response);
                updateDataGrid(response);
            })
            .fail(function (jqXHR, textStatus, errorThrown) {
                alert("Falla obteniendo los Administradores");
            });
    }

    function getAdmin(idAdmin) {
        $.ajax({
            async: false,
            url: URL_BASE + "/api/Admin/" + idAdmin,
            type: "GET",
            datatype: "JSON"
        })
            .done(function (response) {
                console.log(response);
                Admin = response;
            })
            .fail(function (jqXHR, textStatus, errorThrown) {
                console.log("Falla obteniendo los idAdmin" + idAdmin);
            });
        return Admin;

    }


    function insertAdmin() {
        Admin = {
            name: $("#admin_name").val(),
            email: $("#admin_email").val(),
            password: $("#admin_password").val()
        }

        let body = JSON.stringify(Admin)
        $.ajax({
            url: URL_BASE + "/api/Admin/save",
            type: "POST",
            datatype: "JSON",
            data: body,
            contentType: "application/json;charset=UFT-8"
        })
            .done(function (response) {
                console.log(response);
                alert("Administrador agregado")
                getAllAdmin();

            })
            .fail(function (jqXHR, textStatus, errorThrown) {
                alert("Falla creando el nuevo administrador.");
            });
        closeModal();


    }

    function updateAdmin() {
        Admin = {
            idAdmin: $("#txtId").val(),
            name: $("#admin_name").val(),
            email: $("#admin_email").val(),
            password: $("#admin_password").val()

        }
        let body = JSON.stringify(Admin)
        $.ajax({
            url: URL_BASE + "/api/Admin/update",
            type: "PUT",
            datatype: "JSON",
            data: body,
            contentType: "application/json;charset=UFT-8"
        })
            .done(function (response) {
                console.log(response);
                alert("Admin actualizado");
                getAllAdmin();

            })
            .fail(function (jqXHR, textStatus, errorThrown) {
                alert("Falla actualizando el Administrador")
            });
        closeModal();

    }

    function deleteAdmin(idAdmin) {
        $.ajax({
            url: URL_BASE + "/api/Admin/" + idAdmin,
            type: "DELETE",
            datatype: "JSON"
        })
            .done(function (response) {
                console.log(response);
                alert("Administrador eliminado");
                getAllAdmin();

            })
            .fail(function (jqXHR, textStatus, errorThrown) {
                alert("falla eliminando el admin" + idAdmin)

            });
    }








