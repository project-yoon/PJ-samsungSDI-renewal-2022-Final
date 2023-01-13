$(document).ready(function () {
    // 푸터조정
    let interSection = document.querySelector('#footer_wrap');
    interSection.classList.add("foot");
    interSection.setAttribute('data-section-name', "foot");
    // 메인 스크롤
    $(function() {
        $.scrollify({
            section:".sdimain",
            scrollbars:false,
            interstitialSection:".foot",
            easing: "easeOutExpo",
            offset : 80,
            setHeights :false
        });
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
