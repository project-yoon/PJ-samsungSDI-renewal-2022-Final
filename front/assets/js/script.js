//GNB
function initGNB(deps1Num) {
	var header =  $("header.header");
	var btnGnb = header.find("button.btn_gnb")
	var gnb = header.find("nav#gnb");
	var gItem = gnb.find("ul.g_menu li")
	var gDeps2 = gnb.find(">ul.g_menu>li");
	var btnClase = gnb.find("button.btn_close");
	var bgGnb = $(".bg_gnb");
	var viewBgIs = false;
	var container = $("#container");
	
	//뎁스표시
	if(deps1Num > 0){
		gDeps2.eq(deps1Num-1).find(">a").addClass("on");
	}
	
	//PC 일 때
	gDeps2.find(">a").on("mouseenter focusin",function() {
		if($(window).width() > 1280) {
			gnb.removeAttr("style");
			
			if($(this).hasClass("active") == false) {
				gDeps2.find(">a").removeClass("active");
				$(this).addClass("active");
				deps2Menu = $(this).parent().find(">ul");
				
				gDeps2.find(">ul").removeAttr("style")
				
				if(deps2Menu.length > 0) {
					deps2Menu.css({
						"display":"flex"
					})
					deps2Height = deps2Menu.outerHeight();
					
					if(viewBgIs == false) {
						bgGnb.show();
						viewBgIs = true;
					}
					
					bgGnb.stop().animate({
						"height": deps2Height+64+"px"
					},300,function() {
						deps2Menu.stop().animate({
							"opacity":1
						},200)
					})
				} else {
					bgGnb.stop().animate({
						"height": "0px"
					},300)
				}
			}
		}
	})
	container.on("mouseenter",function() {
		if($(window).width() > 1280) {
			gDeps2.find(">a").removeClass("active");
			gDeps2.find(">ul").removeAttr("style")
			
			//뎁스표시
			if(deps1Num > 0){
				gDeps2.eq(deps1Num-1).find(">a").addClass("on");
			}
			
			bgGnb.animate({
				"height": "0px"
			},300,function() {
				bgGnb.removeAttr("style")
				viewBgIs = false;
			})
		}
	})
	
	//테블릿 이하 일 때
	btnGnb.on("click",function() {
		if($(window).width() <= 1280) {
			bgGnb.fadeIn(200)
			gnb.show();
			gnb.delay(100).animate({
				"right": "0px"
			},300)
		}
	})
	btnClase.on("click",function() {
		if($(window).width() <= 1280) {
			gnb.animate({
				"right": "-360px"
			},300,function() {
				bgGnb.fadeOut(200,function() {
					bgGnb.removeAttr("style");
				})
				gnb.removeAttr("style");
				gnb.find("ul.g_menu li a").removeClass("active");
				gnb.find("ul.g_menu *").removeAttr("style");
			})
		}
	})
	gItem.find(">button.btn_deps_menu").on("click",function() {
		if($(window).width() <= 1280) {
			if($(this).prev().hasClass("active") == false) {
				$(this).prev().addClass("active")
				$(this).next().slideDown(300)
			} else if($(this).prev().hasClass("active") == true) {
				$(this).prev().removeClass("active")
				$(this).next().slideUp(300)
				
				if(gItem.find(">button.btn_deps_menu.on").length == 0 && deps1Num > 0) {
					gDeps2.eq(deps1Num-1).find(">a").addClass("on");
				}
			}
		}
	})
	
	//화면 크기 변경 시
	$(window).on("load resize orientationchange",function() {
		if($(window).width() > 1280) {
			bgGnb.removeAttr("style");
			gnb.removeAttr("style");
			gnb.find("ul.g_menu li a").removeClass("active");
			gnb.find("ul.g_menu *").removeAttr("style");
			
			//뎁스표시
			if(deps1Num > 0){
				gDeps2.eq(deps1Num-1).find(">a").addClass("on");
			}
		}
	})
}

//Top Move
function initTopMove() {
	var btnTopMove = $("#btn_top_move");
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
						"top": fOffsetTop - btmHeight - 50 + "px"
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
			btnTopMove.css({
				"display": "block",
				"bottom":"auto",
				"top": fOffsetTop + "px"
			})
		}
	})
	
	
	btnTopMove.find("button").on("click",function() {
		$("html,body").animate({
			"scrollTop":0
		},300)
	})
}

