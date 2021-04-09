$(function () {
    $('.categories-item a').click(function () {
       var data = $(this).data('id');

       // $('.header-open').removeClass('active');
       $('.copy-custom').fadeOut(500);
       if($('.categories-menu').css('display') == 'block' && $('.categories-menu .main-block__menu.sections__'+data).css('display') == 'block'){

           $('.categories-menu').fadeOut(500);
           $('.shadow').fadeOut(500);
           $('.shadow-l').fadeOut(500);
           if(data != ''){
               return false;
           }

       }
       if ($('.categories-menu').css('display') == 'none') {
           $('.closeWindow').hide();
           $('.shadow').fadeIn(500);
           $('.categories-menu').fadeIn(500);

           // $('body').css({'overflow':'hidden'});
       }
       $('.main-block__menu li a').removeClass('active');
       $('.categories-menu .main-block__menu').hide();
       $('.categories-menu .main-block__menu.sections__'+data).show();
       $('.categories-menu__context__item').hide();
       $('.categories-menu__context__item[data-id=1]').show();
        if(data != ''){
            return false;
        }




   });
    $('.main-block__menu li a').click(function () {
        $('.main-block__menu li a').removeClass('active');
        $(this).addClass('active');
        var data = $(this).data('id');
        if($('.categories-menu__context__item[data-id=2] .category__menu.sections__'+data).length > 1){
            $('.categories-menu__context__item[data-id=2] .category__menu.sections__'+data).eq(0).remove();
        }
        $('.categories-menu__context__item[data-id=2] .category__menu').hide();
        $('.categories-menu__context__item[data-id=2] .category__menu.sections__'+data).fadeIn(300);
        $('.categories-menu__context__item[data-id=2]').fadeIn(300);

        console.log(data);
        if(data != undefined){
            return false;
        }
    });
    //выпадающее мобильное меню
    $('.mobile-menu').click(function () {
        $('.mobile-search_hidden').slideUp();
        $('.mobile-phone_hidden').slideUp();

        if ($('.mobile-menu_hidden').css('display') == 'none') {
            $('.open-category').slideUp();
            $('.mobile-menu_hidden').slideDown();
            $('body').css({'overflow': 'hidden'});
            $(this).addClass('active');

        } else {
            $('.mobile-menu_hidden').slideUp();
            $('.open-category').slideDown();
            $('body').css({'overflow': 'inherit'});
            $(this).removeClass('active');
        }
    });
    //меню с категориями
    $('.open-category').click(function () {
        $('body').css({'overflow': 'hidden'});
        $('.mobile-menu_hidden').css({'position':'relative'});
        $('.step1').slideUp();
        $('.mobile-menu_hidden').css({'position':'absolute'});
        $('.mobile-menu_hidden').hide();
        $('.mobile-menu').removeClass('active');
        $('.step2').slideDown();
    });

    $('.step2 li').click(function () {
        var that = $(this);
        if(that.data('id')!= ''){
            var data = "ID="+that.data('id');
            $.ajax({
                type:'post',
                url:'/bitrix/templates/STOLOVAYA_2017/include/mobile.php',
                data: data,
                dataType:'json',
                success:function (e) {
                    console.log(e);
                    console.log(true);
                    $('.mobile-header-menu__content.step3 .mobile-header-menu__content__context').remove();
                    $('.mobile-header-menu__content.step3 .to-append').append(e.STEP1);
                    $('.step2').hide("slide", { direction: "left" }, 300);
                    $('.step3 .mobile-header-menu__content__head .name').text(that.text());
                    $('.step3').show("slide", { direction: "right" }, 300);
                    $('.mobile-header-menu__content.step4 .to-append_content').remove();
                    $('.mobile-header-menu__content.step4 .to-append').append(e.STEP2);


                    $('.step3 li').click(function () {
                        $('.step3').hide("slide", { direction: "left" },300);
                        $('.step4 .to-append_content').hide();
                        $('.step4 .mobile-header-menu__content__head .name').text($(this).text());
                        $('.step4 .to-append_content[data-id='+$(this).data('id')+']').show();
                        $('.step4 ').show("slide", { direction: "right" }, 300);

                    });
                },
                error:function (e) {
                    console.log(e);
                    console.log(false);
                }
            });
        }

        return false;
    });
    $('.step3 .back').click(function () {
        $('.step3').hide("slide", { direction: "right" }, 320);
        $('.step2').show("slide", { direction: "left" }, 400);
    });
    $('.step4 .back').click(function () {
        $('.step4').hide("slide", { direction: "right" }, 320);
        $('.step3').show("slide", { direction: "left" }, 400);
    });

    $('.close-step').click(function () {
        $('body').css({'overflow': 'inherit'});
        $(this).closest('.mobile-header-menu__content').slideUp();
        $('.step1').slideDown();
    });
});
