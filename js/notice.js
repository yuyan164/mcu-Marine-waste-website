if ($('.marquee').length > 0) {
    $('.marquee ul').slick({
        dots: false,
        infinite: true,
        vertical: true,
        verticalSwiping: true,
        speed: 300,
        autoplaySpeed: 5000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        pauseOnHover: true, //滑鼠移過後暫停自動撥放
        focusOnSelect: true,
    });
}