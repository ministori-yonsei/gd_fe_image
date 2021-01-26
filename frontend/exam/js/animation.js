$(function(){

    $('.gnb1').on('mouseenter', function(){

        $('.gnb1-sub').css({
            opacity:1
        });

    });

    $('.gnb1').on('mouseleave', function(){

        $('.gnb1-sub').css({
            opacity:0
        })

    });

});

$(function(){

    $('.gnb2').on('mouseenter', function(){

        $('.gnb2-sub').animate({
            opacity:1
        });

    });

    $('.gnb2').on('mouseleave', function(){

        $('.gnb2-sub').animate({
            opacity:0
        })

    });

});

$(function(){

    $('.gnb3').on('mouseenter', function(){

        $('.gnb3-sub').addClass('end');

    });

    $('.gnb3').on('mouseleave', function(){

       $('.gnb3-sub').removeClass('end');

    });

});