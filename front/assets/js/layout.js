//Header cookie setting
function initPopCookieSet() {
    function setCookie(name, value, expirehours) {
        var todayDate = new Date();
        todayDate.setHours(todayDate.getHours() + expirehours);
        document.cookie = name + "=" + escape(value) + "; path=/; expires=" +
                todayDate.toGMTString() + ";"
    }
    function closeWin(id, checkbox) {
        if (checkbox.checked) {
            setCookie(id, "done", 1);
        }
        $(this)
            .closest('.popup')
            .fadeOut();
    }
    cookiedata = document.cookie;
}

//New! Header GNB
function initHeaderGNB(){
    var GNB = $('.gnb');
    var depth_2_height= $('.depth').outerHeight() + $('.depth_menu').outerHeight();
    GNB
        .find('>ul>li.depth>a') // depth1
        .on('mouseenter',function(e){
            e.preventDefault();
            GNB
                .find('>ul>li>.depth_menu:visible') // depth2
                .hide()
                .parent('li')
                .removeClass('active');
            GNB
                .find('>ul>li>.depth_menu>ul>li')
                .siblings('.more')
                .removeClass('open');
            $(this)
                .next('.depth_menu:hidden') // depth2
                .show()
                .parent('li')
                .addClass('active');
            GNB.parent('.header').css({'height':depth_2_height});
            GNB.parent('.header').css({'overflow':'hidden'});
            

        })
        .focus(function(){
            $(this).mouseover();
        })
        .end().mouseleave(function(){
            GNB
                .find('>ul>li>.depth_menu:visible')
                .hide()
                .parent('li')
                .removeClass('active');
            GNB
                .find('>ul>li>.depth_menu>ul>li')
                .siblings('.more')
                .removeClass('open');
            GNB.parent('.header').css({'height':'80px'});
            GNB.parent('.header').css({'overflow':''});
        })
        .find('li').last().find('.depth_detail').focusout(function(){
            $(this).mouseleave();
        });

    var depth_2_list = $('.depth_menu>ul>li');
    depth_2_list.off('click').on('click',function(){
        if($(this).hasClass('more') == true){
            var depth_3_heightMax=0;
            $(".depth_detail").each(function(){
                var depth_now_height = parseInt($(this).css("height"));
                if(depth_3_heightMax<depth_now_height){ depth_3_heightMax = depth_now_height;}
            });
            $(".depth_detail").each(function(){
                GNB.parent('.header').css({'height':depth_3_heightMax+depth_2_height});
            });
            if($(this).hasClass('open') ==true){
                $(this).removeClass('open');
                $(this).siblings('.more').removeClass('open');
                GNB.parent('.header').css({'height':depth_2_height});
                // e.stopPropagation();
                return false;
            }
            else{
                $(this).addClass('open');
                $(this).siblings('.more').addClass('open');
                // e.stopPropagation();
                return false;
            };
            
        }else{
            e.preventDefault();
            e.stopPropagation();
            return false;
        };
    });
    depth_2_list.mouseleave(function(){
            $(this).focusout();
    });
}

