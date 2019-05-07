$(function() {

  $('.lazy').Lazy();

  new WOW({
    mobile: true
  }).init();

  $('.slider__view').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    asNavFor: '.slider__previews',
  });

  $('.slider__previews').slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    asNavFor: '.slider__view',
    prevArrow: '.prevArrow',
    nextArrow: '.nextArrow',
    dots: false,
    centerMode: false,
    focusOnSelect: true,
    rows: 0, // fix problem with DIV
  });

  $('.feedback__scans').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    prevArrow: '.feedback-prev',
    nextArrow: '.feedback-next',
    responsive: [
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          prevArrow: '.feedback-prev',
          nextArrow: '.feedback-next'
        }
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      }
    ]
  });

  $(".header-button").on("click", function() {
    $(".overlay").show();
  });

  $(".contacts-card__button").on("click", function() {
    $(".overlay").show();
  })

  $('.popup-close').on("click", function(){
    $('.overlay').hide();
  })

  $('.overlay:not(.popup)').on("click", function(){
    $('.overlay').hide();
  })
});