$(window).resize(function(){
    if(window.innerWidth <= 720) {
        $('.btn_zoom').on('click', function(){
            $('.popup.img_modal').show()
        })
    }else if(window.innerWidth > 720) {
        $('.popup.img_modal').hide()
        $('#bg_modal').hide()
    }

    $('.btn_close').on('click', function(){
        $('.popup').hide()
       })
})

$(document).ready(function() {
   $('.btn_faq').on('click', function(){
    $('html,body').css('overflow','hidden')
    $('.popup').attr('tabindex','0').show().focus()
   })

   $('.btn_close').on('click', function(){
    $('.popup').hide()
    $('html,body').css('overflow','visible')
   })
})