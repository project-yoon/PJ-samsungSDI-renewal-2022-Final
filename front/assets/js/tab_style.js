 function subNav1() {
	// 인베스트먼트에 있는 네비
	var subNav1 = $(".sub_nav1"),
		subNav1Btn = $(".sub_nav1 .depth > a"),
		subNav1Cont = $(".sub_nav1 .depth > ul"),
		speed = 300;

	subNav1Btn.off('click').on('click', function(e){
		e.preventDefault();
		
		if($(this).parent().hasClass('on')){
			subNav1Btn.parent().removeClass('on');
			subNav1Cont.slideUp(speed);
		}else{
			subNav1Btn.parent().removeClass('on')
			$(this).parent().addClass('on');
			subNav1Cont.slideUp(speed);
			$(this).next().slideDown(speed);
		}
	});
}


//서브네비 있는 페이지
function sticky() {
	$(window).on("wheel", function(e) {
		var headerH = $('#header_wrap header').height();
		var mouseMove = e.originalEvent.deltaY;
		// 1. 내려갈때
		// 		서브탭 안지났다면 (1-1) : 헤더 O, 서브탭 X
		// 		서브탭   지났다면 (1-2) : 헤더 X, 서브탭 O
		// 2. 올라갈때
		// 		서브탭 상관없이  : 헤더 O, 서브탭 X
        if(mouseMove < 0 ) { // 2
			$('body').removeClass('sticky');
			$('#header_wrap').removeClass('none');
		}else if(mouseMove > 0 ) { // 1
			if($('.content_inner').offset().top <= $(window).scrollTop() + headerH) { // 1-2
				$('body').addClass('sticky');
				$('#header_wrap').addClass('none'); 				
			} else if($('.content_inner').offset().top >= $(window).scrollTop()) { // 1-1
				$('#header_wrap').removeClass('none'); 
			}
		}
    })
}


 function tabMenu1() {
	 // 비즈니스에 있는 탭
	var	tabMenu1 = $(".tab_area1"),
		tabMenuBtn = tabMenu1.find(".tab_list1 button"),
		tabMenuList = tabMenu1.find(".tab_list1 ul"),
		tabMenuBtn2 = tabMenuList.find("a");

	tabMenuBtn.off('click').on('click', function(){
		$(this).toggleClass('on');
		tabMenuList.toggleClass('on');
	});
	
	tabMenuBtn2.off('click').on('click', function(){
		var $text = $(this).text();
		
		tabMenuBtn.text($text);
		tabMenuBtn.removeClass('on');
		tabMenuList.removeClass('on');
	});
	
	$(window).resize(function(){
		var winW = $(window).width();

		if(winW > 1281){
			tabMenuBtn.removeClass('on');
			tabMenuList.removeClass('on');
		}
	});
 }

 function fixNav() {
	 // about sdi 에 있는 네비
	var fixNav = $(".fix_nav"),
		fixNavBtn = fixNav.find("a"),
		fixNavStart = $("section.content").offset().top,
		fixCont = $(".fix_items > .item");

	$(window).on('scroll', function(){
		var sTop = $(window).scrollTop();
		
		if(sTop >= fixNavStart){
			fixNav.addClass('on');
		}else{
			fixNav.removeClass('on');
		}

		fixCont.each(function(index, item){
			var target = $(this).offset().top - fixNav.outerHeight() - $("header").outerHeight() - $("#header_wrap .utill").outerHeight(),
				targetIndex = $(this).index();
				
			if(sTop >= target - 50){
				fixNavBtn.parent().removeClass('on');
				fixNavBtn.parent().eq(targetIndex).addClass('on');
			}
		});
	});
	
	// 네비 클릭
	fixNavBtn.off('click').on('click', function(e){
		e.preventDefault();
		var target = $(this.hash).offset().top,
			winW = $(window).width();

		if(winW > 761){
			$('html, body').animate({
				scrollTop : target - fixNav.outerHeight() - $("header").outerHeight() - 30
			},300);	
		}else{
			$('html, body').animate({
				scrollTop : target - fixNav.outerHeight() - $("header").outerHeight() - $("#header_wrap .utill").outerHeight() - 30
			},300);	
		}
	});
 }

$(document).ready(function(){
	subNav1(); // 인베스트먼트에 있는 네비
	tabMenu1(); // 비즈니스에 있는 탭
	fixNav(); // 픽스되는 네비
	sticky();
});


