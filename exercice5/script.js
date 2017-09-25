$("#connection").submit(function( event ){ //$("#submit").click

    event.preventDefault();

    var username = $("#username").val();
    var password = $("#password").val();

    $.ajax({

        url: "http://localhost/__Ecole%20numerique__/__ELEVES__/Webservices/ServiceHTTP/user/login",
        method: "POST",
        data : {
            username : username,
            password : password
        },
        dataType: "json",
        success: function( data ){

            if( data.success == false ){
                $("#errors").html( data.errors );
            }
            else {
                alert( "Welcome user " + data.user.id );
            }

        },
        error : function( error ){
            console.log(error);
        }

    });

});