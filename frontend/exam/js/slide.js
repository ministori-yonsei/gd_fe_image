$(function(){

    let currentIndex = 0;
    let nextIndex = 1;

    $('.view-image').eq(0).css({left:0});
    $('.view-image').eq(1).css({left:'-300px'});
    $('.view-image').eq(2).css({left:'-300px'});


    $('.view-image').eq(currentIndex).animate({
        left:'-300px'
    });

    $('.view-image').eq(nextIndex).animate();


});