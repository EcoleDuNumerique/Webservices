var dots = ".";
var $dots = $("#dots");
var inter = setInterval(function(){

    $dots.text( dots );
    dots += ".";

    if( dots.length >= 12 ){
        clearInterval( inter );
        $(".preloader").remove();
    }   

}, 100);