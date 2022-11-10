//약관 & 정책 버전별 분류
/*
function initTermsPolicyVersionSort() {
    var termsPolicy = $(".privacy_policy");
    var tpVersionNavi = termsPolicy.find(".tp_version_navi");
    var btnTvn = tpVersionNavi.find(".dropdown_menu>button");
    var tvnMenu = tpVersionNavi.find(".dropdown_menu>ul");
    var tvnMenuItem = tvnMenu.find(">li");
    var tpVersionCont = termsPolicy.find(".tp_version_cont");

    tvnMenuItem.find(">a").off('click').on('click',function() {
        tContId = $(this).attr("href")

        tpVersionCont.hide();
        $(tContId).show();
		tvnMenu.css({"display":"block"});

        btnTvn.removeClass("on");
        tvnMenu.css({"visibility":"hidden"});

        return false;
    })
}

$(document).ready(function() {
	initTermsPolicyVersionSort() //약관 & 정책 버전별 분류
})
*/
function subTab(e) {

	$('.PPtabs button').off('click').on('click',function(){
		$(this).toggleClass('on');
		$('.PPtabs ul').toggleClass('expanded');
		tabSeleted();
	});


	// 서브셀렉터 작동
	var subTab = $('.PPtabs ul li');
	subTab.off('click').on('click', function(){
		var tab_id = $(this).attr('data-tab');
		$([$(this).parent()[0]]).toggleClass('expanded');
		$(this).addClass('ppactive').siblings('.ppactive').removeClass('ppactive');
		$(this).parent().parent().parent().find('.tp_version_cont').removeClass('current');
		$(this).parent().parent().parent().find('#'+tab_id).addClass('current');
		//$('#'+tab_id).addClass('current');

		var conText = $(this).text();
		$(this).parent().parent().find('button').toggleClass('on');
		$(this).parent().parent().find('button').text(conText);
	});
	function motherTab(e) {
		// 전체 탭을 눌렀을때
		var $eTarget = $(e.currentTarget); 
		var $targetPanel = $('[aria-labelledby="' + $eTarget.attr('id') + '"]');
		$($targetPanel).find('.PPtabs-container .tp_version_cont').removeClass('current');
		$($targetPanel).find('.PPtabs-container .tp_version_cont:eq(0)').addClass('current');
		$($targetPanel).siblings().find('.PPtabs-container .tp_version_cont:eq(0)').addClass('current');

		var firstTxt = $($targetPanel).find('.PPtabs-container .PPtabs li:eq(0)').text();

		$('.PPtabs button').removeClass('on').text(firstTxt);
		$('.PPtabs ul').removeClass('expanded');
	}
	$('[role="tab"]').off('click').on('click', motherTab);

	var itemAll = $('.tab_list .tab_item a');

	
};
function tabSeleted(){
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
};
$(document).ready(function() {
	tabSeleted();
});