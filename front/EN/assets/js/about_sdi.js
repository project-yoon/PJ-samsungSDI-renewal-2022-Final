//Sub Page Navi
function initSubPageNavi() {
    var subNavi = $("#sub_navi");
    var snHeight;
    var contentsMoveNavi = subNavi.find("nav.contents_move");
    var cmnList = contentsMoveNavi.find(">ul");
    var cmnItem = cmnList.find(">li");
    var cmnItemOfsLeft = new Array();
    var cmnItemWidth = new Array();
    var cmnClickIs = false;
    var subContents = $("#sub_contents");
    var scSection = subContents.find(">section.content");
    var scOfsTop = new Array();
    var scHeight = new Array();
    var scViewIs = new Array();
    var mousedownFired = false;
    $(window).on("load resize orientationchange",function() {
        snHeight = subNavi.outerHeight();
        scSection.each(function(h) {
            if(contentsMoveNavi.length > 0) {
                //console.log(cmnItem.eq(h).offset().left)
                cmnItemOfsLeft[h] = cmnItem.eq(h).offset().left;
                cmnItemWidth[h] = cmnItem.eq(h).outerWidth();
            }
            scOfsTop[h] = scSection.eq(h).offset().top;
            scHeight[h] = scSection.eq(h).outerHeight();
            scViewIs[h] = false;
        })
    })
    $(window).on("load scroll",function() {
        scSection.each(function(i) {
            if($(window).scrollTop() >= scOfsTop[i]-10 && $(window).scrollTop() <= scOfsTop[i] + scHeight[i] - snHeight && scViewIs[i] == false) {
                if(cmnList.scrollLeft() < cmnItemOfsLeft[i] + cmnItemWidth[i] && cmnClickIs == false) {
                    cmnItem.find(">a").removeClass("on");
                    cmnItem.eq(i).find(">a").addClass("on");
                    cmnList.animate({
                        "scrollLeft": cmnItemOfsLeft[i]
                    })
                }
                scViewIs[i] = true;
            } else if($(window).scrollTop() < scOfsTop[i] - 10 && scViewIs[i] == true || $(window).scrollTop() > scOfsTop[i] + scHeight[i] - snHeight && scViewIs[i] == true) {
                scViewIs[i] = false;
            }
        })
    })
    cmnItem.find(">a").on("mousedown",function() {
        cmnItem.find(">a").removeClass("on");
        $(this).addClass("on");
        tContId = $(this).attr("href");
        tContOfsTop = $(tContId).offset().top;
        cmnClickIs = true;
        $("html,body").animate({
            "scrollTop":tContOfsTop - $(".header").height() - $("#sub_navi").height() - $(".utill").height() - 20
        },600,function() {
            cmnClickIs = false;
        })
        mousedownFired = true;
    })
    cmnItem.find(">a").on("keydown",function() {
        mousedownFired = false;
    })
    cmnItem.find(">a").off('click').on('click',function() {
        if(mousedownFired == true) {
            return false;
        }
    })
}
$(document).ready(function() {
    initSubPageNavi(); //Sub Page Navi
    if($(".map_box").length){
        var chkBtn = $('.map_header input:radio'),
            mapList = $('.map_body .map_list');
        chkBtn.off('click').on('click', function(){
            mapList.fadeOut(0);
            var index = $(this).parent().index();
            $(this).is(':checked') == true ?mapList.eq(index).fadeIn(0):"";
        });
    }
})