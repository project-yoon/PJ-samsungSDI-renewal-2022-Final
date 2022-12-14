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

function fixNav() {
    // about sdi 에 있는 네비
    var fixNav = $(".fix_nav"),
      fixNavBtn = fixNav.find("a"),
      fixNavStart = $("section.content").offset().top,
      fixCont = $(".fix_items > .item");
  
    $(window).on("scroll", function () {
      var sTop = $(window).scrollTop();
  
      if (sTop >= fixNavStart) {
        fixNav.addClass("on");
      } else {
        fixNav.removeClass("on");
      }
  
      fixCont.each(function (index, item) {
        var target =
            $(this).offset().top -
            fixNav.outerHeight() -
            $("header").outerHeight() -
            $("#header_wrap .utill").outerHeight(),
          targetIndex = $(this).index();
  
        if (sTop >= target - 50) {
          fixNavBtn.parent().removeClass("on");
          fixNavBtn.parent().eq(targetIndex).addClass("on");
        }
      });
    });
  
    // 네비 클릭
    fixNavBtn.off("click").on("click", function (e) {
      e.preventDefault();
      var target = $(this.hash).offset().top,
        winW = $(window).width();
  
      if (winW > 761) {
        $("html, body").animate(
          {
            scrollTop:
              target - fixNav.outerHeight() - $("header").outerHeight() - 30,
          },
          300
        );
      } else {
        $("html, body").animate(
          {
            scrollTop:
              target -
              fixNav.outerHeight() -
              $("header").outerHeight() -
              $("#header_wrap .utill").outerHeight() -
              30,
          },
          300
        );
      }
    });
  }
  

$(document).ready(function() {
    initSubPageNavi(); //Sub Page Navi
    if($(".map_box").length){
        var chkBtn = $('.map_header input:radio'),
            mapList = $('.map_body .map_list');
        mapList.eq(0).show();
        chkBtn.off('click').on('click', function(){
            mapList.fadeOut(0);
            var index = $(this).parent().index();
            $(this).is(':checked') == true ?mapList.eq(index).fadeIn(0):"";
        });
    }
    fixNav() 
})