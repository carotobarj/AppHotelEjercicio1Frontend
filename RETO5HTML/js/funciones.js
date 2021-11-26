function traerInformacion() {
    $.ajax({
        url:"http://129.151.111.125:8080/",
        type:"GET",
        datatype:"JSON",
        succes:function(respuesta){
            console.log(respuesta);
            mostrarRespuesta(respuesta.items);
            }
        });
}

function mostrarRespuesta(items){

    let myTable="<Table>";
    for(i=0;i<items.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+items[i].id+"</td>";
        myTable+="<td>"+items[i].room+"</td>";
        myTable+="<td>"+items[i].stars+"</td>";
        myTable+="<td>"+items[i].category_id+"</td>";
        myTable+="<td>"+items[i].description+"</td>";
    }
    myTable+="</Table>"
    $("#resultado").append(myTable);
}
