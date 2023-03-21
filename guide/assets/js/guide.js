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
// 탭 메뉴 tab-area
function tabUI(){
	var el;

	el = $('.tab-area');

	if(el.length <= 0){
		return;
	}


	el.each(function(idx, obj){
		if($(obj).find('.tab > li').hasClass('on')){
			$(obj).find('.tab > li').each(function(){
				var idx = $(this).filter('.on').index();
				if(idx >= 0){
					$(obj).find('.tab > li').eq(idx).addClass('on').siblings().removeClass('on');;
					$(obj).find('.tab > li.on > a').append('<span class="blind">선택됨</span>');
					$(obj).find('> .tab-cont').hide().eq(idx).show();
				}

			});
		}
		else{
			$(obj).find('.tab > li').eq(0).addClass('on').siblings().removeClass('on');;
			$(obj).find('.tab > li.on > a').append('<span class="blind">선택됨</span>');
			$(obj).find('> .tab-cont').hide().eq(0).show();
		}

		bindEvents(obj);
	});



	function bindEvents(obj){
		var $this = $(obj);

		$this.find('.tab > li > a').on('click', function(e){
			e.preventDefault();
			var index = $(this).closest('li').index();

			if($this.find('> .tab-cont').eq(index).length <= 0){
				return;
			}

			$(this).closest(el).find('.tab > li > a span.blind').remove();
			$(this).append('<span class="blind">선택됨</span>');
			$(this).closest(el).find('.tab > li').eq(index).addClass('on').siblings().removeClass('on');
			$(this).closest(el).find('> .tab-cont').hide().eq(index).show();

		});

	}
	
	
}
// 탭 메뉴 tab-area-second
function tabSecondUI(){
	var el;

	el = $('.tab-area-second');

	if(el.length <= 0){
		return;
	}


	el.each(function(idx, obj){
		if($(obj).find('.tab-second > li').hasClass('on')){
			$(obj).find('.tab-second > li').each(function(){
				var idx = $(this).filter('.on').index();
				if(idx >= 0){
					$(obj).find('.tab-second > li').eq(idx).addClass('on').siblings().removeClass('on');;
					$(obj).find('.tab-second > li.on > a').append('<span class="blind">선택됨</span>');
					$(obj).find('> .tab-second-cont').hide().eq(idx).show();
				}

			});
		}
		else{
			$(obj).find('.tab-second > li').eq(0).addClass('on').siblings().removeClass('on');;
			$(obj).find('.tab-second > li.on > a').append('<span class="blind">선택됨</span>');
			$(obj).find('> .tab-second-cont').hide().eq(0).show();
		}

		bindEvents(obj);
	});



	function bindEvents(obj){
		var $this = $(obj);

		$this.find('.tab-second > li > a').on('click', function(e){
			e.preventDefault();
			var index = $(this).closest('li').index();

			if($this.find('> .tab-second-cont').eq(index).length <= 0){
				return;
			}

			$(this).closest(el).find('.tab-second > li > a span.blind').remove();
			$(this).append('<span class="blind">선택됨</span>');
			$(this).closest(el).find('.tab-second > li').eq(index).addClass('on').siblings().removeClass('on');
			$(this).closest(el).find('> .tab-second-cont').hide().eq(index).show();

		});

	}
	
	
}
// dropdown_nav
function dropdownNav(){

	//nav 스크롤 타입 - 자동선택
	$(window).scroll(function(){
		var docScroll = $(window).scrollTop();
		var menuItem = $('.dropdown_menu ul li a');
		var contItem = $(".wrap > section.content");
		$.each(contItem, function(index, obj){
			var targetItem   = $(".wrap > section.content").eq(index);
				// i	= targetItem.index(),
				targetHeader = $(".sub_navi").outerHeight() - 104, //104
				targetTop = targetItem.offset().top - targetHeader;
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

	dropLink.on("click", function(){
		dropIndex = dropList.find(">a.active").parent().index();
	});
	dropPrev.on("click", function(){
		dropIndex--;
		dropIndexFind(dropIndex);
		dropText_change();
	});
	dropNext.on("click", function(){
		dropIndex++;
		dropIndexFind(dropIndex);
		dropText_change();
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
		dropLink.eq(dropIndex).get(0).click();
		dropLink.eq(dropIndex).addClass( "active" ).parent("li").siblings().children("a").removeClass( "active" );
	}


}
//AccordionList
function initAccordionList() {
    var accordion = $(".accordion")
    var accordionList = accordion.find("dl.accordion_list");
    var accTit = accordionList.find("dt");
    var accCont = accordionList.find("dd");

    accTit.find(">a").on("click",function() {
        if($(this).parent().hasClass("active") == false) {
            accTit.removeClass("active");
            accCont.slideUp(300);
            $(this).parent().addClass("active");
			$(this).attr("title", "내용닫힘")
            $(this).parent().next().slideDown(300,function() {
                $(window).resize()
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

$(document).ready(function() {
	initFilter(); 		//filter_selected
	tabUI();            // 탭 메뉴 tab-area
	tabSecondUI();      // 탭 메뉴 tab-area-second
	dropdownNav();		// history. dropdown_nav
	initAccordionList();  //AccordionList
})
