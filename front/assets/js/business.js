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

// 탭메뉴
function initSubtab() {
    var tabArea = $(".subTab_cont");

    if (tabArea.length) {
        for (var i = 0; i < tabArea.length; i++) {
            var tabMenu = tabArea.eq(i).find("ul.tab_menu > li"),
                tabItem = tabArea.eq(i).find(".tab_item");
        
            tabMenu.removeClass("on").eq(0).addClass("on");
            tabItem.hide().eq(0).show();
        }
        tabArea.off('click').on('click', "ul.tab_menu button", function () {
            var currTabMenu = $(this).parent().parent().parent().find("ul.tab_menu li"),
                currTabItem = $(this).parent().parent().parent().find(".tab_item"),
                currIdx = $(this).parent().index();
    
            currTabMenu.removeClass("on").eq(currIdx).addClass("on");
            currTabItem.hide().eq(currIdx).show();

            return false
        });
    }
}

$(document).ready(function() {
    initSubtabNaviSticky(); // initSubtabNaviSticky
    initSubtab(); // initSubtab
})