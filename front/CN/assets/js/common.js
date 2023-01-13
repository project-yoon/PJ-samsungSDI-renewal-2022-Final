//Header cookie setting
function initPopCookieSet() {
  function setCookie(name, value, expirehours) {
    var todayDate = new Date();
    todayDate.setHours(todayDate.getHours() + expirehours);
    document.cookie =
      name +
      "=" +
      escape(value) +
      "; path=/; expires=" +
      todayDate.toGMTString() +
      ";";
  }
  function closeWin(id, checkbox) {
    if (checkbox.checked) {
      setCookie(id, "done", 1);
    }
    $(this).closest(".popup").fadeOut();
  }
  cookiedata = document.cookie;
}
// full type check
function Full_GNB_CHK() {
  const subEl = document.querySelector(".sub_visual");
  const fullEl = document.querySelector('.full');
  const windowWidth = $(window).width() <= 720;
  if (subEl !== null && windowWidth != true) {
    $(window).on("load scroll", function () {
      const SCR_curr = $(this).scrollTop();
      if (SCR_curr == 0) {
        GNB_TRANSPARENT();
        $("nav.gnb")
          .on("mouseenter", function () {
            GNB_FULLCOLOR();
          })
          .on("mouseleave", function () {
            GNB_TRANSPARENT();
          });
      } else if (SCR_curr > 0) {
        GNB_FULLCOLOR();
        $("nav.gnb")
          .on("mouseenter", function () {
            GNB_FULLCOLOR();
          })
          .on("mouseleave", function () {
            GNB_FULLCOLOR();
          });
      } else {
        GNB_TRANSPARENT();
        $("nav.gnb")
          .on("mouseenter", function () {
            GNB_FULLCOLOR();
          })
          .on("mouseleave", function () {
            GNB_TRANSPARENT();
          });
      }
    });
  } else {
    GNB_FULLCOLOR();
        $('nav.gnb')
        .on("mouseenter",function() {
            GNB_FULLCOLOR();
        })
        .on("mouseleave",function() {
            GNB_FULLCOLOR();
        })
        if (fullEl !== null){
            $(window).on("load scroll",function() {
                const SCR_curr = $(this).scrollTop();
                if (SCR_curr == 0) {
                    GNB_TRANSPARENT();
                    $('nav.gnb')
                    .on("mouseenter",function() {
                        GNB_FULLCOLOR();
                    })
                    .on("mouseleave",function() {
                        GNB_TRANSPARENT();
                    })
                }else if (SCR_curr > 0 ) {
                    GNB_FULLCOLOR();
                    $('nav.gnb')
                    .on("mouseenter",function() {
                        GNB_FULLCOLOR();
                    })
                    .on("mouseleave",function() {
                        GNB_FULLCOLOR();
                    })
                } else {
                    GNB_TRANSPARENT();
                    $('nav.gnb')
                    .on("mouseenter",function() {
                        GNB_FULLCOLOR();
                    })
                    .on("mouseleave",function() {
                        GNB_TRANSPARENT();
                    })
                }
            });
        }
  }
  function GNB_TRANSPARENT() {
    $(".header").removeClass("on");
    $(".header").css({ background: "transparent" });
  }
  function GNB_FULLCOLOR() {
    $(".header").addClass("on");
    $(".header").css({ background: "#fff" });
  }
}
//New! Header GNB
function initHeaderGNB() {
  var GNB = $(".gnb");
  var depth_2_height = $(".depth").outerHeight() + $(".depth_menu").outerHeight();

  //header height resize
  $(window).on('resize', function () {
    depth_2_height = $(".depth").outerHeight() + $(".depth_menu").outerHeight();
  })
  
  GNB.find(">ul>li.depth>a") // depth1
    .on("mouseenter", function (e) {
      e.preventDefault();
      GNB.find(">ul>li>.depth_menu:visible") // depth2
        .hide()
        .parent("li")
        .removeClass("active");
      GNB.find(">ul>li>.depth_menu>ul>li")
        .siblings(".more")
        .removeClass("open");
      $(this)
        .next(".depth_menu:hidden") // depth2
        .show()
        .parent("li")
        .addClass("active");
      GNB.parent(".header").css({ height: depth_2_height });
      GNB.parent(".header").css({ overflow: "hidden" });
    })
    .focus(function () {
      $(this).mouseover();
    })
    .end()
    .mouseleave(function () {
      GNB.find(">ul>li>.depth_menu:visible")
        .hide()
        .parent("li")
        .removeClass("active");
      GNB.find(">ul>li>.depth_menu>ul>li")
        .siblings(".more")
        .removeClass("open");
      GNB.parent(".header").css({ height: "80px" });
      GNB.parent(".header").css({ overflow: "" });
    })
    .find("li")
    .last()
    .find(".depth_detail")
    .focusout(function () {
      $(this).mouseleave();
    });

  var depth_2_list = $(".depth_menu>ul>li");
  depth_2_list.off("click").on("click", function () {
    if ($(this).hasClass("more") == true) {
      var depth_3_heightMax = 0;
      $(".depth_detail").each(function () {
        var depth_now_height = parseInt($(this).css("height"));
        if (depth_3_heightMax < depth_now_height) {
          depth_3_heightMax = depth_now_height;
        }
      });
      $(".depth_detail").each(function () {
        GNB.parent(".header").css({
          height: depth_3_heightMax + depth_2_height + 20,
        });
      });
      if ($(this).hasClass("open") == true) {
        $(this).removeClass("open");
        $(this).siblings(".more").removeClass("open");
        GNB.parent(".header").css({ height: depth_2_height });
        e.stopPropagation();
        return false;
      } else {
        $(this).addClass("open");
        $(this).siblings(".more").addClass("open");
        // e.stopPropagation();
        return false;
      }
    } else {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
  });
  depth_2_list.mouseleave(function () {
    $(this).focusout();
  });
}
//Header & Sitemap User Menu
function initHeaderSitemapLangauage() {
  var userMenu = $("header.header").find("nav.user_menu");
  var btnLanguage = userMenu.find(">ul>li>button.btn_language");

  btnLanguage.off("click").on("click", function (e) {
    tBtn = $(this);
    tBtn.attr("disabled", true);

    if (tBtn.hasClass("active") == false) {
      tBtn.addClass("active");
      tBtn.next("ul.language").slideDown(300, function () {
        tBtn.attr("disabled", false);
      });
    } else if (tBtn.hasClass("active") == true) {
      tBtn.removeClass("active");
      tBtn.next("ul.language").slideUp(300, function () {
        tBtn.attr("disabled", false);
      });
    }

    e.stopPropagation();
  });

  $("html,body")
    .off("click")
    .on("click", function () {
      if (btnLanguage.hasClass("active") == true) {
        btnLanguage.removeClass("active");
        btnLanguage.next("ul.language").slideUp(300);
      }
    });
  userMenu.on("mouseleave", function () {
    if (btnLanguage.hasClass("active") == true) {
      btnLanguage.removeClass("active");
      btnLanguage.next("ul.language").slideUp(300);
    }
  });
}
// keyinfo
function initKeyinfoBtn() {
  $(".btn_keyinfo")
    .off("click")
    .on("click", function () {
      $(".keyinfo").fadeIn();
      $('body').css({
        'height': '100vh',
        'overflow':'hidden'
      })

    });
  $(".keyinfo .close")
    .off("click")
    .on("click", function () {
      $('body').css({
        'height': 'auto',
        'overflow':'unset'
      })
      $(".keyinfo").fadeOut();
    });
}
//Search Popup
function initSearchBtn() {
  $(".btn_search").click(function () {
    $("html, body").css("overflow", "hidden");
    $("#popup_search").css("display", "block");
  });
  $(".close_btn").click(function () {
    $("#popup_search").css("display", "none");
    $("html, body").css("overflow", "visible");
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
  var dist = function () {
    return window.innerWidth - document.documentElement.offsetWidth;
  };
  var pannel = $(".pannel");
  var pannelLanguage = $(".pannel_util ul a");
  var pannelClose = pannel.find(".close a");

  btnSitemap.off("click").on("click", function () {
    sitemapOpenIs = true;
    sUserMenu.css({ right: dist() + "px" });
    bodyOverflowAntiShaking(sitemapOpenIs);
    //body overflow 처리 및 그로 인한 레이아웃 흔들림 방지

    var winW = $(window).width();
		if(winW < 1280){
            sitemap.fadeIn(300).addClass('on');	
		}else{
			pannel.fadeIn(300).addClass('on');
			// bgModal.css({"opacity": 0.8})
	        // bgModal.fadeIn(300);
		}
    // if(winW > 1280){
		// 	pannel.fadeIn(300).addClass('on');
		// }else{
		// 	sitemap.fadeIn(300).addClass('on');	
		// 	bgModal.css({"opacity": 0.8})
    //   bgModal.fadeIn(300);
  });
  // 패널 끄기
  pannelClose.off("click").on("click", function (e) {
    e.preventDefault();

    pannel.fadeOut(300).removeClass("on");
    sitemapOpenIs = false;
    bodyOverflowAntiShaking(sitemapOpenIs);
  });
  // 언어 교체 토글
  pannelLanguage.off("click").on("click", function () {
    $(this).parent("li").addClass("on").siblings().removeClass("on");
  });

  // 패널 반응형
  $(window).on("resize", function () {
    var winW = $(window).width();

    if (winW > 1280 && sitemap.hasClass("on")) {
      sitemap.fadeOut(300).removeClass("on");
      pannel.fadeIn(300).addClass("on");
    }

    if (winW <= 1280 && pannel.hasClass("on")) {
      sitemap.fadeIn(300).addClass("on");
      pannel.fadeOut(300).removeClass("on");
    }
  });

  sGnb
    .find("> ul > li > a")
    .off("click")
    .on("click", function () {
      if ($(this).hasClass("active") == false) {
        sGnb.find("ul>li>a").removeClass("active");
        sGnb.find("ul>li>ul").removeAttr("style");
        $(this).addClass("active");
        $(this).next().next().slideDown(300);
      } else if ($(this).hasClass("active") == true) {
        $(this).removeClass("active");
        $(this).next().next().slideUp(300);
      }
    });

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

  sGnb
    .find("> ul > li > ul > li > a")
    .off("click")
    .on("click", function () {
      if ($(this).hasClass("active") == false) {
        sGnb.find("ul>li>ul>li>a").removeClass("active");
        sGnb.find("ul>li>ul>li>ul").removeAttr("style");
        $(this).addClass("active");
        $(this).next().next().slideDown(300);
      } else if ($(this).hasClass("active") == true) {
        $(this).removeClass("active");
        $(this).next().next().slideUp(300);
      }
    });

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
  btnClose.off("click").on("click", function () {
    sitemap.css({
      right: "-" + dist() + "px",
    });
    $("body").css({
      overflow: "",
    });
    sitemap.fadeOut(300).removeClass("on");
    sitemapOpenIs = false;
    bgModal.fadeOut(300, function () {
      sitemap.css({
        right: "",
      });
      bodyOverflowAntiShaking(sitemapOpenIs); //body overflow 처리 및 그로 인한 레이아웃 흔들림 방지
    });
  });

  $(window).on("resize orientationchange", function () {
    bodyOverflowAntiShaking(sitemapOpenIs); //body overflow 처리 및 그로 인한 레이아웃 흔들림 방지
  });
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

  if (subVIsual.length == 0) {
    if (subContents.length > 0) {
      header.addClass("on");
    }
    return false;
  }

  $(window).on("load resize orientationchange", function () {
    if (subVIsual.length > 0) {
      snOfsTop = subVIsual.outerHeight();
    }
  });

  $(window).on("load scroll", function () {
    if (header.length > 0) {
      if ($(window).scrollTop() >= 10) {
        header.addClass("on");
      } else if ($(window).scrollTop() < 10) {
        header.removeClass("on");
      }
      //console.log(snOfsTop)
    }
    if (subNavi.length > 0) {
      if ($(window).scrollTop() >= snOfsTop) {
        subNavi.addClass("fixed");
      } else if ($(window).scrollTop() < snOfsTop) {
        subNavi.removeClass("fixed");
      }
    }
  });

  gnb.find(">ul>li>a").on("focus", function () {
    if (subNavi.hasClass("fixed")) {
      header.css({
        "z-index": 11,
      });
    }
  });

  pageLinksNavi.find("button.btn_select").on("focus", function () {
    if (subNavi.hasClass("fixed")) {
      header.css({
        "z-index": "",
      });
    }
  });
}
//Sub Visual
function initSubVisual() {
  if ($("#sub_visual").length == 0) {
    return false;
  }

  var subVIsual = $("#sub_visual");
  var subNavi = $("#sub_navi");
  var btnScrolldown = subVIsual.find(".btn_scrolldown img");

  $(window).on("load resize orientationchange", function () {
    if (
      (subVIsual.hasClass("full") &&
        navigator.userAgent.toLowerCase().indexOf("iphone") > -1) ||
      (subVIsual.hasClass("full") &&
        navigator.userAgent.toLowerCase().indexOf("ipad") > -1)
    ) {
      subVIsual.css({
        height: $(window).height() + "px",
      });
    } else {
      subVIsual.css({
        height: "",
      });
    }
  });

  btnScrolldown.off("click").on("click", function () {
    $("html,body").animate(
      {
        scrollTop: subVIsual.outerHeight(),
      },
      300
    );
  });
}
//Top Move
function initTopMove() {
  var btnTopMove = $(".quick");
  var btmHeight;
  var btmPosBottom;
  var footerWrap = $("#footer_wrap");
  var fOffsetTop;

  $(window).on("load resize scroll orientationchange", function () {
    btmHeight = btnTopMove.outerHeight();
    fOffsetTop = footerWrap.offset().top;

    if ($(window).width() > 1280) {
      if ($(window).scrollTop() > $(window).height() / 4) {
        btnTopMove.fadeIn(200);

        if ($(window).scrollTop() > fOffsetTop - $(window).height()) {
          btnTopMove.css({
            position: "absolute",
            bottom: "auto",
            top: fOffsetTop - btmHeight - 24 + "px",
          });
        } else if ($(window).scrollTop() <= fOffsetTop - $(window).height()) {
          btnTopMove.css({
            position: "",
            bottom: "",
            top: "",
          });
        }
      } else if ($(window).scrollTop() <= $(window).height() / 4) {
        btnTopMove.fadeOut(200);
      }
    } else if ($(window).width() <= 1280) {
      if ($(window).scrollTop() > $(window).height() / 4) {
        btnTopMove.fadeIn(200);

        if ($(window).scrollTop() > fOffsetTop - $(window).height()) {
          btnTopMove.css({
            position: "absolute",
            bottom: "auto",
            top: fOffsetTop - btmHeight - 24 + "px",
          });
        } else if ($(window).scrollTop() <= fOffsetTop - $(window).height()) {
          btnTopMove.css({
            position: "",
            bottom: "",
            top: "",
          });
        }
      } else if ($(window).scrollTop() <= $(window).height() / 4) {
        btnTopMove.fadeOut(200);
      }
    }
  });

  btnTopMove.find(".btn_top").off("click").on("click", function () {
    if ($('#container.main').length) {
      $.scrollify.move("#mainTop");
    }
    $("html,body").animate(
      { scrollTop: 0, }
      ,500);
  });
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
  var dist = function () {
    //console.log(window.innerWidth+ " , "+document.documentElement.offsetWidth)
    return parseInt(window.innerWidth - document.documentElement.offsetWidth);
  };

  if (overflowHiddenIs == true) {
    hGnb.css({ transform: "translateX(-" + dist() + "px)" });
    hUserMenu.css({ transform: "translateX(-" + dist() + "px)" });
    mainVisual.css({ width: "calc(100% - " + dist() + "px)" });
    subVisual.css({ width: "calc(100% - " + dist() + "px)" });
    contentsMove.css({ transform: "translateX(-" + dist() + "px)" });
    contents.css({ width: "calc(100% - " + dist() + "px)" });
    mainDecoration.css({ width: "calc(100% - " + dist() + "px)" });
    footer
      .find(".family_site,p.copyright")
      .css({ transform: "translateX(-" + dist() + "px)" });
    $("body").css({ overflow: "hidden" });
  } else if (overflowHiddenIs == false) {
    hGnb.css({ transform: "" });
    hUserMenu.css({ transform: "" });
    mainVisual.css({ width: "" });
    subVisual.css({ width: "" });
    contentsMove.css({ transform: "" });
    contents.css({ width: "" });
    mainDecoration.css({ width: "" });
    footer.find(".family_site,p.copyright").css({ transform: "" });
    $("body").css({ overflow: "" });
  }
}

function modalShowAndHide() {
  var popBtn = $(".popOpen"),
      popId = '';
      popBg = $("#bg_modal");

  var modal = {

    openModal: function (target) {
      var $select_id = $(`.popup[data-id="${target}"]`),
          $body = $('body')

      $body.css("overflow", "hidden");
      $select_id.attr('tabindex', 0).addClass('active').focus()
      $select_id.hasClass('.full_modal') ? $(popBg).show() : null   

    },
    hideModal: function (target) {
      var $select_id = $(`.popup[data-id="${target}"]`),
          $body = $('body'),
          $pop_scroll = $select_id.find('.pop_body')

      $pop_scroll.scrollTop(0)
      $select_id.children().has("video").length === 1 ? modal.pause($select_id) : null

      if ($select_id.children().has(".video_iframe").length >= 1) {
        $(".video_iframe iframe")[0].contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*')
      }

      $select_id.attr('tabindex', -1).removeClass('active')
      $body.css("overflow", "visible");
      $(`.popOpen[data-id=${target}]`).focus()

    },
    pause: function(target) {
      target.find("video").get(0).pause();
    } ,
    init: function() {
      //모달 열기
      popBtn.on('click', function(e) {
        e.preventDefault()
        popId = $(this).data('id')
        modal.openModal(popId)
      })

      //모달 닫기
      $(".popup .btn_close, .popup .cancel, .popup .close").on('click', function (e) {
        e.preventDefault();
        modal.hideModal(popId);
      })

      //모달 스크롤버튼 이동
      $(".pop_quick .btn_top").on("click", function () {
        var target = $(this).parent().parent().children(".pop_body");
        $(target).animate({ scrollTop: 0 }, 400);
      });
    },
  }

  modal.init()
}

function showToast() {
  $(".showToast").on("click", function (e) {
    e.preventDefault()

    var timer = 0;
    var tarIdx = $(this).data("id");
    var toast = $(`.pop_toast[data-id=${tarIdx}]`);

    if (timer === 0) {
      var copydata = $(this).attr('href')
      toast.addClass("active").fadeIn(300)
      toast.find('input').attr('value', copydata).select()
      document.execCommand('copy')

      timer = 1;
      setTimeout(function () {
        timer = 0;
        toast.find('input').removeAttr('value')
        toast.removeClass("active").fadeOut(300);
      }, 1000);
    }
  });
}

function suvGnbSwiperCenter() {
  if ($('.sub_nav').length <= 0) {
    return;
  }

  /*모바일 동작용 변수*/
  var ww = $(window).width();
  var subGnb = undefined;
  var movWidth = 720

  /*센터 이동 변수 */
  var targetIdx = $('.sub_nav .swiper-slide.on')

  function initSwiper() {
    if (ww < movWidth && subGnb == undefined) {
      subGnb = new Swiper(".sub_nav", {
        slidesPerView: 'auto',
        initialSlide: targetIdx.index(),
        slidesOffsetAfter: 60,
        afterInit: muCenter($(targetIdx)),
      });

    } else if (ww >= movWidth && subGnb != undefined) {
      subGnb.destroy();
      subGnb = undefined;
    }
  }

  function muCenter(target) {
      var snbwrap = $('.sub_nav .swiper-wrapper');
      var targetPos = target.position();
      var box = $('.sub_nav');
      var boxHarf = box.width()/2;
      var pos;
      var listWidth=0;
      
      snbwrap.find('.swiper-slide').each(function(){ listWidth += $(this).outerWidth(); })
      
      var selectTargetPos = targetPos.left + target.outerWidth()/2;
      if (selectTargetPos <= boxHarf) { // left
        pos = 0;
      }else if ((listWidth - selectTargetPos) <= boxHarf) { //right
        pos = listWidth - box.width() + 70;
        // console.log(pos, listWidth, box.width())
      }else {
        pos = selectTargetPos - boxHarf;
      }
      
      setTimeout(function(){snbwrap.css({
          "transform": "translate3d("+ (pos*-1) +"px, 0, 0)",
          "transition-duration": "500ms"
      })}, 200);
  }

  initSwiper();
  
  $(window).on('resize', function () {
    ww = $(window).width();
    initSwiper();
    muCenter(targetIdx)

  });
}

function subNav1() {
  // 인베스트먼트에 있는 네비
  var subNav1 = $(".sub_nav1"),
    subNav1Btn = $(".sub_nav1 .depth > a"),
    subNav1Cont = $(".sub_nav1 .depth > ul"),
    speed = 300;

  subNav1Btn.off("click").on("click", function (e) {
    e.preventDefault();

    if ($(this).parent().hasClass("on")) {
      subNav1Btn.parent().removeClass("on");
      subNav1Cont.slideUp(speed);
    } else {
      subNav1Btn.parent().removeClass("on");
      $(this).parent().addClass("on");
      subNav1Cont.slideUp(speed);
      $(this).next().slideDown(speed);
    }
  });
}

//  --- tab_style.js
//서브네비 있는 페이지에서 sticky

function sticky() {
  var lastTop = 0;
  var $body = $("body"),
      $header = $("#header_wrap"),
      $mainCont = $('#container');
  var headerH = $($header).children(".header").height();

  if ($($mainCont).find(".sub_nav1").length != 0 && $($mainCont).height() > 1350) {
    //sub_nav1이 있을때 && 컨테이너 높이가 1350 이상일때만 실행
    sub_nav_sticky();
  }

  function sub_nav_sticky() {
    $(window).on("load scroll", function (e) {
      var scrollY = $(this).scrollTop();

      if ($(".content_inner").offset().top >= scrollY) {
        //내려갈때 : 서브탭 안지났다면 (1-1) : 헤더 O, 서브탭 X
        $($header).removeClass("none");
      } else if (
        scrollY > lastTop &&
        $(".content_inner").offset().top <= scrollY + headerH
      ) {
        //내려갈때 : 서브탭 지났다면 (1-2) : 헤더 X, 서브탭 O
        $($header).addClass("none");
        $($body).addClass("sticky");
      } else {
        //올라갈때 : 서브탭 상관없이  : 헤더 O, 서브탭 X
        $($header).removeClass("none");
        $($body).removeClass("sticky");
      }
      lastTop = scrollY;
    });
  }
}
function tabMenu1() {
  // 비즈니스에 있는 탭
  var tabMenu1 = $(".tab_area1"),
    tabMenuBtn = tabMenu1.find(".tab_list1 button"),
    tabMenuList = tabMenu1.find(".tab_list1 ul"),
    tabMenuBtn2 = tabMenuList.find("a");

  tabMenuBtn.off("click").on("click", function () {
    $(this).toggleClass("on");
    tabMenuList.toggleClass("on");
  });

  tabMenuBtn2.off("click").on("click", function () {
    var $text = $(this).text();

    tabMenuBtn.text($text);
    tabMenuBtn.removeClass("on");
    tabMenuList.removeClass("on");
  });

  $(window).resize(function () {
    var winW = $(window).width();

    if (winW > 1281) {
      tabMenuBtn.removeClass("on");
      tabMenuList.removeClass("on");
    }
  });
}

function subNavCenterSwiper () {

  // var subnavSwiper = new Swiper('.scroll_ani_wrap .sub_nav',{
  //   slidesPerView: 'auto',
  //   preventClicks: true,
  //   preventClicksPropagation: false,
  // })

  // var $snbSwiperItem = $('.scroll_ani_wrap .sub_nav .swiper-wrapper .swiper-slide a');
  //   $snbSwiperItem.on('click',function(){
  //       var target = $(this).parent();
  //       $snbSwiperItem.parent().removeClass('on')
  //       target.addClass('on');
  //       muCenter(target);
  //   })

//   function muCenter(target){
//     var snbwrap = $('.scroll_ani_wrap .sub_nav .swiper-wrapper');
//     var targetPos = target.css().position();
//     var box = $('.sub_nav');
//     var boxHarf = box.width()/2;
//     var pos;
//     var listWidth=0;
    
//     snbwrap.find('.swiper-slide').each(function(){ listWidth += $(this).outerWidth(); })
    
//     var selectTargetPos = targetPos.left + target.outerWidth()/2;
//     if (selectTargetPos <= boxHarf) { // left
//         pos = 0;
//     }else if ((listWidth - selectTargetPos) <= boxHarf) { //right
//         pos = listWidth-box.width();
//     }else {
//         pos = selectTargetPos - boxHarf;
//     }
    
//     setTimeout(function(){snbwrap.css({
//         "transform": "translate3d("+ (pos*-1) +"px, 0, 0)",
//         "transition-duration": "500ms"
//     })}, 200);
// }

//   subnavSwiper
//   muCenter()

}

//  --- guide.js
function searchNav() {
  var searchBtn = $(".tab_nav  .tab_list_filter button"),
    searchList = $(".tab_nav  .tab_list_filter ul"),
    searchItem = $(".tab_nav  .tab_list_filter ul a");

  searchBtn.off("click").on("click", function () {
    searchBtn.toggleClass("on");
    searchList.toggleClass("open");
  });

  searchItem.off("click").on("click", function () {
    var category = $(this).find(".category").text(),
      num = $(this).find(".count").text();

    searchBtn.find(".category").text(category);
    searchBtn.find(".total_num").text(num);
    searchList.removeClass("open");
    searchBtn.removeClass("on");
  });

  $(window).resize(function () {
    var winW = $(window).width();

    if (winW > 1281) {
      searchBtn.removeClass("on");
      searchList.removeClass("open");
    }
  });
}
//filter_selected
function initFilter() {
  const target = $(".filter");
  const selectedBtn = target.find(".filter_selected");
  const filterMenu = $(".filter_menu");
  const button = target.find(".filter_menu button");

  selectedBtn.off("click").on("click", function () {
    if (target.hasClass("active")) {
      //selectbox 선택자
      target.removeClass("active");
      target.find(".filter_menu").css({ displaly: "none" }).slideUp(300);
    } else {
      target.addClass("active");
      target.find(".filter_menu").css({ displaly: "flex" }).slideDown(300);
    }

    button.off("click").on("click", function () {
      target.find(".filter_menu").css({ displaly: "none" }).slideUp(300);
    });
  });

  button.off("click").on("click", function () {
    const text = $(this).text();
    const el = $(this).parent();
    if (!el.hasClass("is-active")) {
      //tab 선택자
      selectedBtn.text(text);
      el.addClass("is-active").siblings().removeClass("is-active");
      target.removeClass("active");
    }
  });
}
function initFilterSearch() {
  const targetSch = $(".Sch");
  const selectedBtnSch = targetSch.find(".filter_selected");
  const filterMenuSch = $(".filter_search");
  const buttonSch = targetSch.find(".filter_search button");
  buttonSch.off("click").on("click", function () {
    const textSch = $(this).text();
    const elSch = $(this).parent();
    if (!elSch.hasClass("is-active")) {
      //tab 선택자
      selectedBtnSch.text(textSch);
      elSch.addClass("is-active").siblings().removeClass("is-active");
      targetSch.removeClass("active");
    }
  });
}
// 탭 메뉴 tab
function tabUI() {
  const tabGroups = document.querySelectorAll('[data-role="tab"]');
  if (tabGroups) {
    let currentTarget, targetTabWrap, targetTabListWrap, targetPanelWrap;
    // 이벤트 타겟 변수 설정
    const init = (e) => {
      currentTarget = e.target.tagName;
      currentTarget === "BUTTON" || "A"
        ? (currentTarget = e.target)
        : (currentTarget = e.target.closest("button") || e.target.closest("a"));
      targetTabWrap = currentTarget.closest('[data-role="tab"]');
      targetTabListWrap = targetTabWrap.querySelector('[role="tablist"]');
      targetPanelWrap = targetTabWrap.querySelector(".tab_conts");
    };

    //처음 세팅
    let contsDef = document.querySelectorAll('.tab_cont')
    contsDef.forEach(el => {
      for (let i = 0; i < el.classList.length; i++) {
        el.classList[i] == 'active' ? el.setAttribute('aria-hidden', 'false') : el.setAttribute('aria-hidden', 'true')
      }
    }) 
    
    // 클릭 이벤트
    const tabClickEvt = (e) => {
      init(e);
      if (currentTarget.ariaSelected === "false") {
        // 미선택된 탭 속성 false 상태로 만들기
        tabRemoveEvt(targetTabListWrap, targetPanelWrap);
        // 선택 된 탭 속성 true 상태로 만들기
        tabAddEvt(currentTarget, targetTabWrap);
      }
    };
    // 키보드 접근 이벤트
    const tabKeyUpEvt = (e) => {
      init(e);
      const targetBtnWrap = currentTarget.parentElement;
      if (e.key == "ArrowRight") {
        // 키보드 -> 화살표를 눌렀을 때
        if (targetBtnWrap.nextElementSibling) {
          targetBtnWrap.nextElementSibling.children[0].focus();
          tabRemoveEvt(targetTabListWrap, targetPanelWrap);
          tabAddEvt(
            targetBtnWrap.nextElementSibling.children[0],
            targetTabWrap
          );
        } else homeKeyEvt(targetTabListWrap, targetTabWrap, targetPanelWrap);
      } else if (e.key == "ArrowLeft") {
        // 키보드 <- 화살표를 눌렀을 때
        if (targetBtnWrap.previousElementSibling) {
          targetBtnWrap.previousElementSibling.children[0].focus();
          tabRemoveEvt(targetTabListWrap, targetPanelWrap);
          tabAddEvt(
            targetBtnWrap.previousElementSibling.children[0],
            targetTabWrap
          );
        } else endKeyEvt(targetTabListWrap, targetTabWrap, targetPanelWrap);
      }
      // 키보드 End 키 눌렀을 때
      else if (e.key == "End")
        endKeyEvt(targetTabListWrap, targetTabWrap, targetPanelWrap);
      // 키보드 Home 키 눌렀을 때
      else if (e.key == "Home")
        homeKeyEvt(targetTabListWrap, targetTabWrap, targetPanelWrap);
    };
    // tab active event
    const tabAddEvt = (currentTarget, targetPanelWrap) => {
      // 선택 된 탭 속성 true 로 변경
      currentTarget.setAttribute("aria-selected", "true");
      currentTarget.removeAttribute("tabindex");
      currentTarget.parentElement.classList.add("active");
      // 연결 된 tabpanel 숨김 해제
      targetPanelWrap
        .querySelector(`[aria-labelledby="${currentTarget.id}"]`)
        .setAttribute("aria-hidden", "false");
      targetPanelWrap
        .querySelector(`[aria-labelledby="${currentTarget.id}"]`)
        .setAttribute("tabindex", "0");
      targetPanelWrap
      .querySelector(`[aria-labelledby="${currentTarget.id}"]`).classList.add('active')
    };
    // tab active remove event
    const tabRemoveEvt = (tabListWrap, tabPanelWrap) => {
      targetTabListWrap.querySelectorAll("li").forEach((tabBtnWrap) => {
        // 기존에 선택 된 탭 속성 false 로 변경
        if (tabBtnWrap.classList.contains("active")) {
          tabBtnWrap.classList.remove("active");
          tabBtnWrap
            .querySelector('[role="tab"]')
            .setAttribute("aria-selected", "false");
          tabBtnWrap
            .querySelector('[role="tab"]')
            .setAttribute("tabindex", "-1");
        }
      });
      // 기존에 선택 된 tabpanel 숨김
      for (let tabPanel of targetPanelWrap.children) {
        tabPanel.setAttribute("aria-hidden", "true");
        tabPanel.setAttribute("tabindex", "-1");
        tabPanel.classList.remove('active');
      }
    };
    // 키보드 Home key Event (선택된 탭 리스트 중 첫 번째 리스트로 포커스 이동)
    const homeKeyEvt = (targetTabListWrap, targetTabWrap, targetPanelWrap) => {
      targetTabListWrap.children[0].children[0].focus();
      tabRemoveEvt(targetTabListWrap, targetPanelWrap);
      tabAddEvt(targetTabListWrap.children[0].children[0], targetTabWrap);
    };
    // 키보드 End key Event (선택된 탭 리스트 중 마지막 리스트로 포커스 이동)
    const endKeyEvt = (targetTabListWrap, targetTabWrap, targetPanelWrap) => {
      const targetTabLists = targetTabListWrap.querySelectorAll("li");
      targetTabLists[targetTabLists.length - 1].children[0].focus();
      tabRemoveEvt(targetTabListWrap, targetPanelWrap);
      tabAddEvt(
        targetTabLists[targetTabLists.length - 1].children[0],
        targetTabWrap
      );
    };
    // 클릭/키보드 탭 이벤트 제거/할당
    tabGroups.forEach((tabWrapper) => {
      const tabBtns = tabWrapper.querySelectorAll('[role="tab"]');
      tabBtns.forEach((tabBtn) => {
        tabBtn.removeEventListener("click", tabClickEvt);
        tabBtn.addEventListener("click", tabClickEvt);
        tabBtn.removeEventListener("keyup", tabKeyUpEvt);
        tabBtn.addEventListener("keyup", tabKeyUpEvt);
      });
    });
  }
}
// dropdown_nav
function dropdownNav() {
  //nav 스크롤 타입 - 자동선택
  $(window).scroll(function () {
    var docScroll = $(window).scrollTop();
    var menuItem = $(".dropdown_menu ul li a");
    var contItem = $(".wrapper > .content");
    $.each(contItem, function (index, obj) {
      var targetItem = $(".wrapper > .content").eq(index);
      // i	= targetItem.index(),
      (targetHeader = $(".sub_navi").outerHeight() - 104), //104
        (targetTop = targetItem.offset().top - targetHeader - 400);
      if (targetTop < docScroll) {
        menuItem.removeClass("active");
        menuItem.eq(index).addClass("active");
        $(".dropdown_menu button").text(
          $(".dropdown_menu ul li").children("a").eq(index).text()
        );
      }
    });
  });

  // mav 버튼 타입 - 클릭
  var dropIndex = 0;
  var dropList = $(".dropdown_menu ul li");
  var dropText = $(".dropdown_menu button");
  var dropLink = dropList.children("a");
  var dropPrev = $(".btn_hs_prev");
  var dropNext = $(".btn_hs_next");

  dropText.off("click").on("click", function () {
    var list = $(this).parent().children("ul");
    if ($(this).hasClass("on") == false) {
      $(this).addClass("on");
      list.slideDown(300);
    } else if ($(this).hasClass("on") == true) {
      $(this).removeClass("on");
      list.slideUp(300);
    }
  });

  dropLink.off("click").on("click", function (e) {
    e.preventDefault();
    dropIndex = dropList.find(">a.active").parent().index();
    $(this).parent("li").parent("ul").slideUp(300);
  });
  dropPrev.off("click").on("click", function () {
    dropIndex--;
    dropIndexFind(dropIndex);
    dropText_change();
    scroll();
  });
  dropNext.off("click").on("click", function () {
    dropIndex++;
    dropIndexFind(dropIndex);
    dropText_change();
    scroll();
  });
  function dropText_change() {
    dropText.text(dropLink.eq(dropIndex).text());
  }
  function dropIndexFind(index) {
    var max = dropList.length - 1;
    if (index > max) {
      dropIndex = 0;
    } else if (index < 0) {
      dropIndex = max;
    }
    //dropLink.eq(dropIndex).get(0).click();
    dropLink
      .eq(dropIndex)
      .addClass("active")
      .parent("li")
      .siblings()
      .children("a")
      .removeClass("active");
  }

  function scroll() {
    var target = $(".dropdown_menu a.active").attr("href"),
      targetTop = $(target).offset().top;

    $("html, body").animate(
      {
        scrollTop:
          targetTop -
          $(".header").height() -
          $("#sub_navi").height() -
          $(".utill").height() -
          20,
      },
      600
    );
  }
}
function dropdownTab() {
  if ($(".dropdown_menu_tab").length) {
    $(".dropdown_menu_tab").each(function () {
      var $dropNavWrap = $(this),
        $dropNavUl = $dropNavWrap.find("ul"),
        $dropNavLink = $dropNavUl.find("li a"),
        $dropNavBtn = $dropNavWrap.find("button"),
        $dropBody = $(".dropdown_tab_wrap");

      var dataIdx = "";
      var listOn = "드롭다운 메뉴 열림",
        listOff = "드롭다운 메뉴 닫힘";

      $($dropNavBtn).on("click", function (e) {
        e.preventDefault();
        if (!$(this).hasClass("on")) {
          $(this).attr("title", listOn).addClass("on");
          $dropNavUl.slideDown(300);
        } else {
          $(this).attr("title", listOff).removeClass("on");
          $dropNavUl.slideUp(300);
        }
      });

      $($dropNavLink).on("click", function (e) {
        e.preventDefault();
        dataIdx = $(this).data("tab");

        $(this)
          .addClass("active")
          .parent()
          .siblings()
          .children()
          .removeClass("active");
        $dropNavBtn
          .attr("title", listOff)
          .removeClass("on")
          .text($(this).text())
          .focus();
        $dropNavUl.slideUp(300);
        $dropBody
          .find(`.dropdown_tab_item#${dataIdx}`)
          .attr({ tabindex: 0 })
          .addClass("active")
          .siblings()
          .removeClass("active");
      });
    });
  }
}
//AccordionList
function initAccordionList() {
  var accordion = $(".accordion");
  var accordionList = accordion.find("dl.accordion_list");
  var accTit = accordionList.find(">dt");
  var accCont = accordionList.find(">dd");

  accTit
    .find(">a")
    .off("click")
    .on("click", function () {
      if ($(this).parent().hasClass("active") == false) {
        accTit.removeClass("active");
        accCont.slideUp(300);
        $(this).parent().addClass("active");
        $(this).attr("title", "내용닫힘");
        $(this)
          .parent()
          .next()
          .slideDown(300, function () {
            $(window).resize();

            //youtube
            $(".accordion_list > dt")
              .off("click")
              .on("click", function () {
                for (i = 0; i < 8; i++) {
                  $("iframe")[i].contentWindow.postMessage(
                    '{"event":"command","func":"' +
                      "stopVideo" +
                      '","args":""}',
                    "*"
                  );
                }
              });
          });
      } else if ($(this).parent().hasClass("active") == true) {
        $(this).parent().removeClass("active");
        $(this).attr("title", "내용열림");
        $(this)
          .parent()
          .next()
          .slideUp(300, function () {
            $(window).resize();
          });
      }
    });
}

function scrollNext () {
  var scrollDown = $(".btn_scrolldown button.move")

  if(scrollDown.length >= 1) {
    contentTop = $(".sub_visual").next().offset().top;
    scrollDown.off("click").on("click", function () {
      $("html, body").animate(
        {
          scrollTop: contentTop,
        },
        600
      );
    });
  }
}

function scrollMove () {
  //풀페이지
  if ($('#fullpage').length <= 0) {
      return
  }

  var fullpage_api = $.fn.fullpage
  var targetSec = $('#targetResponsive')
  var animationSec = $('#initAnimation').length > 0 ? $('#initAnimation') : undefined
  // var btnDown = $('.btn_scrolldown .button-next')
  var isActive = false
  var winTop = 0
  var targetIndex = $('#fullpage .section').index(targetSec) + 1
  var newFn = false
  var anchorCorrection = 0

  if ($(window).width() <= 720 && $('#targetResponsive').find('.fix_nav').length) {
    anchorCorrection = 70
  } else if ($(window).width() <= 720 && $('#targetResponsive').find('.fix_nav').length === 0) {
    anchorCorrection = 40
  }
  if ($(window).width() <= 720 && $('#targetResponsive').find('.tp_version_navi').length) {
    anchorCorrection = 70
  }



  function scrollActive() {
      $('#fullpage').fullpage({
          anchors: ['page1', 'page2', 'page3'],
          onLeave: function (origin, destination, direction, trigger) {
            if (destination === targetIndex && direction === 'down') {
              setTimeout(function () {
                fullpage_api.destroy('all');    
                $(window).scrollTop($(targetSec).offset().top - anchorCorrection)
                isActive = true
                $('#fullpage').css('transform', 'unset')
              }, 500)
              }
          },
          afterLoad: function(origin, destination, direction, trigger) {
              if(destination === 2) {
                  $(animationSec).addClass('init')
              }
          }
      });
  }

  $(window).on('scroll', function() {
      winTop = $(window).scrollTop()

      if(isActive === true && winTop <= 80){
          isActive = false
          history.replaceState({}, null, location.pathname);
          scrollActive()
          $(animationSec).removeClass('init')
      }
  })
  
  // $(btnDown).on('click', function() {
  //     fullpage_api.moveTo(2)
  // })

  scrollActive()

}



$(document).ready(function () {
  if ($(".quick").length > 0) {
    initTopMove(); //Top move
  }
  initPopCookieSet(); // cookie setting
  // initHeaderGnb();        Header GNB
  // Full_GNB_CHK();
  initHeaderGNB(); //New! Header GNB
  initHeaderSitemapLangauage(); //Header & Sitemap User Menu
  initSearchBtn();
  initKeyinfoBtn();
  initSitemapGnb(); //Sitemap GNB
  initHeaderSubNaviSticky(); //Header & Sub Navi Sticky
  initSubVisual(); //Sub Visual
  modalShowAndHide(); //popup
  showToast(); //toast
  //  --- tab_style.js
  subNav1(); // 인베스트먼트에 있는 네비
  tabMenu1(); // 비즈니스에 있는 탭
  sticky();
  suvGnbSwiperCenter()
  //  --- guide.js
  initFilterSearch();
  initFilter(); //filter_selected
  searchNav();
  tabUI(); // 탭 메뉴 tab
  dropdownNav(); // history. dropdown_nav
  initAccordionList(); //AccordionList
  // scrollNext();
  dropdownTab(); // 드롭다운형태 탭
  scrollMove() //비즈니스, 어바웃 

});