//Header & Sitemap User Menu
function initHeaderSitemapLangauage() {
    var userMenu = $("header.header").find("nav.user_menu")
    var btnLanguage = userMenu.find(">ul>li>button.btn_language");

    btnLanguage.off('click').on('click',function(e) {
        tBtn = $(this);
        tBtn.attr("disabled",true);

        if(tBtn.hasClass("active") == false) {
            tBtn.addClass("active");
            tBtn.next("ul.language").slideDown(300,function() {
                tBtn.attr("disabled",false);
            });
        } else if(tBtn.hasClass("active") == true) {
            tBtn.removeClass("active");
            tBtn.next("ul.language").slideUp(300,function() {
                tBtn.attr("disabled",false);
            });
        }

        e.stopPropagation()
    })

    $("html,body").off('click').on('click',function() {
        if(btnLanguage.hasClass("active") == true) {
            btnLanguage.removeClass("active");
            btnLanguage.next("ul.language").slideUp(300);
        }
    })
    userMenu.on("mouseleave",function() {
        if(btnLanguage.hasClass("active") == true) {
            btnLanguage.removeClass("active");
            btnLanguage.next("ul.language").slideUp(300);
        }
    })
}
// keyinfo
function initKeyinfoBtn() {
    $('.btn_keyinfo').off('click').on('click', function () {
        $('.keyinfo').fadeIn();
    });
    $('.keyinfo .close').off('click').on('click', function () {
        $('.keyinfo').fadeOut();
    });
}
//Search Popup
function initSearchBtn() {
	$(".btn_search").click(function () {
		$('html, body').css("overflow","hidden")
		$("#popup_search").css("display","block");
	});
	$(".close_btn").click(function () {
		$("#popup_search").css("display", "none")
		$('html, body').css("overflow","visible")
	});
}
//Sitemap GNB
function initSitemapGnb() {
    var header = $("header.header");
    var hUserMenu = header.find("nav.user_menu");
    var btnSitemap = hUserMenu.find(">ul>li>button.btn_sitemap");
    var sitemap = $("aside#sitemap");
    var sGnb = sitemap.find("nav.gnb");
	var gItem = sGnb.find("ul>li");
    var sUserMenu = sitemap.find("nav.user_menu");
    var btnClose = sUserMenu.find(">button.btn_close");
    var bgModal = $("#bg_modal");
    var sitemapOpenIs = false;
    var dist = function() {
        return window.innerWidth - document.documentElement.offsetWidth
    }
	var pannel = $(".pannel");
	var pannelLanguage = $(".pannel_util ul a");
	var pannelClose = pannel.find(".close a");

    btnSitemap.off('click').on('click',function() {
        sitemapOpenIs = true
        sUserMenu.css({"right": dist()+"px"})
        bodyOverflowAntiShaking(sitemapOpenIs); 
        //body overflow 처리 및 그로 인한 레이아웃 흔들림 방지
            
		var winW = $(window).width();
		if(winW > 1919){
			pannel.fadeIn(300).addClass('on');
		}else{
			sitemap.fadeIn(300).addClass('on');	
			bgModal.css({"opacity": 0.8})
	        bgModal.fadeIn(300);
		}
    })
	// 패널 끄기
	pannelClose.off('click').on('click', function(e){
		e.preventDefault();

		pannel.fadeOut(300).removeClass('on');	
        sitemapOpenIs = false;
        bodyOverflowAntiShaking(sitemapOpenIs); 
	});
    // 언어 교체 토글
    pannelLanguage.off('click').on('click',function() {
        $(this).parent('li').addClass('on').siblings().removeClass('on');
    });
	
	// 패널 반응형
	$(window).on("resize", function(){
		var winW = $(window).width();

		if(winW > 1919 && sitemap.hasClass('on')){
			sitemap.fadeOut(300).removeClass('on');
			pannel.fadeIn(300).addClass('on');
		}
		
		if(winW <= 1919 && pannel.hasClass('on')){
			sitemap.fadeIn(300).addClass('on');
			pannel.fadeOut(300).removeClass('on');
		}
	});
	
	sGnb.find("> ul > li > a").off('click').on('click',function() {
        if($(this).hasClass("active") == false) {
			sGnb.find("ul>li>a").removeClass("active");
			sGnb.find("ul>li>ul").removeAttr("style");
            $(this).addClass("active")
            $(this).next().next().slideDown(300);
        } else if($(this).hasClass("active") == true) {
            $(this).removeClass("active")
            $(this).next().next().slideUp(300);
        }
    })

	/*
    sGnb.find("button.depth_open").off('click').on('click',function() {
        if($(this).parent().find(">a").hasClass("active") == false) {
			sGnb.find("ul>li>a").removeClass("active");
			sGnb.find("ul>li>ul").removeAttr("style");
            $(this).parent().find(">a").addClass("active")
            $(this).next().slideDown(300);
        } else if($(this).parent().find(">a").hasClass("active") == true) {
            $(this).parent().find(">a").removeClass("active")
            $(this).next().slideUp(300);
        }
    })
	*/
	
	sGnb.find("> ul > li > ul > li > a").off('click').on('click',function() {
        if($(this).hasClass("active") == false) {
			sGnb.find("ul>li>ul>li>a").removeClass("active");
			sGnb.find("ul>li>ul>li>ul").removeAttr("style");
            $(this).addClass("active")
            $(this).next().next().slideDown(300);
        } else if($(this).hasClass("active") == true) {
            $(this).removeClass("active")
            $(this).next().next().slideUp(300);
        }
    })

	/*
	sGnb.find("button.depth_detail_open").off('click').on('click',function() {
        if($(this).parent().find(">a").hasClass("active") == false) {
			sGnb.find("ul>li>ul>li>a").removeClass("active");
			sGnb.find("ul>li>ul>li>ul").removeAttr("style");
            $(this).parent().find(">a").addClass("active")
            $(this).next().slideDown(300);
        } else if($(this).parent().find(">a").hasClass("active") == true) {
            $(this).parent().find(">a").removeClass("active")
            $(this).next().slideUp(300);
        }
    })
	*/
    btnClose.off('click').on('click',function() {
        sitemap.css({
            "right": "-"+dist()+"px"
        })
        $("body").css({
            "overflow":""
        });
        sitemap.fadeOut(300).removeClass('on');
        sitemapOpenIs = false;
        bgModal.fadeOut(300,function() {
            sitemap.css({
                "right": ""
            })
            bodyOverflowAntiShaking(sitemapOpenIs); //body overflow 처리 및 그로 인한 레이아웃 흔들림 방지
        });
    })

    $(window).on("resize orientationchange",function() {
        bodyOverflowAntiShaking(sitemapOpenIs) //body overflow 처리 및 그로 인한 레이아웃 흔들림 방지
    })
}

