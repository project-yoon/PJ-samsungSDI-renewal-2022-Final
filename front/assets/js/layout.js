//Header GNB
function initHeaderGnb() {
    var header = $("header.header");
    var gnb = header.find(">nav.gnb");
    var gDeps1List = gnb.find(">ul");
    var gDeps1Item = gDeps1List.find(">li");
    var currentDeps1Num = gDeps1List.find(">li>a.active").parent().index();
    var gDeps2List = gDeps1Item.find(">.deps_navi")
    var bgModal = $("#bg_gnb_modal");
    var deps2OpenIs = false;
    var maxTitHeight = 0;

    gDeps1Item.find(">a").on("mouseenter focusin",function(e) {
        currentDeps2Menu = $(this).next(".deps_navi");
        gDeps1Item.find(">a").removeClass("active");
        $(this).addClass("active");
        if(header.hasClass("gnb_open") == false) {
            header.addClass("gnb_open")

            bgModal.removeAttr("style")
            bgModal.css({"opacity":0.6})
            bgModal.stop().delay(100).fadeIn(300)

            
        } else if(header.hasClass("gnb_open") == true && $(this).next(".deps_navi").length == 0) {
            gDeps2List.stop().slideUp(150);
            deps2OpenIs = false;
        }

        if($(this).next(".deps_navi").length > 0 && $(this).next(".deps_navi").is(":visible") == false) {
            setTimeout(function() {
                currentDeps2Menu.find(">ul>li").each(function(i) {
                    if(currentDeps2Menu.find(">ul>li").eq(i).find(">a").height() > currentDeps2Menu.find(">ul>li").eq(i-1).find(">a").height()) {
                        maxTitHeight = currentDeps2Menu.find(">ul>li").eq(i).find(">a").height()
                    }
                })

                if(maxTitHeight > 0) {
                    currentDeps2Menu.find(">ul>li").find(">a").css({
                        "height": maxTitHeight+"px"
                    })
                }
            },150)
            gDeps2List.stop().slideUp(150);
            currentDeps2Menu.stop().delay(100).slideDown(300);
            maxTitHeight = 0
            deps2OpenIs = true;
        }

        e.stopPropagation();
    })

    gnb.on("mouseleave",closeDepsMenu)
    //header.find("h1, nav.user_menu").on("mouseenter",closeDepsMenu)
    header.find("h1>a, nav.user_menu>ul>li>button").on("focusin",closeDepsMenu)

    function closeDepsMenu() {
        if(header.hasClass("gnb_open") == true) {
            if(deps2OpenIs == true) {
                gDeps2List.stop().slideUp(300,function() {
                    setTimeout(function() {
                        gDeps2List.hide();
                    } ,300)
                })
                bgModal.stop().fadeOut(300,function() {
                    header.removeClass("gnb_open")
                    gDeps1Item.find(">a").removeClass("active");
                    gDeps2List.hide();
                    if(currentDeps1Num >= 0) {
                        gDeps1Item.eq(currentDeps1Num).find(">a").addClass("active");
                    }
                })

                deps2OpenIs = false
            } else {
                gDeps1Item.find(">a").removeClass("active");
                if(currentDeps1Num >= 0) {
                    gDeps1Item.eq(currentDeps1Num).find(">a").addClass("active");
                }
                bgModal.stop().fadeOut(300,function() {
                    header.removeClass("gnb_open")
                })
            }
        }
    }
}

//Header & Sitemap User Menu
function initHeaderSitemapLangauage() {
    var userMenu = $("header.header").find("nav.user_menu")
    var btnLanguage = userMenu.find(">ul>li>button.btn_language");

    btnLanguage.on("click",function(e) {
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

    $("html,body").on("click",function() {
        if(btnLanguage.hasClass("active") == true) {
            btnLanguage.removeClass("active");
            btnLanguage.next("ul.language").slideUp(300);
        }
    })
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
	var pannelClose = pannel.find(".close a");

    btnSitemap.on("click",function() {
        sitemapOpenIs = true
        sUserMenu.css({"right": dist()+"px"})
        bodyOverflowAntiShaking(sitemapOpenIs); //body overflow 처리 및 그로 인한 레이아웃 흔들림 방지
            
		var winW = $(window).width();
		if(winW > 1280){
			pannel.fadeIn(300).addClass('on');
		}else{
			sitemap.fadeIn(300).addClass('on');	
			bgModal.css({"opacity": 0.8})
	        bgModal.fadeIn(300);
		}
    })
	// 패널 끄기
	pannelClose.on("click", function(e){
		e.preventDefault();

		pannel.fadeOut(300).removeClass('on');	
	});
	
	// 패널 반응형
	$(window).on("resize", function(){
		var winW = $(window).width();

		if(winW > 1280 && sitemap.hasClass('on')){
			sitemap.fadeOut(300).removeClass('on');
			pannel.fadeIn(300).addClass('on');
		}
		
		if(winW <= 1280 && pannel.hasClass('on')){
			sitemap.fadeIn(300).addClass('on');
			pannel.fadeOut(300).removeClass('on');
		}
	});
	
	sGnb.find("> ul > li > a").on("click",function() {
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
    sGnb.find("button.btn_open_deps").on("click",function() {
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
	
	sGnb.find("> ul > li > ul > li > a").on("click",function() {
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
	sGnb.find("button.btn_open_deps2").on("click",function() {
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
    btnClose.on("click",function() {
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

    btnScrolldown.on("click",function() {
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
	
	
	btnTopMove.find(".btn_top").on("click",function() {
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

$(document).ready(function() {
	if($(".quick").length > 0) {
		initTopMove(); //Top move
	}
	initHeaderGnb(); //Header GNB
    initHeaderSitemapLangauage(); //Header & Sitemap User Menu
    initSitemapGnb(); //Sitemap GNB
    initHeaderSubNaviSticky() //Header & Sub Navi Sticky
    initSubVisual(); //Sub Visual
})