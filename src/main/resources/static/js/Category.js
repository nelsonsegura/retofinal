//variables globales
let URL_BASE = "http://localhost:8080";
let Category = null;

//Ejecutar cuando se carge la paguina
$(document).ready(function (){
    getAllCategory();

    $("#modalCategory").hide();
});
//Acciones con el modal
function openModal(id) {
    if(id==-1){                         //activar para agregar
        $("#btnAdd").show();
        $("#btnUpdate").hide();
        $("#txtId").val(-1);
        $("#category_name").val("");
        $("#category_description").val("");
    }
    else{                               //activar para actualizar
        $("#btnAdd").hide();
        $("#btnUpdate").show();
        Category = getCategory(id);
        $("#txtId").val(Category.id);
        $("#category_name").val(Category.name);
        $("#category_description").val(Category.description);
    }
    $("#modalCategory").show();

}

function closeModal() {
    $("#modalCategory").hide();

}
//Actualizar la tabla de datos
function updateDataGrid(items) {
    $("#tblCategory").find("tr:gt(0)").remove();
    let data = "";
    for (let i = 0; i < items.length; i++) {
        data += "<tr>";
        data += "<td></td>";
        data += "<td>" + items[i].name + "</td>";
        data += "<td>" + items[i].description + "</td>";
        data += "<td><span onclick=\"openModal(" + items[i].id + ")\">A</span></td>";
        data += "<td><span onclick=\"deleteCategory(" + items[i].id + ")\">E</span></td>";
        data += "</tr>";
    }
    $("#tblCategory> tbody:last-child").append(data);
}

//Llamado Backend para CRUD
function getAllCategory() {
    $.ajax({
        url: URL_BASE + "/api/Category/all",
        type: "GET",
        datatype: "JSON"
    })
        .done(function (response) {
            console.log(response);
            updateDataGrid(response);
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            alert("Falla obteniendo las Categorias");
        });
}

function getCategory(id) {
    $.ajax({
        async: false,
        url: URL_BASE + "/api/Category/" + id,
        type: "GET",
        datatype: "JSON"
    })
        .done(function (response) {
            console.log(response);
            Category = response;
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            console.log("Falla obteniendo los id" + id);
        });
    return Category;

}


function insertCategory() {
    Category = {
        name: $("#category_name").val(),
        description: $("#category_description").val()
    }

    let body = JSON.stringify(Category)
    $.ajax({
        url: URL_BASE + "/api/Category/save",
        type: "POST",
        datatype: "JSON",
        data: body,
        contentType: "application/json;charset=UFT-8"
    })
        .done(function (response) {
            console.log(response);
            alert("Categoria agregada")
            getAllCategory();

        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            alert("Falla creando la nueva Categoria.");
        });
    closeModal();


}

function updateCategory() {
    Category = {
        id: $("#txtId").val(),
        name: $("#category_name").val(),
        description: $("#category_description").val()

    }
    let body = JSON.stringify(Category)
    $.ajax({
        url: URL_BASE + "/api/Category/update",
        type: "PUT",
        datatype: "JSON",
        data: body,
        contentType: "application/json;charset=UFT-8"
    })
        .done(function (response) {
            console.log(response);
            alert("Categoria actualizada");
            getAllCategory();

        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            alert("Falla actualizando la Categoria")
        });
    closeModal();

}

function deleteCategory(id) {
    $.ajax({
        url: URL_BASE + "/api/Category/" + id,
        type: "DELETE",
        datatype: "JSON"
    })
        .done(function (response) {
            console.log(response);
            alert("Categoria eliminado");
            getAllCategory();

        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            alert("falla eliminando la Categoria" + id)

        });
}
