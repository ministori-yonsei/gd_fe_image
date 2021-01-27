$(function(){

    let currentIndex = 0;
    let nextIndex = 1;

    $('.image1').eq(0).css({left:0});
    $('.image1').eq(1).css({left:'-300px'});
    $('.image1').eq(2).css({left:'-300px'});

    setInterval(function(){

        $('.image1').eq(currentIndex).animate({
            left:'-300px'
        });
    
        $('.image1').eq(nextIndex).css({
            left:'300px'
        }).animate({
            left:'0px'
        });

        currentIndex = nextIndex;
        nextIndex++;

        if(nextIndex > 2){
            nextIndex = 0;
        }

    },3000);


    let currentIndex2 = 0;
    let nextIndex2 = 1;

    setInterval(function(){

        $('.image2').eq(currentIndex2).removeClass('jump in').addClass('out').delay(1000).queue(function(){
            $(this).removeClass('out').addClass('jump').dequeue();
        });
    
        $('.image2').eq(nextIndex2).removeClass('jump out').addClass('in');

        currentIndex2 = nextIndex2;
        nextIndex2++;

        if(nextIndex2 > 2){
            nextIndex2 = 0;
        }

    },3000);


});