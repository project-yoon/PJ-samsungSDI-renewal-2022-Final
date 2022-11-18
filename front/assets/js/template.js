//카테고리 네비
function initCategoryTabNavi(tTab) {
    var categoryTabNavi = tTab;
    var ctGroup = categoryTabNavi.attr("data-ct-group");
    var ctnItem = categoryTabNavi.find(">li");
    var categoryTabCont = $(".category_tab_cont[data-ct-group="+ctGroup+"]");

    ctnItem.find(">a").on("click",function() {
        ctnItem.find(">a").removeClass("active");
        $(this).addClass("active");

        categoryTabCont.hide();
        $($(this).attr("href")).show();

        return false;
    })
}

//드랍다운 매뉴
function initDropdownMenu(tMenu) {
    var dropdownMenu = tMenu;
    var btnDM = dropdownMenu.find(">button");
    var dmList = dropdownMenu.find(">ul");
    var dmItem = dmList.find(">li");
    var activeDeps = dmItem.find(">a.active").parent().index();

    btnDM.on("click",function(e) {
        if($(this).hasClass("on") == false) {
            $(this).addClass("on");
            dmList.css({"visibility":"visible"});
        } else if($(this).hasClass("on") == true) {
            $(this).removeClass("on");
            dmList.css({"visibility":"hidden"});
        }

        e.stopPropagation();
    })

    dmItem.find(">a").on("mouseenter focusin",function() {
        dmItem.find(">a").removeClass("active");
        $(this).addClass("active");
    })

    dmItem.find(">a").on("click",function() {
        dmItem.find(">a").removeClass("active");
        $(this).addClass("active");

        activeDeps = $(this).parent().index();
        btnDM.text($(this).text());
        btnDM.focus();
    })

    dmList.on("mouseleave",function() {
        dmItem.find(">a").removeClass("active");
        dmItem.eq(activeDeps).find(">a").addClass("active");
    })

    $("html,body").on("click",function() {
        if(btnDM.hasClass("on") == true) {
            btnDM.removeClass("on");
            dmList.css({"visibility":"hidden"});
        }
    })
}

/* 설명 목록 */
function initDescFoldList(targetDescList) {
    var descFoldList = $(targetDescList);
    var dflTit = descFoldList.find("dt");

    dflTit.find(">a").on("click",function() {
        if($(this).parent().hasClass("active") == false) {
            $(this).parent().addClass("active");
            $(this).parent().next().slideDown(300,function() {
                $(window).resize()
            });
        } else if($(this).parent().hasClass("active") == true) {
            $(this).parent().removeClass("active");
            $(this).parent().next().slideUp(300,function() {
                $(window).resize()
            });
        }
    })
}

function openVideoPopup(tLink) {
    //링크 정보
    var tBtn = $(tLink);
    var tvTitle= tBtn.attr("data-video-title");
    var tvUrl = tBtn.attr("data-video-url");
    var tvType = tBtn.attr("data-video-type");
    var tsPcUrl = tBtn.attr("data-screenshot-pc");
    var tsMoUrl = tBtn.attr("data-screenshot-mo");

    //공통 팝업 구조
    var videoPopup = $("#video_layer_popup");
    var vpTit = videoPopup.find("h3")
        vpTit.text(tvTitle)
    var vpScreenshot = videoPopup.find(".screenshot");
    var vpsPcPhoto = vpScreenshot.find(">img.photo.pc");
        vpsPcPhoto.attr("src",tsPcUrl);
    var vpsMoPhoto = vpScreenshot.find(">img.photo.mo");
        vpsMoPhoto.attr("src",tsMoUrl);
    var vpVideoWrap = videoPopup.find(".video_wrap");
    var videoPlayer = vpVideoWrap.find("video");
    var youtubePlayer = vpVideoWrap.find("iframe");
    var popupOpenIs = true;

    //Api Setting
    var player;
	var tag;
	var firstScriptTag;
    
    var btnClose = videoPopup.find("button.btn_close");

    if(tvType == "youtube") {
        videoPlayer.hide();
        youtubePlayer.show();
        youtubePlayer.attr({
            "src": "https://www.youtube.com/embed/"+tvUrl.split("watch?v=")[1]+"?version=3&enablejsapi=1"
        })

        //Youtube Api Setting
        tag = document.createElement('script');
		tag.src = "https://www.youtube.com/iframe_api";
		firstScriptTag = document.getElementsByTagName('script')[0];
		firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

		// 유튜브 영상이 준비되면 실행되는 함수
		window.onYouTubeIframeAPIReady = function() {
			player = new YT.Player("youtube_player", {});
		};
    } else {
        youtubePlayer.hide();
        videoPlayer.show();
        videoPlayer.find(">source").attr({
            "src": tvUrl,
            "type": tvType
        })
        player = document.getElementById("video_player")
        player.load()
    }

    vpScreenshot.find("button.bth_play").on("click",function() {
        $(this).parent().fadeOut(200);

        if(tvType == "youtube") {
            player.playVideo()
        } else {
            player.play()
        }
    })

    bodyOverflowAntiShaking(popupOpenIs) //body overflow 처리 및 그로 인한 레이아웃 흔들림 방지
    videoPopup.fadeIn(300,function() {
        videoPopup.focus();
    });

    //팝업 닫기
    btnClose.on("click",function() {
        if(tvType == "youtube") {
            player.stopVideo()
        } else {
            player.pause()
        }

        videoPopup.fadeOut(300,function() {
            popupOpenIs = false
            bodyOverflowAntiShaking(popupOpenIs) //body overflow 처리 및 그로 인한 레이아웃 흔들림 방지 해제
            vpScreenshot.show();
            tBtn.focus();

            return false
        })
    })

    $(window).on("resize orientationchange",function() {
        bodyOverflowAntiShaking(popupOpenIs) //body overflow 처리 및 그로 인한 레이아웃 흔들림 방지
    })
}

$(document).ready(function() {
    $("ul.category_tab_navi.init_ct").each(function() {
        initCategoryTabNavi($(this)) //카테고리 네비
    })
    // $(".dropdown_menu").each(function() {
    //     initDropdownMenu($(this)) //드랍다운 매뉴
    // })
})