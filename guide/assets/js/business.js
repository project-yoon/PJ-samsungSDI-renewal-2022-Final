//initSubtabNaviSticky
function initSubtabNaviSticky() {
    var header = $("header.header");
    var gnb = header.find(">nav.gnb");
    var subtabNavi = $("#sub_tab_navi");
    var sntabOfsTop;
    var subContents = $(".wrap"); 
    var subFeatures = $("#business_features"); 
	
    $(window).on("load resize orientationchange",function() {
		if($(window).width() > 720 && $(window).width() <= 1480) {
            if(subContents.length > 0) {
				sntabOfsTop = subContents.outerHeight() + subFeatures.height() + 300;
			}
        } else if($(window).width() <= 720) {
            if(subContents.length > 0) {
				sntabOfsTop = subContents.outerHeight() + subFeatures.height() - 100;
			}
        } else {
             if(subContents.length > 0) {
				sntabOfsTop = subContents.outerHeight() + subFeatures.height() + 250;
			}
        }       
    })

    $(window).on("load scroll",function() {
        if(subtabNavi.length > 0) {
            if($(window).scrollTop() >= sntabOfsTop) {
                subtabNavi.addClass("fixed");
            } else if($(window).scrollTop() < sntabOfsTop) {
                subtabNavi.removeClass("fixed");
            }
        }
    })
}

$(document).ready(function() {
	initSubtabNaviSticky(); // initSubtabNaviSticky
})