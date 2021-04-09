function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

$(function() {

  $('body').bind('mousewheel', function (e) {
     if($('.categories-menu').css('display') == 'none'){
         $('.closeWindow').fadeOut();
         $('.header-open').removeClass('active');
         $('.header-close').fadeOut();
         $('.shadow').fadeOut();
         $('.shadow-l').fadeOut();
     }
      if (e.originalEvent.wheelDelta / 120 > 0) {
          $('header').removeClass('active');
          if($(".search-categories ").is(':animated')  == false){
              $('.categories ').css('top','0');
              // if($(window).scrollTop() == 0){
              //     $('.categories ').css('top','0');
              // }
          }

      }
      else {
          if($('.categories-menu').css('display') == 'none') {
              $('header').addClass('active');
              $('body').css({'overflow':'inherit'});
              if($(".search-categories ").is(':animated')  == false){
                  $('.categories ').css('top','-200px');
              }



          }
      }
  });

});