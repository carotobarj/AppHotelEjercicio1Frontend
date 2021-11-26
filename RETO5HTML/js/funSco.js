function consulta() {
    $.ajax({
        url:"http://129.151.111.125:8080/api/Score/all",
        type:"GET",
        datatype:"JSON",
        success:function(response){
            console.log(response)
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
                    <td>message text</td>\
                    <td>reservation id</td>\
                </tr>';
    for(i = 0; i < response.length; i++){
        rows += '<tr>'
        rows += '<td>' + response[i].idScore + '</td>';
        rows += '<td>' + response[i].messageText + '</td>';
        rows += '<td>' + response[i].stars + '</td>';
        rows += '<td> <button onclick="borrar(' + response[i].idScore + ')"> Borrar </td>';
        rows += '<td> <button onclick="elemEspecifico(' + response[i].idScore + ')"> Cargar </td>';
        rows += '</tr>';
    }
    rows += '</table>';
    $("#resultado").append(rows);

}

function guardarInfo(){
    let datos={
        messageText:$("#messageText").val(),
        stars:$("#stars").val(),
        reservation:{reservation:$("#idReservation").val()},
    };
    let datosEnvio = JSON.stringify(datos)
    console.log(datos)
    console.log(datosEnvio);
    $.ajax({
        headers: { 
            'Accept': 'application/json',
            'Content-Type': 'application/json' 
        },
        url:"http://129.151.111.125:8080/api/Score/save",
        data:datosEnvio,
        type:"POST",
        datatype:"json",
        success:function(respuesta){
            alert("Información guardada");
            limpiarFormulario();
        }
    });
}


function elemEspecifico(idItem){
    $.ajax({
        url:"http://129.151.111.125:8080/api/Score/" + idItem,
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta)
            $("#stars").val(respuesta.stars),
            $("#messageText").val(respuesta.messageText)
            $("#idReservation").val(respuesta.reservation.idReservation)
        }
    });
}


function limpiarFormulario(){
    $("#stars").val("");
    $("#messageText").val("");
    $("#idReservation").val("");
}