//약관 & 정책 버전별 분류
function initTermsPolicyVersionSort() {
    var termsPolicy = $("section#privacy_policy");
    var tpVersionNavi = termsPolicy.find(".tp_version_navi");
    var btnTvn = tpVersionNavi.find(".dropdown_menu>button");
    var tvnMenu = tpVersionNavi.find(".dropdown_menu>ul");
    var tvnMenuItem = tvnMenu.find(">li")
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