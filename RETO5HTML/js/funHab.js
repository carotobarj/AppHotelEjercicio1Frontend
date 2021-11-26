function consulta() {
    $.ajax({
        url:"http://129.151.111.125:8080/api/Room/all",
        type:"GET",
        datatype:"JSON",
        success:function(response){
            $("#resultado").empty();
            mostrarResultado(response);
            console.log(response);
        }
    });
}

function mostrarResultado(response){
    let rows = '<table>\
                    <tr>\
                        <td>name</td>\
                        <td>hotel</td>\
                        <td>stars</td>\
                        <td>description</td>\
                        <td>category</td>\
                    </tr>';
    for(i = 0; i < response.length; i++){
        rows += '<tr>'
        rows += '<td>' + response[i].name + '</td>';
        rows += '<td>' + response[i].hotel + '</td>';
        rows += '<td>' + response[i].stars + '</td>';
        rows += '<td>' + response[i].description + '</td>';
        rows += '<td>' + response[i].category.name + '</td>'
        rows += '<td> <button onclick="borrar(' + response[i].id + ')"> Borrar </td>';
        rows += '<td> <button onclick="elemEspecifico(' + response[i].id + ')"> Cargar </td>';
        rows += '</tr>';
    }
    rows += '</table>';
    $("#resultado").append(rows);
    

}


function guardarInfo(){
    let datos={
        name:$("#name").val(),
        hotel:$("#hotel").val(),
        stars:$("#stars").val(),
        description:$("#description").val(),
        category:{id: $("#category").val()}, //Buscar como insertar el id a partir del item de la lista
    };
    console.log(datos);
    let datosEnvio = JSON.stringify(datos)
    $.ajax({
        headers: { 
            'Accept': 'application/json',
            'Content-Type': 'application/json' 
        },
        url:"http://129.151.111.125:8080/api/Room/save",
        data:datosEnvio,
        type:"POST",
        datatype:"json",
        success:function(respuesta){
            alert("Información guardada");
            limpiarFormulario();
        }
    });
}

function borrar(idElemento){
    let elemento = {
        id:idElemento,
    }
    console.log(elemento);
    let datoEnvio = JSON.stringify(elemento);
    console.log(datoEnvio);
    $.ajax({
        url:"",
        type:"DELETE",
        data:datoEnvio,
        datatype:"json",
        contentType:'application/json',
        success:function(respuesta){
            $("resultado").empty();
            consulta();
            alert("Elemento eliminado");
        }
    });
}

function elemEspecifico(idItem){
    $.ajax({
        url:"http://129.151.111.125:8080/api/Room/" + idItem,
        type:"GET",
        datatype:"JSON",
        success:function(response){
            console.log(response)
            $("#name").val(response.name),
            $("#hotel").val(response.hotel),
            $("#stars").val(response.stars),
            $("#description").val(response.description),
            $("#category").val(response.category.name)

        }
    });
}

function editar(){
    let datos={
        name:$("#name").val(),
        hotel:$("#hotel").val(),
        stars:$("#stars").val(),
        description:$("#description").val(),
        category:$("#category").val(),
    };
    let datosEnvio = JSON.stringify(datos)
    console.log(datosEnvio);
    $.ajax({
        url:"",
        data:datosEnvio,
        contentType:'application/json',
        type:"PUT",
        datatype:"json",
        success:function(respuesta){
            $("#resultado").empty();
            consulta();
            alert("Información actualizada");
        }
    });
    limpiarFormulario();
}

function limpiarFormulario(){
    $("#name").val("");
    $("#hotel").val("");
    $("#stars").val("");
    $("#category").val("");
    $("#description").val("");
}