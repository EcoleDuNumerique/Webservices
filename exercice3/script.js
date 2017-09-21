$(document).ready(function(){

    $.ajax({
        url: "http://localhost/__Ecole%20numerique__/__ELEVES__/Webservices/ServiceHTTP/api/departements",
        method: "get",
        dataType: "json",
        success: function( data ){
            
            var options = "";
            for( var item of data ){
                options += "<option value='"+item+"'>"+item+"</option>";
            }
            $("#departement").html( options );

        },
        error : function(error){
            console.log(error);
        }
    });

    $("#departement").change(function(){

        var departement_id = $(this).val();

        $.ajax( {

            url: "http://localhost/__Ecole%20numerique__/__ELEVES__/Webservices/ServiceHTTP/api/ville",
            method: "get",
            dataType: "json",
            data : {
                departement_id : departement_id
            },
            success: function( data ){
                
                var options = "";

                for( var item of data ){
                    options += "<option id='"+item.ville_id+"'>" + item.ville_nom + "</option>";
                }

                $("#ville").html( options );

            },
            error: function( error ){
                console.log( error );
            }

        } );

    });

});