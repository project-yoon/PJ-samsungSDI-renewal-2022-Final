$(window).resize(function(){
    if(window.innerWidth <= 1280) {
        $('.move_area').parent().removeClass('content_inner')
    } else {
        $('.move_area').parent().addClass('content_inner')
    }
})