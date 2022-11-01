//약관 & 정책 버전별 분류
/*
function initTermsPolicyVersionSort() {
    var termsPolicy = $(".privacy_policy");
    var tpVersionNavi = termsPolicy.find(".tp_version_navi");
    var btnTvn = tpVersionNavi.find(".dropdown_menu>button");
    var tvnMenu = tpVersionNavi.find(".dropdown_menu>ul");
    var tvnMenuItem = tvnMenu.find(">li");
    var tpVersionCont = termsPolicy.find(".tp_version_cont");

    tvnMenuItem.find(">a").on("click",function() {
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

	$('.PPtabs button').on('click',function(){
		$(this).toggleClass('on');
		$('.PPtabs ul').toggleClass('expanded');
	});


	// 서브셀렉터 작동
	var subTab = $('.PPtabs ul li');
	subTab.on('click', function(){
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
	$('[role="tab"]').on('click', motherTab);

	var itemAll = $('.tab_list .tab_item a');
};