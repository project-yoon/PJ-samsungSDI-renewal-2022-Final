$(document).ready(function () { 


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