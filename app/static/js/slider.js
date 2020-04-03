$(document).ready(function() {
  $('#slider-about').slick({
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    prevArrow: $('#pagination-about-prev'),
    nextArrow: $('#pagination-about-next')
  });
});

$(document).ready(function() {
  $('#slider-catalog').slick({
    dots: true,
    infinite: false,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 3,
    prevArrow: $('#pagination-catalog-prev'),
    nextArrow: $('#pagination-catalog-next')
  });
});

$(document).ready(function() {
  $('#slider-faq').slick({
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 2,
    slidesToScroll: 2,
    prevArrow: $('#pagination-faq-prev'),
    nextArrow: $('#pagination-faq-next')
  });
});
