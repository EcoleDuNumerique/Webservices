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

});