//Header & Sub Navi Sticky
function initHeaderSubNaviSticky() {
    var header = $("header.header");
    var gnb = header.find(">nav.gnb");
    var subVIsual = $("#sub_visual");
    var subNavi = $("#sub_navi");
    var pageLinksNavi = subNavi.find("nav.page_links");
    var snOfsTop;
    var subContents = $(".wrap");
    
    if(subVIsual.length == 0) {
        if(subContents.length > 0) {
            header.addClass("on")
        }
        return false;
    }

    $(window).on("load resize orientationchange",function() {
        if(subVIsual.length > 0) {
            snOfsTop = subVIsual.outerHeight();
        }
    })

    $(window).on("load scroll",function() {
        if(header.length > 0) {
            if($(window).scrollTop() >= 10) {
                header.addClass("on")
            } else if($(window).scrollTop() < 10) {
                header.removeClass("on")
            }
            //console.log(snOfsTop)
        }
        if(subNavi.length > 0) {
            if($(window).scrollTop() >= snOfsTop) {
                subNavi.addClass("fixed");
            } else if($(window).scrollTop() < snOfsTop) {
                subNavi.removeClass("fixed");
            }
        }
    })

    gnb.find(">ul>li>a").on("focus",function() {
        if(subNavi.hasClass("fixed")) {
            header.css({
                "z-index": 11
            })
        }
    })

    pageLinksNavi.find("button.btn_select").on("focus",function() {
        if(subNavi.hasClass("fixed")) {
            header.css({
                "z-index": ""
            })
        }
    })
}
//Sub Visual
function initSubVisual() {
    if($("#sub_visual").length == 0) { return false; }

    var subVIsual = $("#sub_visual");
    var subNavi = $("#sub_navi");
    var btnScrolldown = subVIsual.find(".btn_scrolldown img");

    $(window).on("load resize orientationchange",function () {
        if(subVIsual.hasClass("full") && navigator.userAgent.toLowerCase().indexOf("iphone") > -1 || subVIsual.hasClass("full") && navigator.userAgent.toLowerCase().indexOf("ipad") > -1) {
            subVIsual.css({
                "height": $(window).height()+"px"
            })
        } else {
            subVIsual.css({
                "height": ""
            })
        }
    })

    btnScrolldown.off('click').on('click',function() {
        $("html,body").animate({
            "scrollTop": subVIsual.outerHeight()
        },300)
    })
}