//프로젝트 상세 팝업
function popupProjectDetail(modalname) {
	var modalBg = $(".modal_bg");
	
	var popupProjectDetail = $("." + modalname);
		popupProjectDetail.show();
	var popupBtn = $("#" + modalname);
	var popupModal = $("#popup_" + modalname);
	var ppdCont = popupProjectDetail.find(">.content");
	var ppdLinks = popupProjectDetail.find(">.links");
	var btnClose = popupProjectDetail.find("button.btn_close");
	var maxPpdContHeight = function() {
		return parseInt(popupProjectDetail.height() - ppdCont.find("p.subject").outerHeight() - ppdLinks.outerHeight())
	}

	ppdCont.find("p.desc").css({
		"maxHeight": maxPpdContHeight()+"px"
	})
	$(window).on("resize orientationchange",function() {
		ppdCont.find("p.desc").removeAttr("style");
		ppdCont.find("p.desc").css({
			"maxHeight": maxPpdContHeight()+"px"
		})
	})
	
	modalBg.fadeIn(300);
	popupProjectDetail.animate({
		"opacity":1
	},300,function() {
		popupModal.focus();
	})
	
	btnClose.off().on("click",function() {
		popupProjectDetail.animate({
			"opacity":0
		},300,function() {
			popupProjectDetail.hide();
			popupBtn.focus();
		})
		modalBg.fadeOut(300);		
		$(window).off("scroll");
	})
}

//가이드 앵커 이동
function initGuideAnchorContent() {
	var guide = $("#guide");
	var gContainer = guide.find("article.guide_contents");
	var gContent = gContainer.find(".anchor_cont");
	var gScrollNavi = guide.find("aside.guide_scroll_navi");
	var gsnList = gScrollNavi.find("ul");
	var gsnItem = gsnList.find(">li");
	var gOfsTop = new Array();
	var gViewIs = new Array();
	var hHeight = 100;
	
	$(window).on("load resize orientationchange scroll",function() {
		//console.log(hHeight)
		gContent.each(function(i) {
			gOfsTop[i] = gContent.eq(i).offset().top
			gViewIs[i] = false;
			
			if($(window).scrollTop() >= gOfsTop[i] - hHeight && gViewIs[i] == false) {
				gsnItem.find(">a").removeClass("active")
				gsnItem.eq(i).find(">a").addClass("active")
				
				gViewIs[i] = true
			}
		})
		
		if($(window).scrollTop() >= document.documentElement.offsetHeight - $(window).height()) {
			lastNum = gsnItem.length-1
			
			gsnItem.find(">a").removeClass("active")
			gsnItem.eq(lastNum).find(">a").addClass("active")
			
			gViewIs[lastNum] = true
		}
		
	})
	
	gsnItem.find(">a").on("click",function() {
		tContOfsTop = $($(this).attr("href")).offset().top;
		
		$("html,body").animate({
			"scrollTop": tContOfsTop-hHeight
		},300)
		
		return false;
	})
}

//문의 목록
function initInquiryList() {
	var inquiryList = $("#inquiry ul");
	var ilItem = inquiryList.find(">li>dl");
	var btnTopMove;
	
	$(window).on("load",function() {
		btnTopMove = $("#btn_top_move");
	})
	
	ilItem.find("dt>a").on("click",function() {
		btnTopMove.css({"opacity":0})
		if($(this).parent().parent().hasClass("active") == false) {
			ilItem.removeClass("active");
			ilItem.find("dd").slideUp(200);
			$(this).parent().parent().addClass("active");
			$(this).parent().next("dd").slideDown(200,function() {
				$("html,bidy").animate({
					"scrollTop": "+="+1
				},100,function() {
					btnTopMove.animate({"opacity":1},100)
				});
			});
		} else if($(this).parent().parent().hasClass("active") == true) {
			$(this).parent().parent().removeClass("active");
			$(this).parent().next("dd").slideUp(200,function() {
				$("html,bidy").animate({
					"scrollTop": "+="+1
				},100,function() {
					btnTopMove.animate({"opacity":1},100)
				});
			});
		}
	})
}

