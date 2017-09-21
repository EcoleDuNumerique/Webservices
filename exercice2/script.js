$("button").click(function(){

    var value = $(this).val();

    $.ajax({
        url: "http://localhost/__Ecole%20numerique__/__ELEVES__/Webservices/api",
        method: "get",
        dataType: "json",
        data : {
            festival_id : value
        },
        success: function( data ){
            
            $("#name").html( data.name );
            $("#lat").html( data.lat );
            $("#lng").html( data.lng );

        },
        error: function( error ){
            console.log( error );
        }
    });

});

//Observable - Promise

/*
$.ajax( {

    url : "http://localhost/__Ecole%20numerique__/__ELEVES__/Webservices/api",
    method: "get",
    dataType: "json", //Specifie le type de data récupéré
    success : function( data ){

        console.log( data );

    },
    error : function( error ){

        console.log( data );

    }

} );*/