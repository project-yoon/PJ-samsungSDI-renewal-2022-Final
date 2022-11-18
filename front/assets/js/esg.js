
function popQuickOn() {
    $('.btn_top').on('click', function(){
        var idx = $(this).parent().parent().children('.pop_body').children('.pop_inner')
        $(idx).animate({scrollTop: 0}, 400)
    })
}

$(document).ready(function() {
    popQuickOn();

})