
//  위원회 카드 리스트 토글 
function cardListToggle(){
    var card_wrap=$('.card_wrap');
    var toggleCon=card_wrap.find("dl>dd");
    var more_btn=$('.more_btn');

    more_btn.on("click",function() {
        if($(this).parent().hasClass("active") == false) {
            more_btn.removeClass("active");
            toggleCon.slideUp(300);
            $(this).parent().addClass("active");
			$(this).attr("title", "내용닫힘");
            $(this).parent().find('dd').slideDown(300,function() {
                $(window).resize()
            });
        } else if($(this).parent().hasClass("active") == true) {
            $(this).parent().removeClass("active");
			$(this).attr("title", "내용열림");
            $(this).parent().find('dd').slideUp(300,function() {
                $(window).resize()
            });
        }
    })
}


$(document).ready(function() {
    cardListToggle();
})