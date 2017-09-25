$.ajax({
    url: "https://en.wikipedia.org/w/api.php?action=parse&format=json&page=ball",
    method: "get",
    dataType: "json",
    success: function( data ){
        console.log( data );
        if( data.success == true ){

        }
        else if ( data.success == false ){

        }
    },
    error: function( data ){
        console.log( data );
    }
})

function mafunction( data ){
    console.log(data);
    $("body").html( data.parse.text['*'] );

}