
$(function() {
    if ($(window).width() <= 750) {
        $('meta[name=viewport]').attr('content', 'initial-scale=0.5, user-scalable=no');
        if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
            var msViewportStyle = document.createElement("style");
            msViewportStyle.appendChild(
                document.createTextNode(
                    "@-ms-viewport{width:auto!important}"
                )
            );
            document.getElementsByTagName("head")[0].appendChild(msViewportStyle);
        }
    } else {
        $('meta[name=viewport]').attr('content', 'width=device-width, initial-scale=0.5, user-scalable=no');
        console.log(1000);
    };
     /*плавный скролл*/
    $('a[href^="#"]').click(function(){
        var el = $(this).attr('href');
        $('body').animate({
            scrollTop: $(el).offset().top}, 2000);
        return false;
    });
  function showMessage(text) {
    $('#message .title').text(text);
    $.magnificPopup.open({
      items: {
        src: $('#message'),
      },
      type: 'inline',
    });
    setTimeout(function() {
      $.magnificPopup.close({
        items: {
          src: $('#message'),
        },
        type: 'inline',
      });
    }, '6000');


  }

  function parseIntNew(that) {
    var param = that;
    param = param.replace(/\s/g, '');
    return parseInt(param);
  }

  var thousandSeparator = function(str) {
    var parts = (str + '').split('.'),
        main = parts[0],
        len = main.length,
        output = '',
        i = len - 1;

    while (i >= 0) {
      output = main.charAt(i) + output;
      if ((len - i) % 3 === 0 && i > 0) {
        output = ' ' + output;
      }
      --i;
    }

    if (parts.length > 1) {
      output += '.' + parts[1];
    }
    return output;
  };

  $('.catalog-list__btn-more').click(function() {
    $(this).toggleClass('minus');//меняем знак
  });

  $('.news-btn-more').click(function() {
    $('.hidep').slideToggle();//убираем скрывающий класс
    $(this).toggleClass('minus');//меняем знак
  });

  $('.search-find__categories').click(function() {
    $(this).toggleClass('active');
    if ($('.search-select').css('display') == 'none') {
      $('.closeWindow').fadeOut();
      $('.search-select').fadeIn();
    }
    else {
      $('.search-select').fadeOut();
    }
  });
  $('.search-select li').click(function() {
    $('.categories-text').text($(this).text());
    $('.categories-text').data('id', $(this).data('id'));
  });
  // $('.search-suppliers').mouseover(function () {//меняем src при наведении
  //     $('.suppliers-img img').attr("src","./images/suppliers-hover.png");
  // });
  // $('.search-suppliers').mouseout(function () {//меняем src при отведении
  //     $('.suppliers-img img').attr("src","./images/suppliers.png");
  // });
  $('.search-find__delivery input').focus(function() {
    $('.closeWindow').fadeOut();
    $('.shadow').fadeOut();
    $('.search-result').fadeIn();
  });
  $('.search-find__delivery input').blur(function() {
    $('.search-result').fadeOut();
  });
  var searchFlag = 0;
  $('.search-find__delivery input').keyup(function(event) {
    // if (event.keyCode == 13) {
    var that = $(this);

      console.log(searchFlag)
console.log($(this))
    var data = 'ID=' +
        that.closest('.search-find').find('.categories-text').data('id') +
        '&SEARCH=' + that.val();

    if (searchFlag == 0) {
        console.log(searchFlag)
      searchFlag = 1;
      $.ajax({
        type: 'post',
        url: '/ajax/search.php',
        data: data,
        dataType: 'html',
        success: function(e) {
          console.log(e);
          console.log(true);
          $('.search-result ul').remove();
          $('.search-result').append(e);
          searchFlag = 0;

        },
        error: function(e) {
          console.log(e);
          console.log(false);
        },
      });
    }
  });

  $('.looking-search-field').keyup(function(e) {
    var data = 'ID=' +
        $(this).closest('.search-find').find('.categories-text').data('id') +
        '&SEARCH=' + $(this).val();
    if (searchFlag == 0) {
      searchFlag = 1;
      $.ajax({
        type: 'post',
        url: '/ajax/searchPage.php',
        data: data,
        dataType: 'html',
        success: function(e) {
          console.log(e);
          console.log(true);
          $('.looking-tabs,.looking-tabs-content').remove();
          $('.search-result').append(e);

          searchFlag = 0;
        },
        error: function(e) {
          console.log(e);
          console.log(false);
        },
      });
    }
    return false;
  });
  /*Почта в хедере*/
  $('.tel-phone').click(function() {
    if ($(this).closest('.header-open').find('.header-close').css('display') == 'none') {
      $('.categories-menu').fadeOut();
      $('.header-close').fadeOut();
      $(this).closest('.header-open').find('.header-close').fadeIn();
      $('.header-open').removeClass('active');
      $(this).closest('.header-open').toggleClass('active');
      $('.shadow').fadeIn();
      $('.shadow-l').fadeIn();
    }
    else {
      $(this).closest('.header-open').find('.header-close').fadeOut();
      $(this).closest('.header-open').removeClass('active');
      $('.shadow').fadeOut();
      $('.shadow-l').fadeOut();
    }
  });
  //хлебные крошки
  $('.baget li').click(function() {
    if ($(this).closest('li').find('.baget-hidden').css('display') == 'none') {
      $(this).find('.next').hide();
      $('.closeWindow').fadeOut();
      $('.baget li').removeClass('active');
      $(this).addClass('active');
      $('.baget-hidden').fadeOut();
      $(this).closest('li').find('.baget-hidden').fadeIn();
    }
    else {
      $(this).removeClass('active');
      $(this).closest('li').find('.baget-hidden').fadeOut();
      $(this).find('.next').fadeIn();

    }

  });
  //размер меню скролла
  // $('.categories-menu ul').css({'height':window.innerHeight - 250});

  //если нажать на тень
  $('.shadow,.shadow-l,.categories-menu__context .close').click(function() {
    $('.header-open').removeClass('active');
    $('.header-tel-callback').fadeOut();
    $('.copy-custom').fadeOut();
    $('.categories-menu').fadeOut();
    $('body').css({'overflow': 'inherit'});
    $('.shadow').fadeOut();
    $('.shadow-l').fadeOut();
  });
  /*Телефон в хедере*/
  // $('.tel-method label').click(function () {
  //     $('.tel-method span').removeClass('active');
  //     $(this).find('span').addClass('active');
  //     $('.shadow').fadeIn();
  // });
  // //меню с категориями
  // $('.categories-item').click(function () {
  //     if ($('.categories-menu').css('display') == 'none') {
  //         $('.closeWindow').fadeOut();
  //         $('.categories-menu').fadeIn();
  //         $('.shadow').fadeIn();
  //     } else {
  //         $('.categories-menu').fadeOut();
  //         $('.shadow').fadeOut();
  //     }
  //
  // });
  //подключение свипера из карточки
  var cardSwiper = new Swiper(
      '.card-block__left__slider_desktop .swiper-container', {
        direction: 'vertical',
        speed: 400,
        spaceBetween: 10,
        slidesPerView: 4,
        paginationClickable: true,
        navigation: {
          nextEl: '.card-block__left__slider_desktop .swiper-button-next',
          prevEl: '.card-block__left__slider_desktop .swiper-button-prev',
        },

      });
  var cardSwiperMob = new Swiper(
      '.card-block__left__slider_mobile .swiper-container', {
        speed: 400,
        spaceBetween: 10,
        slidesPerView: 4,
        paginationClickable: true,
        navigation: {
          nextEl: '.card-block__left__slider_mobile .swiper-button-next',
          prevEl: '.card-block__left__slider_mobile .swiper-button-prev',
        },
        autoplay: {
          delay: 5000,
        },

      });
    var cardswipermob2 = new Swiper('.card-swiper-mob.swiper-container', {
      navigation: {
          nextEl: '.card-swiper-mob.swiper-button-next',
          prevEl: '.card-swiper-mob.swiper-button-prev',
          clickable: true,
      },
      pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
    });
  //подключение свипера из стр.сервиса
  var cardSwiper2 = new Swiper('.swiper-container__service', {
    speed: 1000,
    pagination: {
      el: '.swiper-container__service .swiper-pagination',
      clickable: true,
    },
    autoplay: {
      delay: 5000,
    },
  });
  //подключение свипера из стр.главная
  var cardSwiper3 = new Swiper('.swiper-container__mian', {
    speed: 1000,
    pagination: {
      el: '.swiper-container__mian .swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-container__mian .swiper-button-next',
      prevEl: '.swiper-container__mian .swiper-button-prev',
    },
    autoplay: {
      delay: 5000,
    },
  });
  //подключение свипера из стр.главная
  var cardSwiper4 = new Swiper('.swiper-container__spacial', {
    speed: 1000,
    pagination: {
      el: '.swiper-container__spacial .swiper-pagination',
      clickable: true,
    }, navigation: {
      nextEl: '.swiper-container__spacial .swiper-button-next',
      prevEl: '.swiper-container__spacial .swiper-button-prev',
    },
    autoplay: {
      delay: 5000,
    },
  });
  //подключение свипера из стр.главная меню
  if ($(window).width() <= 1024) {
    var cardSwiper5 = new Swiper('.swiper-container__categories__mobile', {
      slidesPerView: 8,
      navigation: {
        nextEl: '.swiper-container__categories .swiper-button-next',
        prevEl: '.swiper-container__categories .swiper-button-prev',
      },
      autoplay: {
        delay: 5000,
      },
    });
  }
  $(window).resize(function() {
    if ($(window).width() <= 1024) {
      var cardSwiper5 = new Swiper('.swiper-container__categories__mobile', {
        slidesPerView: 8,
        navigation: {
          nextEl: '.swiper-container__categories .swiper-button-next',
          prevEl: '.swiper-container__categories .swiper-button-prev',
        },
        autoplay: {
          delay: 5000,
        },
      });
    }
  });
  //считалка
  $('.button-count span').click(function() {
    var val = parseInt(
        $(this).closest('.button-count').find('.button-count__value').text());

    if ($(this).hasClass('button-count__minus')) {
      if ($(this).hasClass('disabled')) {
        return false;
      }
      else {
        val--;
        if (val == 1) {
          $(this).addClass('disabled');
        }
      }
    }
    else if ($(this).hasClass('button-count__plus')) {
      val++;
      if ($(this).
              closest('.button-count').
              find('.button-count__minus').
              hasClass('disabled')) {
        $(this).
            closest('.button-count').
            find('.button-count__minus').
            removeClass('disabled');
      }
    }
    $(this).closest('.button-count').find('.button-count__value').text(val);
    $(this).closest('.button-count').find('input[name=COUNT]').val(val);
  });
  //табы
  $('.tab-menu li').click(function() {
    if($(window).width() <=750 ){
        if($(this).hasClass('active')){
            $('.tab-menu li').removeClass('active');
            $('.tab-context__item').fadeOut(300);
        }
        else {
            $('.tab-menu li').removeClass('active');
            $(this).addClass('active');
            $('.tab-context__item').fadeOut(300);
            $('.tab-context__item[data-id=' + $(this).data('id') + ']').fadeIn(300);
        }
    }
    else {
        $('.tab-menu li').removeClass('active');
        $(this).addClass('active');
        $('.tab-context__item').hide();
        $('.tab-context__item[data-id=' + $(this).data('id') + ']').show();
    }
  });
  /*табы мобила*/
  //слайдер-фото
  $('.slider-context').click(function() {
    $('.card-block__left__photo img').attr('src', $(this).data('src'));
  });
  //показать еще
  $('.show-more-but').click(function() {
    if ($('.show-more-block').css('display') == 'none') {
      $(this).text('-');
      $(this).
          closest('.portfolio-seo__context__left').
          find('.show-more-block').
          slideDown();
    }
    else {
      $(this).text('+');
      $(this).
          closest('.portfolio-seo__context__left').
          find('.show-more-block').
          slideUp();
    }
  });
  //подробнее для проектирования
  if ($(window).width() > 1000) {
    $('.project-list_open li').click(function() {
      if ($(this).hasClass('active')) {
        $('.project-list_open li').removeClass('active');
        $(this).
            closest(' .project-list__context__item').
            find('.hiden-text').
            fadeOut();
      }
      else {
        $('.project-list_open li').removeClass('active');
        $(this).addClass('active');
        $('.hiden-text').fadeOut();
        $(this).
            closest(' .project-list__context__item').
            find('.hiden-text').
            html($(this).find('.text-context').html());
        $(this).
            closest(' .project-list__context__item').
            find('.hiden-text').
            fadeIn();
      }
    });
  }
  //смена бэкграунда по наведению
  // $('.oure-project__context__item_big,.oure-project__context__item_little
  // ').click(function () { if($(this).find('.data-image').css('display') ==
  // 'none'){ $(this).find('.data-image_hover').fadeOut();
  // $(this).find('.data-image').fadeIn(); }else{
  // $(this).find('.data-image').fadeOut();
  // $(this).find('.data-image_hover').fadeIn(); } }); селект
  $('.select-down').click(function() {
    if ($(this).hasClass('active')) {
      $(this).removeClass('active');
      $(this).closest('.select').find('.select-up').slideUp();
    }
    else {
      $('.select-down').removeClass('active');
      $(this).addClass('active');
      $('.select-up').slideUp();
      $(this).closest('.select').find('.select-up').slideDown();
    }
  });
  $('.select-up li').click(function() {
    $(this).closest('.select').find('.select-down input').val($(this).text());
    $(this).removeClass('active');
    $(this).closest('.select').find('.select-up').slideUp();
  });

  //лайтбокс
  $('.gallery').each(function() { // the containers for all your galleries
    $(this).magnificPopup({
      delegate: 'a', // the selector for gallery item
      type: 'image',
      gallery: {
        enabled: true,
      },
    });
  });
  //ползунок
  // jQuery("#slider").slider({
  //     min: 0,
  //     max: 1000,
  //     values: [0, 1000],
  //     range: true,
  //     stop: function (event, ui) {
  //         jQuery("input#minCost").val(jQuery("#slider").slider("values", 0)
  // + ' руб.'); jQuery("input#maxCost").val(jQuery("#slider").slider("values",
  // 1) + ' руб.'); }, slide: function (event, ui) {
  // jQuery("input#minCost").val(jQuery("#slider").slider("values", 0) + '
  // руб.'); jQuery("input#maxCost").val(jQuery("#slider").slider("values", 1)
  // + ' руб.'); } });

  $('.mobile-search').click(function() {
    $('.mobile-menu_hidden').slideUp();
    $('.mobile-phone_hidden').slideUp();
    $('body').css({'overflow': 'inherit'});
    $('.mobile-search_hidden').slideToggle();
  });
  $('.mobile-phone').click(function() {
    $('.mobile-menu_hidden').slideUp();
    $('.mobile-search_hidden').slideUp();
    $('body').css({'overflow': 'inherit'});
    $('.mobile-phone_hidden').slideToggle();
  });
  //показать еще
  $('.clients .show-more-but').click(function() {
    $('.clients-list').css({'height': 'auto', 'margin': '0'});
    $(this).closest('.more').fadeOut();
  });
  //выпадающее меню футер моб
  if ($(window).width() < 1000) {
    $('.contacts__title').click(function() {
      if ($(this).closest('.contacts-list').find('ul').css('display') ==
          'none') {
        $('.contacts__title').removeClass('active');
        $(this).addClass('active');
        $('.contacts-list ul').slideUp();
        $(this).closest('.contacts-list').find('ul').slideDown();
      }
      else {
        $(this).removeClass('active');
        $(this).closest('.contacts-list').find('ul').slideUp();
      }
    });
  }
  //Открывает фильтр в каталоге
  $('.catalog-filter__btn').click(function() {
    $('.options').slideToggle();
  });

  //clear scripts

  $('.looking-search-field input').keypress(function() {

    $('.looking-reset').addClass('active');

  }).keydown(function(e) {

    if (e.keyCode == 8) {
      if ($(this).val().length == 1) {
        $('.looking-reset').removeClass('active');

      }
    }
  });
  $('.looking-reset').click(function() {

    $(this).removeClass('active');
  });

  $('.looking-tabs a').click(function() {
    var id = $(this).data('look-id');
    $('.looking-tabs a').removeClass('active');
    $(this).addClass('active');

    $('.looking-tabs-content .tabs-content').hide();
    $('#' + id).fadeIn(300);

  });

  $('.stick-btn').click(function() {

    $('.upload-file').click();

  });

  $('.options-dd-link').click(function() {

    $(this).next('.select-up').slideToggle(300);

  });

  $('.options__select .select-up a').click(function() {

    var a = $(this).text();
    $(this).closest('.select-down').find('input').val(a);
    $(this).closest('.select-down').find('.options-dd-link').text(a);
    $(this).closest('.select-up').slideUp(300);

  });
  $('.options__brends label').click(function() {

    if ($(this).hasClass('active')) {
      $(this).removeClass('active');
      $('#' + $(this).data('id')).attr('checked', false);
      $('.load-product button').click();
    }
    else {
      $('input[name=COUNTRY]').attr('checked', false);
      $('.options__countries label').removeClass('active');
      if ($(this).hasClass('reset')) {
        $('.options__brends label').removeClass('active');
        $('.options__brends input').attr('checked', false);
      }else{
          $('.options__brends label').removeClass('active');
      }
      $(this).addClass('active');
      $('#' + $(this).data('id')).attr('checked', true);
      $('.load-product button').click();
    }
  });
  $('.options__countries label').click(function() {
    if ($(this).hasClass('active')) {
      $(this).removeClass('active');
      $('#' + $(this).data('id')).attr('checked', false);
      $('.load-product button').click();
    }
    else {
      $('input[name=BRAND]').attr('checked', false);
      $('.options__brends label').removeClass('active');
      if ($(this).hasClass('reset')) {
        $('.options__countries label').removeClass('active');
        $('input[name=COUNTRY]').attr('checked', false);
      }
      $(this).addClass('active');
      $('#' + $(this).data('id')).attr('checked', true);
      $('.load-product button').click();
    }
  });

  if ($('body .baget-last').length > 1) {
    console.log($('body .baget-last').length);
    $('.baget ul li .name').each(function() {
      $('.options__type .name').text($(this).text());
      $('.options__type a').attr('href', $(this).closest('li').data('src'));
      $('.baget ul .baget-last .next').fadeIn();
    });
  }
  else if ($('.baget-last').length == 1) {
    console.log($('.baget-last').length);
    $('.options__type .name').text($('.baget .name').eq(0).text());
    $('.options__type a').
        attr('href', $('.baget .name').eq(0).closest('li').data('src'));
  }
  else {
    console.log($('.baget-last').length);
    $('.options__type .name').text('Каталог');
    $('.options__type a').attr('href', '/catalog/');
  }

  $('.load-product').submit(function() {
    $('input#minCost').val(parseFloat($('input#minCost').val()));
    $('input#maxCost').val(parseFloat($('input#maxCost').val()));
    var data = $(this).serialize();
    $('input#minCost').val($('input#minCost').val() + ' руб.');
    $('input#maxCost').val($('input#maxCost').val() + ' руб.');
    console.log(data);
    $.ajax({
      type: 'post',
      url: '/ajax/filter.php',
      data: data,
      dataType: 'html',
      success: function(e) {
        console.log(e);
        console.log(true);

        $('.catalog-list').remove();
        $('.filter-context').remove();
        $('.more').remove();
        $('.catalog__context').append(e);

        // $('[data-show-more]').click(function () {
        //     var btn = $(this);
        //     var page = btn.attr('data-next-page');
        //     var id = btn.attr('data-show-more');
        //     var bx_ajax_id = btn.attr('data-ajax-id');
        //
        //     var data = {
        //         bxajaxid: bx_ajax_id
        //     };
        //     data['PAGEN_' + id] = page;
        //
        //     $.ajax({
        //         type: "POST",
        //         url: window.location.href,
        //         data: data,
        //         timeout: 3000,
        //         success: function (data) {
        //             $("#btn_" + bx_ajax_id).remove();
        //             console.log(data);
        //             $('.catalog-list').append(data);
        //         }
        //     });
        // });
      },
      error: function(e) {
        console.log(e);
        console.log(false);
      },
    });

    return false;
  });

  function updateBasket() {
    $.ajax({
      type: 'post',
      url: '/ajax/updateBasket.php',
      data: '',
      dataType: 'html',
      success: function(e) {
          console.log(e);
          $('.basket-count').empty();
        $('.basket-count').append(e);
      },
      error: function(e) {
        console.log(e);
        console.log(false);
      },
    });
  };

  function updatePrice() {
    $.ajax({
      type: 'post',
      url: '/ajax/updatePrice.php',
      data: '',
      dataType: 'html',
      success: function(e) {
          console.log(e);
        $('.basket-order__price span').empty();
        $('.basket-order__price span').append(e);
        $('.basket-num span').empty();
        $('.basket-num span').append(e);
      },
      error: function(e) {
        console.log(e);
        console.log(false);
      },
    });
  };

  $('.add').submit(function() {

    var data = $(this).serialize();

    console.log(data);
    $.ajax({
      type: 'post',
      url: '/ajax/addBasket.php',
      data: data,
      dataType: 'html',
      success: function(e) {
        console.log(e);
        console.log(true);
        updateBasket();
        updatePrice();
        showMessage('Товар успешно добавлен в корзину!');
      },
      error: function(e) {
        console.log(e);
        console.log(false);
      },
    });

    return false;
    // var i = 0;
    // while(i!=$(this).find('input[name=COUNT]')){
    //     $(this).find('a').click();
    //     i++;
    // }
    // return false;
  });

  //корзина
  //изменение кол-ва
  $('.button-count span').click(function() {
    var data = 'ID=' + $(this).closest('.button-count').data('id') + '&COUNT=' +
        $(this).closest('.button-count').find('input').val();
    var that = $(this);
    $.ajax({
      type: 'post',
      url: '/ajax/editBasket.php',
      data: data,
      dataType: 'html',
      success: function(e) {
        console.log(e);
        console.log(true);

        var price = parseIntNew(that.closest('.basket-item').
            find('.basket-item-price__cur span').
            text());
        var count = parseIntNew(
            that.closest('.button-count').find('input').val());
        var itogo = price * count;
        itogo = thousandSeparator(itogo);
        that.closest('.basket-item').
            find('.basket-item-price__total span').
            text(itogo);
        updatePrice();
      },
      error: function(e) {
        console.log(e);
        console.log(false);
      },
    });
  });
  $('.remove-prod').click(function() {
    var that = $(this);
    var data = 'ID=' + $(this).data('id');
    $.ajax({
      type: 'post',
      url: '/ajax/deleteBasket.php',
      data: data,
      dataType: 'html',
      success: function() {
        that.closest('.basket-item').remove();
        updatePrice();
        updateBasket();
      },
      error: function(e) {
        console.log(e);
        console.log(false);
      },
    });
  });

  // Переменная в которую будут располагаться данные файлов
  var files;
  // Получим данные файлов и добавим их в переменную
  $('input[type=file]').change(function() {
    files = this.files;
  });

  $('.stick-btn').click(function() {
    $('.loadFile #file').click();
  });

  $('#file').change(function(event) {
    var i = 0,
        file = this.files,
        len = file.length;

    for (; i < len; i++) {
      console.log('file[i]:');
      console.log(file[i]);
    }
    $('.loadFile').submit();
  });

  $('.loadFile').submit(function(e) {
    e.preventDefault();
    var that = $(this);
    var data = new FormData(that.get(0));
    console.log(data);
    $.ajax({
      url: '/ajax/loadFile.php',
      data: data,
      processData: false,
      contentType: false,
      type: 'post',
      dataType: 'json',
      success: function(value) {
        console.log('true');
        console.log(value);
        if (value != 'Ошибка загрузки файла') {
          $('.order .upload-file-field').val(value[0].name);
          $('.order .upload-file').val(value[1]);
          console.log($('.order .upload-file-field').val());
          console.log($('.order .upload-file').val());
        }
        else {
          showMessage(value);
        }
      },
      error: function(value) {
        console.log('false');
        console.log(value);
      },
    });
    return false;
  });
  $('.order').submit(function() {
    var data = $(this).serialize();
    $.ajax({
      type: 'post',
      url: '/ajax/order.php',
      data: data,
      dataType: 'html',
      success: function(e) {
        console.log(e);
        console.log(true);
        showMessage(e);
        $('#message').addClass('active');
        $('#message.active').click(function () {
            window.location.href = '/';
        });
        setTimeout(function () {
            window.location.href = '/';
        },6000);
      },
      error: function(e) {
        console.log(e);
        console.log(false);
      },
    });
    return false;
  });


//кнопка копировать
  function CopyToClipboard(containerid) {
    if (document.selection) {
      var range = document.body.createTextRange();
      range.moveToElementText(document.getElementById(containerid));
      range.select().createTextRange();
      document.execCommand('Copy');

    }
    else if (window.getSelection) {
      var range = document.createRange();
      range.selectNode(document.getElementById(containerid));
      window.getSelection().addRange(range);
      document.execCommand('Copy');
      alert('text copied');
    }
  }
});
$(function () {
    $('.form_service').submit(function () {
        var that = $(this);
        var data = that.serialize();
        $.ajax({
            type:'post',
            data: data,
            url: '/ajax/form_service.php',
            dataType: 'json',
            success:function (e) {
                console.log('true ' + e);
                that.fadeOut();
                $('.note').text(e);
            },
            error:function (e) {
                console.log(e);
            }
        });
        return false;
    });
    $('.form_ask').submit(function () {
        var that = $(this);
        var data = that.serialize();
        $.ajax({
            type:'post',
            data: data,
            url: '/ajax/form_ask.php',
            dataType: 'json',
            success:function (e) {
                console.log('true ' + e);
                that.fadeOut();
                $('.note_ask').text(e);
            },
            error:function (e) {
                console.log( e);
            }
        });
        return false;
    });
    $('.open-popup').magnificPopup({
            type: 'inline'
        });
    $('.form_review').submit(function () {
        var that = $(this);
        var data = that.serialize();
        $.ajax({
            type:'post',
            data: data,
            url: '/ajax/form_reviews.php',
            dataType: 'json',
            success:function (e) {
                console.log('true ' + e);
                that.fadeOut();
                $('.note_review').text(e);
            },
            error:function (e) {
                console.log( e);
            }
        });
        return false;
    });
});
$('div.link').click(function(){window.open($(this).data("link"), '_blank');return false;});