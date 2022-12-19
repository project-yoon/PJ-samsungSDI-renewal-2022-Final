$(document).ready(function () {
    // 메인 스크롤

    var mainSec = document.querySelector('.main')
    var contItems = [...document.querySelectorAll('.cont_item')];
    var sectionEls = [
        document.querySelector('.sub_visual'),
        ...contItems.splice(0, contItems.length - 1),
    ];

    var scrollEl = document.documentElement;
    var timeoutId;
    var debounceMs = 50;

    function scrollSection(direction) {
        clearTimeout(timeoutId);

        timeoutId = setTimeout(() => {
            var down = direction > 0;
            var currentPosition = scrollEl.scrollTop;
            var offset = document.querySelector('.utill').clientHeight + document.querySelector('header').clientHeight;
            var positions = sectionEls.map(e => e.getBoundingClientRect().bottom + currentPosition - offset);
            var nextPosition = down ? scrollEl.scrollHeight : 0;
        
            if (down) {
                // 아래 방향
                var correctedPosition = currentPosition + 50;
                var i = positions.findIndex(v => correctedPosition <= v);
                if (i > -1) nextPosition = positions[i];
            } else {
                // 위 방향
                var reversedPositions = positions.reverse();
                var correctedPosition = currentPosition - 50;
                var i = reversedPositions.findIndex(v => correctedPosition >= v);
                if (i > -1) nextPosition = reversedPositions[i];
            }
            
            scrollEl.scrollTo(0, nextPosition);
        }, debounceMs);
    }

    // 메인 윈도우 휠 이벤트
    mainSec.addEventListener('wheel', (evt) => {
        if (!evt.ctrlKey) {
            evt.preventDefault();
            scrollSection(evt.deltaY);
        }
    }, { passive: false });

    // 메인 윈도우 터치 이벤트
    var touchStartX; // 터치 시작 포지션 X
    var touchStartY; // 터치 시작 포지션 Y
    var maxOffsetX = 20;
    var minOffsetY = 50;
    
    mainSec.addEventListener('touchstart', (evt) => {
        var touch = evt.touches[0];
        touchStartX = touch.clientX;
        touchStartY = touch.clientY;
    });
    
    mainSec.addEventListener('touchmove', (evt) => {
        evt.preventDefault(); // 스크롤 동작 방지
    }, { passive:false })
    
    mainSec.addEventListener('touchend', (evt) =>{
        if (evt.touches.length === 0) {
            var touch = evt.changedTouches[evt.changedTouches.length - 1];
            var offsetX = touchStartX - touch.clientX; // 터치 이동거리 X
            var offsetY = touchStartY - touch.clientY; // 터치 이동거리 Y
            var swiped = Math.abs(offsetX) <= maxOffsetX && Math.abs(offsetY) >= minOffsetY; // 터치 스와이프 판단
            
            if (swiped) { 
                scrollSection(offsetY);
            }
        }
    });

    // 메인 스와이퍼
    var swiper = new Swiper(".newsSlide", {
        slidesPerView: "auto",
        spaceBetween: 30,
        freeMode: true,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        breakpoints: {
            319: {
                spaceBetween: 16,
            },
            719: {
                spaceBetween: 16,
            },
            1281: {
                spaceBetween: 30,
            },
        },
    });
})
