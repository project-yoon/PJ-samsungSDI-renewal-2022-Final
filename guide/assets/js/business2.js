// 메인 Our People
function initOurPeople() {
    var ourPeople = $("section#our_people");
    var opOfsTop;
    var opHeight;
    var opIntro = ourPeople.find(".op_intro");
    var introTop;

    $(window).on("load resize orientationchange",function() {
        opOfsTop = ourPeople.offset().top;
        opHeight = ourPeople.outerHeight();
		introTop = parseInt(opIntro.css("top"));
    })

    $(window).on("load scroll",function() {
        if($(window).width() > 1480) {
            if($(window).scrollTop() >= opOfsTop + (introTop/2) && $(window).scrollTop() <= opOfsTop + opHeight - $(window).height()) {
                opIntro.css({
                    "position": "fixed",
                    "top": introTop/2 + "px"
                })
            } else if($(window).scrollTop() < opOfsTop + (introTop/2)) {
                opIntro.css({
                    "position": "",
                    "top": ""
                })				
            } else if($(window).scrollTop() > opOfsTop + opHeight - $(window).height()) {
                opIntro.css({
                    "position": "absolute",
                    "top": (opHeight - $(window).height() + (introTop/2))+"px"
                })				
            }
        } else {
            opIntro.css({
                "position": "",
                "top": ""
            })			
        }
		if(ourPeople.length > 0) {
            if($(window).scrollTop() >= opOfsTop - 200) {
                ourPeople.addClass("fixed");
            } else if($(window).scrollTop() < opOfsTop - 250 ) {
                ourPeople.removeClass("fixed");
            }
        }
    })
}

$(document).ready(function() {
    initOurPeople();  // 메인 Our People
})