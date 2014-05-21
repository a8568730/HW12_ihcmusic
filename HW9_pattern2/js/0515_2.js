$(function(){
    addarrow();
    setsize();
    var step=$('.box').width();
    var posArray=[];
    var numArray=[];    
    
    $('.content').each(function(){
        var index = $(this).index();
        var num = $(this).find('.box').length;
        numArray.push(num);
        posArray.push(0);
    });
        
    $('.content').on('click','.left',function(){
        var $content = $(this).parent();
        var index = $content.index();
        var pos = posArray[index-1];    
        if(pos > 0){
            $content.find('.out')                  
                    .find('.container')
                    .css({top:0,left:"+=" + step + "px"});
            pos -= 1;
            posArray[index-1] = pos;
        }
    });
     $('.content').on('click','.right',function(){
        var $content = $(this).parent();
        var index = $content.index();
        var pos = posArray[index-1];
//         alert(pos +"," + numArray[index-1]);
        if(pos < (numArray[index-1]-4)){
            $content.find('.out')                  
                    .find('.container')
                    .css({top:0,left:"-=" + step + "px"});
            pos += 1;
            posArray[index-1] = pos;
        }
    });
    //$('.container').css({top:0,left:"0px"});
    $('.box').on('click','div',function(){
        var src =  $(this).css('backgroundColor');
        $('body').css('backgroundColor',src);
    });
});



function addarrow(){
    var leftarrow = '<span class="arrow left"><<</span>';
    var rightarrow = '<span class="arrow right">>></span>';
    $('.content').prepend(leftarrow)
                 .append(rightarrow);
};

function setsize(){
    var w = $('.box').width();
    var num = $('.container').data('num');
    $('.container').width(w*(num+1));
};