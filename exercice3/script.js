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

        $("#ville").change(function(){

            var ville_name = $(this).children("option:selected").html();

            $.ajax({
                url: "http://api.openweathermap.org/data/2.5/weather",
                data: {
                    q: ville_name,
                    APPID: "f16829814995d5543e7fc4290684fe41"
                },
                method: "get",
                dataType: "json",
                success: function( data ){
                   
                    var temp = (data.main.temp - 273.15).toFixed(0);
                    var pressure = data.main.pressure;
                    var humidity = data.main.humidity;
                    var windspeed = data.wind.speed;
                    var icon = data.weather[0].icon;
                    var icon_url = "http://openweathermap.org/themes/openweathermap/assets/vendor/owm/img/widgets/"+ icon +".png";

                    $("#temp").html( "Temperature:" + temp );
                    $("#pressure").html( "Pression:" + pressure );
                    $("#humidity").html( "Humidité:" + humidity );
                    $("#windspeed").html( "Vitesse vent:" + windspeed );
                    $("#icon").attr("src", icon_url);

                },
                error: function( error ){
                    console.log( error );
                }
            });

        });
    
});