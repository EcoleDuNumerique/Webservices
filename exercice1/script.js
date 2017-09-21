$.ajax( {
    url : "img.json",
    method : "get",
    success : function( data ){
        
        var array1 = data.img;

        for( var tr of array1 ) {

            var $tr = $("<tr></tr>");
            $("tbody").append( $tr );

            for( var td of tr ){
                
                var $td = $("<td></td>");
                $tr.append( $td );

                if(td == 1){
                    $td.addClass("black");
                }

            }

        }

    },
    error : function( error ){
        console.log( error );
    }
} );