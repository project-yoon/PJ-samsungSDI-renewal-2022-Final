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

function videoPop() {
    $('.about .video').off('click').on('click', function(){
        $('.popup.full_modal').attr('tabindex','0').show().focus()
    })

    $('.about .video').on('keydown', function(e){
        if(e.which==13) {
            $('.popup.full_modal').attr('tabindex','0').show().focus()
        }
    })

    $('.popup.full_modal .btn_close').off('click').on('click', function(){
        $('.popup.full_modal video').get(0).pause()
        $('.about .tab_item.active a').attr('tabindex','0').focus()
    })

}

$(document).ready(function() {
	initSubPageNavi(); //Sub Page Navi
    videoPop();	


	if($(".map_box").length){
		var chkBtn = $('.map_header input:checkbox'),
			chkAll = $('.map_header #chk_all'),
			chkSub = $('.map_header .chk_sub'),
			mapList = $('.map_body .map_list');
			
		mapList.fadeIn(0);
		chkBtn.attr('checked', true);
		chkBtn.parent('span').addClass('on');

		// all check
		chkAll.off('click').on('click', function(){
			if( $(this).is(':checked') ){
				chkBtn.prop('checked', true);
				chkBtn.parent('span').addClass('on');
				mapList.fadeIn(0);
			}else{ 
				chkBtn.prop('checked', false);
				chkBtn.parent('span').removeClass('on');
				mapList.fadeOut(0);
			}
		});
		
		chkSub.off('click').on('click', function(){
			var index = $(this).parent().parent().index();

			if( $(this).is(':checked') == true ){
				$(this).parent('span').addClass('on');
				mapList.eq(index).fadeIn(0);
			}else{
				$(this).parent('span').removeClass('on');
				mapList.eq(index).fadeOut(0);
			}

			if( $('.chk_sub:checked').length > 2 ){
				chkBtn.prop('checked', true);
				chkBtn.parent('span').addClass('on');
				mapList.fadeIn(0);
			}else{
				chkAll.prop('checked', false);
				chkAll.parent('span').removeClass('on');
			}

			if( chkAll.is(':checked') == false ){
				mapList.eq(0).fadeOut(0);
			}
		});
	}
})

	