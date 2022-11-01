function searchNav() {

	var searchBtn = $('.tab_nav  .tab_list_filter button'),
		searchList = $('.tab_nav  .tab_list_filter ul'),
		searchItem = $('.tab_nav  .tab_list_filter ul a');

	searchBtn.on('click', function(){
		searchBtn.toggleClass('on');
		searchList.toggleClass('open');
	});

	searchItem.on('click', function(){
		var category = $(this).find('.category').text(),
			 num = $(this).find('.count').text();
		
		searchBtn.find('.category').text(category);
		searchBtn.find('.total_num').text(num);
		searchList.removeClass('open');
		searchBtn.removeClass('on');
	});

	$(window).resize(function(){
		var winW = $(window).width();

		if(winW > 1281){
			searchBtn.removeClass('on');
			searchList.removeClass('open');
		}
	});
}


//filter_selected
function initFilter() {
	const target = $('.filter');
	const selectedBtn = target.find('.filter_selected');
	const filterMenu = $('.filter_menu');
	const button = target.find('.filter_menu button');

	selectedBtn.on('click', function(){		
		if( target.hasClass('active')){       //selectbox 선택자	
			target.removeClass('active');
			target.find('.filter_menu').css({"displaly": "none"}).slideUp(300);
		}else{				
			target.addClass('active');
			target.find('.filter_menu').css({"displaly": "flex"}).slideDown(300);
		}	
		
		button.on('click', function(){
			target.find('.filter_menu').css({"displaly": "none"}).slideUp(300);
		});
	});
	
	button.on('click', function(){
		const text = $(this).text();
		const el = $(this).parent();
		if( !el.hasClass('is-active')){      //tab 선택자
			selectedBtn.text(text);
			el.addClass('is-active').siblings().removeClass('is-active');
			target.removeClass('active');
		}	
	});
}
function initFilterSearch(){
	const targetSch = $('.Sch');
	const selectedBtnSch = targetSch.find('.filter_selected');
	const filterMenuSch = $('.filter_search');
	const buttonSch = targetSch.find('.filter_search button');
	buttonSch.on('click', function(){
		console.log('zzz');
		const textSch = $(this).text();
		const elSch = $(this).parent();
		if( !elSch.hasClass('is-active')){      //tab 선택자
			selectedBtnSch.text(textSch);
			elSch.addClass('is-active').siblings().removeClass('is-active');
			targetSch.removeClass('active');
		}	
	});
}
// 탭 메뉴 tab
function tabUI(){
	const tabGroups = document.querySelectorAll('[data-role="tab"]');
	if (tabGroups) {
	  let currentTarget, targetTabWrap, targetTabListWrap, targetPanelWrap;
	  // 이벤트 타겟 변수 설정
	  const init = (e) => {
		currentTarget = e.target.tagName;
		currentTarget === 'BUTTON' || 'A' ? currentTarget = e.target : currentTarget = e.target.closest('button') || e.target.closest('a');
		targetTabWrap = currentTarget.closest('[data-role="tab"]');
		targetTabListWrap = targetTabWrap.querySelector('[role="tablist"]');
		targetPanelWrap = targetTabWrap.querySelector('.tab_conts');
	  };
	  // 클릭 이벤트
	  const tabClickEvt = (e) => {
		init(e);
		if (currentTarget.ariaSelected === 'false') {
		  // 미선택된 탭 속성 false 상태로 만들기
		  tabRemoveEvt(targetTabListWrap, targetPanelWrap);
		  // 선택 된 탭 속성 true 상태로 만들기
		  tabAddEvt(currentTarget, targetTabWrap);
		};
	  };
	  // 키보드 접근 이벤트
	  const tabKeyUpEvt = (e) => {
		init(e);
		const targetBtnWrap = currentTarget.parentElement;
		if (e.key == 'ArrowRight') {
		  // 키보드 -> 화살표를 눌렀을 때
		  if (targetBtnWrap.nextElementSibling) {
			targetBtnWrap.nextElementSibling.children[0].focus();
			tabRemoveEvt(targetTabListWrap, targetPanelWrap);
			tabAddEvt(targetBtnWrap.nextElementSibling.children[0], targetTabWrap);
		  } 
		  else homeKeyEvt(targetTabListWrap, targetTabWrap, targetPanelWrap);
		} else if (e.key == 'ArrowLeft') {
		  // 키보드 <- 화살표를 눌렀을 때
		  if (targetBtnWrap.previousElementSibling) {
			targetBtnWrap.previousElementSibling.children[0].focus();
			tabRemoveEvt(targetTabListWrap, targetPanelWrap);
			tabAddEvt(targetBtnWrap.previousElementSibling.children[0], targetTabWrap);
		  } else endKeyEvt(targetTabListWrap, targetTabWrap, targetPanelWrap);
		} 
		// 키보드 End 키 눌렀을 때
		else if (e.key == 'End') endKeyEvt(targetTabListWrap, targetTabWrap, targetPanelWrap);
		// 키보드 Home 키 눌렀을 때
		else if (e.key == 'Home') homeKeyEvt(targetTabListWrap, targetTabWrap, targetPanelWrap);
	  };
	  // tab active event 
	  const tabAddEvt = (currentTarget, targetPanelWrap) => {
		// 선택 된 탭 속성 true 로 변경
		currentTarget.setAttribute('aria-selected', 'true');
		currentTarget.removeAttribute('tabindex');
		currentTarget.parentElement.classList.add('active');
		// 연결 된 tabpanel 숨김 해제
		targetPanelWrap.querySelector(`[aria-labelledby="${currentTarget.id}"]`).removeAttribute('hidden');
		targetPanelWrap.querySelector(`[aria-labelledby="${currentTarget.id}"]`).setAttribute('tabindex', '0');
	  };
	  // tab active remove event 
	  const tabRemoveEvt = (tabListWrap, tabPanelWrap) => {
		targetTabListWrap.querySelectorAll('li').forEach((tabBtnWrap) => {
		  // 기존에 선택 된 탭 속성 false 로 변경
		  if (tabBtnWrap.classList.contains('active')) {
			tabBtnWrap.classList.remove('active');
			tabBtnWrap.querySelector('[role="tab"]').setAttribute('aria-selected', 'false');
			tabBtnWrap.querySelector('[role="tab"]').setAttribute('tabindex', '-1');
		  };
		});
		// 기존에 선택 된 tabpanel 숨김
		for (let tabPanel of targetPanelWrap.children) {
		  tabPanel.setAttribute('hidden', 'false');
		  tabPanel.setAttribute('tabindex', '-1');
		};
	  };
	  // 키보드 Home key Event (선택된 탭 리스트 중 첫 번째 리스트로 포커스 이동)
	  const homeKeyEvt = (targetTabListWrap, targetTabWrap, targetPanelWrap) => {
		targetTabListWrap.children[0].children[0].focus();
		tabRemoveEvt(targetTabListWrap, targetPanelWrap);
		tabAddEvt(targetTabListWrap.children[0].children[0], targetTabWrap);
	  };
	  // 키보드 End key Event (선택된 탭 리스트 중 마지막 리스트로 포커스 이동)
	  const endKeyEvt = (targetTabListWrap, targetTabWrap, targetPanelWrap) => {
		const targetTabLists = targetTabListWrap.querySelectorAll('li');
		targetTabLists[targetTabLists.length - 1].children[0].focus();
		tabRemoveEvt(targetTabListWrap, targetPanelWrap);
		tabAddEvt(targetTabLists[targetTabLists.length - 1].children[0], targetTabWrap);
	  };
	  // 클릭/키보드 탭 이벤트 제거/할당
	  tabGroups.forEach((tabWrapper) => {
		const tabBtns = tabWrapper.querySelectorAll('[role="tab"]');
		tabBtns.forEach((tabBtn) => {
		  tabBtn.removeEventListener('click', tabClickEvt);
		  tabBtn.addEventListener('click', tabClickEvt);
		  tabBtn.removeEventListener('keyup', tabKeyUpEvt);
		  tabBtn.addEventListener('keyup', tabKeyUpEvt);
		});
	  });
	};
	
}
// dropdown_nav
function dropdownNav(){

	//nav 스크롤 타입 - 자동선택
	$(window).scroll(function(){
		var docScroll = $(window).scrollTop();
		var menuItem = $('.dropdown_menu ul li a');
		var contItem = $(".wrapper > .content");
		$.each(contItem, function(index, obj){
			var targetItem   = $(".wrapper > .content").eq(index);
				// i	= targetItem.index(),
				targetHeader = $(".sub_navi").outerHeight() - 104, //104
				targetTop = targetItem.offset().top - targetHeader - 400;
			if (targetTop < docScroll) {
				menuItem.removeClass('active');
				menuItem.eq(index).addClass('active');
				$(".dropdown_menu button").text($(".dropdown_menu ul li").children("a").eq(index).text());
			}
		});
	});

	//mav 버튼 타입 - 클릭
	var dropIndex = 0;
	var dropList = $(".dropdown_menu ul li");
	var dropText = $(".dropdown_menu button");
	var dropLink = dropList.children("a");
	var dropPrev = $(".btn_hs_prev");
	var dropNext = $(".btn_hs_next");

	dropLink.on("click", function(e){
		 dropIndex = dropList.find(">a.active").parent().index();
	});
	dropPrev.on("click", function(){
		dropIndex--;
		dropIndexFind(dropIndex);
		dropText_change();
		scroll();
	});
	dropNext.on("click", function(){
		dropIndex++;
		dropIndexFind(dropIndex);
		dropText_change();
		scroll();
	});
	function dropText_change(){
		dropText.text(dropLink.eq(dropIndex).text());
	}
	function dropIndexFind(index){
		var max = dropList.length - 1;
		if(index > max){
			dropIndex = 0;
		}else if(index < 0){
			dropIndex = max;
		}
		//dropLink.eq(dropIndex).get(0).click();
		dropLink.eq(dropIndex).addClass( "active" ).parent("li").siblings().children("a").removeClass( "active" );
	}
	
	function scroll() {
		var target = $(".dropdown_menu a.active").attr('href'),
			targetTop = $(target).offset().top;

		$('html, body').animate({
			scrollTop : targetTop - $(".header").height() - $("#sub_navi").height() - $(".utill").height() - 20
		}, 600);
	}
	
}
//AccordionList
function initAccordionList() {
    var accordion = $(".accordion")
    var accordionList = accordion.find("dl.accordion_list");
    var accTit = accordionList.find(">dt");
    var accCont = accordionList.find(">dd");

    accTit.find(">a").on("click",function() {
        if($(this).parent().hasClass("active") == false) {
            accTit.removeClass("active");
            accCont.slideUp(300);
            $(this).parent().addClass("active");
			$(this).attr("title", "내용닫힘")
            $(this).parent().next().slideDown(300,function() {
                $(window).resize()
				
				//youtube
				$('.accordion_list > dt').on('click', function(){
					for(i=0; i<8; i++) {
						$("iframe")[i].contentWindow.postMessage('{"event":"command","func":"' + 'stopVideo' + '","args":""}', '*');
					}
				})
            });
        } else if($(this).parent().hasClass("active") == true) {
            $(this).parent().removeClass("active");
			$(this).attr("title", "내용열림")
            $(this).parent().next().slideUp(300,function() {
                $(window).resize()
            });
        }
    })
}

//popup
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

function scrollDown() {
	var scrollDown =  $('.btn_scrolldown button'),
		contentTop = $('.wrap .content').offset().top;

	scrollDown.on('click', function(){
		 $('html, body').animate({
			 scrollTop: contentTop
		}, 600);
	});

} 

$(document).ready(function() {
	initFilterSearch();
	initFilter(); 		//filter_selected
	searchNav();
	tabUI();            // 탭 메뉴 tab
	dropdownNav();		// history. dropdown_nav
	initAccordionList();  //AccordionList
	initSearchBtn();
	scrollDown();
})