//Top Move
function initTopMove() {
	var btnTopMove = $(".quick");
	var btmHeight;
	var btmPosBottom;
	var footerWrap = $("#footer_wrap");
	var fOffsetTop;
	
	$(window).on("load resize scroll orientationchange",function() {
		btmHeight = btnTopMove.outerHeight();
		fOffsetTop = footerWrap.offset().top;
		
		if($(window).width() > 1280) {
			if($(window).scrollTop() > $(window).height()/4) {
				btnTopMove.fadeIn(200)
				
				if($(window).scrollTop() > fOffsetTop - $(window).height()) {
					btnTopMove.css({
						"position": "absolute",
						"bottom":"auto",
						"top": fOffsetTop - btmHeight - 24 + "px"
					})
				} else if($(window).scrollTop() <= fOffsetTop - $(window).height()) {
					btnTopMove.css({
						"position": "",
						"bottom":"",
						"top": ""
					})
				}
				
			} else if($(window).scrollTop() <= $(window).height()/4) {
				btnTopMove.fadeOut(200)
			}
		} else if($(window).width() <= 1280) {
			if($(window).scrollTop() > $(window).height()/4) {
				btnTopMove.fadeIn(200)	
				
				if($(window).scrollTop() > fOffsetTop - $(window).height()) {
					btnTopMove.css({
						"position": "absolute",
						"bottom":"auto",
						"top": fOffsetTop - btmHeight - 24 + "px"
					})
				} else if($(window).scrollTop() <= fOffsetTop - $(window).height()) {
					btnTopMove.css({
						"position": "",
						"bottom":"",
						"top": ""
					})
				}
				
			} else if($(window).scrollTop() <= $(window).height()/4) {
				btnTopMove.fadeOut(200)
			}
		}
	})
	
	
	btnTopMove.find(".btn_top").off('click').on('click',function() {
		$("html,body").animate({
			"scrollTop":0
		},50)
	})
}
//body overflow 처리 및 그로 인한 레이아웃 흔들림 방지
function bodyOverflowAntiShaking(overflowHiddenIs) {
    var header = $("header.header");
    var hUserMenu = header.find("nav.user_menu");
    var hGnb = header.find("nav.gnb");
    var container = $("main#container");
    var mainVisual = container.find("#main_visual");
    var subVisual = container.find("#sub_visual");
    var subNavi = container.find("#sub_navi");
    var contentsMove = subNavi.find("nav.contents_move");
    var contents = container.find("section.content");
    var mainDecoration = container.find("#main_decoration");
    var footer = $("footer#footer");
    var dist = function() {
        //console.log(window.innerWidth+ " , "+document.documentElement.offsetWidth)
        return parseInt(window.innerWidth - document.documentElement.offsetWidth)
    }

    if(overflowHiddenIs == true) {
        hGnb.css({"transform":"translateX(-"+dist()+"px)"});
        hUserMenu.css({"transform":"translateX(-"+dist()+"px)"});
        mainVisual.css({"width":"calc(100% - "+dist()+"px)"});
        subVisual.css({"width":"calc(100% - "+dist()+"px)"});
        contentsMove.css({"transform":"translateX(-"+dist()+"px)"});
        contents.css({"width":"calc(100% - "+dist()+"px)"});
        mainDecoration.css({"width":"calc(100% - "+dist()+"px)"});
        footer.find(".family_site,p.copyright").css({"transform":"translateX(-"+dist()+"px)"});
        $("body").css({"overflow":"hidden"});
    } else if(overflowHiddenIs == false) {
        hGnb.css({"transform":""});
        hUserMenu.css({"transform":""});
        mainVisual.css({"width":""});
        subVisual.css({"width":""});
        contentsMove.css({"transform":""});
        contents.css({"width":""});
        mainDecoration.css({"width":""});
        footer.find(".family_site,p.copyright").css({"transform":""});
        $("body").css({"overflow":""});
    }
}

function popEffect() {
	$('.popOpen').off('click').on('click', function(){
		$('#bg_modal').show()

        if($('.popup.full_modal')) {
            $('#bg_modal').hide()
        }
		$('html, body').css('overflow','hidden')
	})

	$('.popup .btn_close button, .popup .cancel, .popup .close').off('click').on('click', function(){
		$('.popup').hide()
		$('#bg_modal').hide()
		$('html, body').css('overflow','visible')
	})
}

$(document).ready(function() {
	if($(".quick").length > 0) {
		initTopMove(); //Top move
	}
    initPopCookieSet(); // cookie setting
	// initHeaderGnb(); Header GNB
    initHeaderGNB(); //New! Header GNB
    initHeaderSitemapLangauage(); //Header & Sitemap User Menu
    initSearchBtn();
    initKeyinfoBtn();
    initSitemapGnb(); //Sitemap GNB
    initHeaderSubNaviSticky() //Header & Sub Navi Sticky
    initSubVisual(); //Sub Visual
    popEffect()//popup
})