//가이드 메뉴
function initGuideMenu(deps1Num,deps2Num,deps3Num) {
	var guide = $("#guide")
	var guideMenu = guide.find("nav.guide_menu");
	var btnMenuOpen = guideMenu.find(">p.btn_menu_open button")
	var gmList = guideMenu.find(">ul");
	var gmDeps1 = gmList.find(">li.deps");
	var gmDeps2 = gmDeps1.find(">ul>li.deps");
	
	if(deps1Num > 0) {
		gmList.find(">li:nth-child("+deps1Num+")").addClass("on");
		gmList.find(">li:nth-child("+deps1Num+")>a").addClass("active")
		gmList.find(">li:nth-child("+deps1Num+")>ul").show();
		if(deps2Num > 0) {
			gmList.find(">li:nth-child("+deps1Num+")>ul>li:nth-child("+deps2Num+")").addClass("on");
			gmList.find(">li:nth-child("+deps1Num+")>ul>li:nth-child("+deps2Num+")>a").addClass("active")
			gmList.find(">li:nth-child("+deps1Num+")>ul>li:nth-child("+deps2Num+")>ul").show();
			if(deps3Num > 0) {
				gmList.find(">li:nth-child("+deps1Num+")>ul>li:nth-child("+deps2Num+")>ul>li:nth-child("+deps3Num+")>a").addClass("active")
			}
		}
	}
	
	gmDeps1.find(">button.btn_deps_menu").on("click",function() {
		if($(this).parent().hasClass("on") == false) {
			gmDeps1.removeClass("on");
			gmDeps1.find(">ul").slideUp(300);
			
			$(this).parent().addClass("on");
			$(this).next().slideDown(300);
		} else if($(this).parent().hasClass("on") == true) {
			$(this).parent().removeClass("on");
			$(this).next().slideUp(300);
		}
	})
	
	gmDeps2.find(">button.btn_deps_menu").on("click",function() {
		if($(this).parent().hasClass("on") == false) {
			gmDeps2.removeClass("on");
			gmDeps2.find(">ul").slideUp(300);
			
			$(this).parent().addClass("on");
			$(this).next().slideDown(300);
		} else if($(this).parent().hasClass("on") == true) {
			$(this).parent().removeClass("on");
			$(this).next().slideUp(300);
		}
	})
	
	
	btnMenuOpen.on("click",function() {
		if($(this).hasClass("on") == false) {
			$(this).addClass("on");
			gmList.slideDown(300);
		} else if($(this).hasClass("on") == true) {
			$(this).removeClass("on");
			gmList.slideUp(300);
		}
	})
	
	$(window).on("resize orientationchange",function() {
		if($(window).width() > 1280 && btnMenuOpen.hasClass("on") == true) {
			btnMenuOpen.removeClass("on");
			gmList.removeAttr("style");
		}
	})
}
	
//radio 버튼 + box 컨텐츠
function showDiv(element){
	var tag = document.getElementsByClassName("box");
	
	//console.log(tag);

	for(var i=0; i<tag.length; i++){
		if(element.id+"Box" == tag[i].id)
			tag[i].style.display = "block";
		else
			tag[i].style.display = "none";
		
	}
	return false;
}

