function consulta() {
    $.ajax({
        url:"http://129.151.111.125:8080/api/Client/all",
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
                    <td>id</td>\
                    <td>name</td>\
                    <td>email</td>\
                    <td>age</td>\
                </tr>';
    for(i = 0; i < response.length; i++){
        rows += '<tr>'
        rows += '<td>' + response[i].idClient + '</td>';
        rows += '<td>' + response[i].name + '</td>';
        rows += '<td>' + response[i].email + '</td>';
        rows += '<td>' + response[i].age + '</td>';
        rows += '<td> <button onclick="borrar(' + response[i].idClient + ')"> Borrar </td>';
        rows += '<td> <button onclick="elemEspecifico(' + response[i].idClient + ')"> Cargar </td>';
        rows += '</tr>';
    }
    rows += '</table>';
    $("#resultado").append(rows);
}

function guardarInfo(){
    let datos={
        name:$("#name").val(),
        email:$("#email").val(),
        passowrd:$("#password").val(),
        age:$("#age").val(),
    };
    console.log(datos);
    let datosEnvio = JSON.stringify(datos)
    $.ajax({
        headers: { 
            'Accept': 'application/json',
            'Content-Type': 'application/json' 
        },
        url:"http://129.151.111.125:8080/api/Client/save",
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
        url:"http://129.151.111.125:8080/api/Client/" + idItem,
        type:"GET",
        datatype:"JSON",
        success:function(response){
            console.log(response)
            $("#name").val(response.name),
            $("#email").val(response.email),
            $("#age").val(response.age)
        }
    });
}

function editar(){
    let datos={
        id:$("#id").val(),
        name:$("#name").val(),
        email:$("#email").val(),
        age:$("#age").val(),
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
    $("#id").val("");
    $("#name").val("");
    $("#email").val("");
    $("#password").val("");
    $("#age").val("");
}