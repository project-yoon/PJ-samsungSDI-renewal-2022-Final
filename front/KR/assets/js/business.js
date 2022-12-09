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

//패럴랙스 스크롤링 이벤트 //스크롤 이벤트 활용
function parallex () {
    var winScrollTop;
    var section = $('.scroll_wrap .sItem')
    var offsetTop = [];
    var offsetBottom = [];

    var maxItemsCount = section.length //스크롤이동 할 화면의 최대갯수
    var currentIdx = 0; //섹션 번호 판별
    var lastY =  0; //방향을 구하기 위한 변수

    var time_chk = 0
    var timer = 1500

    function setValue() {
        winScrollTop = $(window).scrollTop();

        section.each(function(idx, el) {
            offsetTop[idx] = $(el).offset().top;
            offsetBottom[idx] = offsetTop[idx] + $(el).height()
        })

    }

    function secMove(idx) {
        $(window).scrollTop(offsetTop[idx])
    }

    function checkInSection (lastDirection) {
        if(time_chk === 0) {
            time_chk = 1

            if (lastDirection === 'down') {
                currentIdx >= maxItemsCount ? currentIdx = maxItemsCount : currentIdx = currentIdx + 1
                secMove(currentIdx)
            } else if (lastDirection === 'up') {
                currentIdx <= 0 ? currentIdx = 0 : currentIdx = currentIdx - 1
                secMove(currentIdx)
            }

            setTimeout(function() {
                time_chk = 0
            }, timer)

        }
    }

    function init () {
        setValue()
        checkInSection()
    }

    $(window).scroll(function(e) {
        e.preventDefault();
        winScrollTop = $(window).scrollTop();

        if(winScrollTop)
        lastY >= winScrollTop ? lastDirection = 'up' : lastDirection = 'down'
        checkInSection(lastDirection)
        lastY = winScrollTop

    })
    init()
}

//스와이퍼 버티컬 //휠 이벤트 활용
function swiperBusiness () {
    var duration = 800;
    var toggleEdge = false

    var swiper = new Swiper('.scroll_event_wrap', {
        speed: duration,
        direction: 'vertical',
        mousewheel: true,
        slidesPerView: 'auto',
        enabled: true,
        nextEl: '.swiper-button-next'
    })

    //내부 슬라이드용 
    var nestedSwiper = new Swiper('.swiper-nested', {
        direction: 'vertical',
        mousewheel: true,
        slidesPerView: 'auto',
        enabled: true, 
        nested: true,
        spaceBetween: 30,
        centeredSlides: true,
        on: {
            slideChangeTransitionEnd: function() {
                if (this.realIndex == 1) {
                    toggleEdge = true
                    setEvent(toggleEdge)
                } else {
                    toggleEdge = false
                    setEvent(toggleEdge)
                }
            }
        }
    })

    function setEvent (toggleEdge) {
        nestedSwiper.params.touchReleaseOnEdges = toggleEdge;
        nestedSwiper.params.mousewheel.releaseOnEdges = toggleEdge;
        swiper.params.touchReleaseOnEdges = toggleEdge;
        swiper.params.mousewheel.releaseOnEdges = toggleEdge;
    }

    swiper;
}


$(document).ready(function() {
    initSubtabNaviSticky(); // initSubtabNaviSticky
    initSubtab(); // initSubtab
    swiperBusiness();
})