//toggle-open 토글 버튼
function initToggleOpen() {
	var toggleOpen =  $(".toggle-open");
	var btnToggleOpen = toggleOpen.find(">.btn_toggle_open button")
	btnToggleOpen.on("click",function() {
		if($(this).hasClass("on") == false) {
			$(this).addClass("on");
		} else if($(this).hasClass("on") == true) {
			$(this).removeClass("on");
		}
	});
	return false;
}
// 탭 메뉴 tab_area
function tabUI(){
	var el;

	el = $('.tab_area');

	if(el.length <= 0){
		return;
	}


	el.each(function(idx, obj){
		if($(obj).find('.tab > li').hasClass('on')){
			$(obj).find('.tab > li').each(function(){
				var idx = $(this).filter('.on').index();
				if(idx >= 0){
					$(obj).find('.tab > li').eq(idx).addClass('on').siblings().removeClass('on');
					$(obj).find('.tab > li.on > a').append('<span class="blind">선택됨</span>');
					$(obj).find('> .tab_cont').hide().eq(idx).show();
				}

			});
		}
		else{
			$(obj).find('.tab > li').eq(0).addClass('on').siblings().removeClass('on');
			$(obj).find('.tab > li.on > a').append('<span class="blind">선택됨</span>');
			$(obj).find('> .tab_cont').hide().eq(0).show();
		}

		bindEvents(obj);
	});



	function bindEvents(obj){
		var $this = $(obj);

		$this.find('.tab > li > a').on('click', function(e){
			e.preventDefault();
			var index = $(this).closest('li').index();

			if($this.find('> .tab_cont').eq(index).length <= 0){
				return;
			}

			console.log($(this));

			$(this).closest(el).find('.tab > li > a span.blind').remove();
			$(this).append('<span class="blind">선택됨</span>');
			$(this).closest(el).find('.tab > li').eq(index).addClass('on').siblings().removeClass('on');
			$(this).closest(el).find('> .tab_cont').hide().eq(index).show();
			// $(this).closest(el).find('.tab > li > a span.blind').remove();
			// $(this).append('<span class="blind">선택됨</span>');
			// $(this).closest(el).find('.tab > li').eq(index).addClass('on').siblings().removeClass('on');
			// $(this).closest(el).find('> .tab_cont').hide().eq(index).show();

		});

	}
	
	
}
// 탭 메뉴 tab_area-second
function tabSecondUI(){
	var el;

	el = $('.tab_area-second');

	if(el.length <= 0){
		return;
	}


	el.each(function(idx, obj){
		if($(obj).find('.tab_second > li').hasClass('on')){
			$(obj).find('.tab_second > li').each(function(){
				var idx = $(this).filter('.on').index();
				if(idx >= 0){
					$(obj).find('.tab_second > li').eq(idx).addClass('on').siblings().removeClass('on');
					$(obj).find('.tab_second > li.on > a').append('<span class="blind">선택됨</span>');
					$(obj).find('> .tab_second-cont').hide().eq(idx).show();
				}

			});
		}
		else{
			$(obj).find('.tab_second > li').eq(0).addClass('on').siblings().removeClass('on');
			$(obj).find('.tab_second > li.on > a').append('<span class="blind">선택됨</span>');
			$(obj).find('> .tab_second-cont').hide().eq(0).show();
		}

		bindEvents(obj);
	});



	function bindEvents(obj){
		var $this = $(obj);

		$this.find('.tab_second > li > a').on('click', function(e){
			e.preventDefault();
			var index = $(this).closest('li').index();

			if($this.find('> .tab_second-cont').eq(index).length <= 0){
				return;
			}

			$(this).closest(el).find('.tab_second > li > a span.blind').remove();
			$(this).append('<span class="blind">선택됨</span>');
			$(this).closest(el).find('.tab_second > li').eq(index).addClass('on').siblings().removeClass('on');
			$(this).closest(el).find('> .tab_second-cont').hide().eq(index).show();

		});

	}
	
	
}
$(document).ready(function() {
	if($("#btn_top_move").length > 0) {
		initTopMove(); //Top move
	}
	initToggleOpen();  //toggle-open 토글 버튼
	tabUI();           // 탭 메뉴 tab_area
	tabSecondUI();     // 탭 메뉴 tab_area-second
	$('.tooltip').tooltipster(); // tooltip	
	
})

/* 기본 정보 토스트 팝업 */
function toast(string) {
	const toast = document.getElementById("toast");

	toast.classList.contains("reveal") ?
		(clearTimeout(removeToast), removeToast = setTimeout(function () {
			document.getElementById("toast").classList.remove("reveal")
		}, 1000)) :
		removeToast = setTimeout(function () {
			document.getElementById("toast").classList.remove("reveal")
		}, 1000)
	toast.classList.add("reveal"),
		toast.innerText = string
}
/* 안내/정보 토스트 팝업 */
function toastPrimary(string) {
	const toast = document.getElementById("toast-primary");

	toast.classList.contains("reveal") ?
		(clearTimeout(removeToast), removeToast = setTimeout(function () {
			document.getElementById("toast-primary").classList.remove("reveal")
		}, 1000)) :
		removeToast = setTimeout(function () {
			document.getElementById("toast-primary").classList.remove("reveal")
		}, 1000)
	toast.classList.add("reveal"),
		toast.innerText = string
}
/* 에러/실패 토스트 팝업 */
function toastDanger(string) {
	const toast = document.getElementById("toast-danger");

	toast.classList.contains("reveal") ?
		(clearTimeout(removeToast), removeToast = setTimeout(function () {
			document.getElementById("toast-danger").classList.remove("reveal")
		}, 1000)) :
		removeToast = setTimeout(function () {
			document.getElementById("toast-danger").classList.remove("reveal")
		}, 1000)
	toast.classList.add("reveal"),
		toast.innerText = string
}
/* 성공/완료 토스트 팝업 */
function toastSuccess(string) {
	const toast = document.getElementById("toast-success");

	toast.classList.contains("reveal") ?
		(clearTimeout(removeToast), removeToast = setTimeout(function () {
			document.getElementById("toast-success").classList.remove("reveal")
		}, 1000)) :
		removeToast = setTimeout(function () {
			document.getElementById("toast-success").classList.remove("reveal")
		}, 1000)
	toast.classList.add("reveal"),
		toast.innerText = string
}




