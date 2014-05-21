$(function(){
    var step=$('.box').width();
    var posArray=[];
    var numArray=[];    
    
    //preset
    addarrow();
    setsize();
    $('.content').each(function(){
        var index = $(this).index();
        var num = $(this).find('.box').length;
        numArray.push(num);
        posArray.push(0);
    });
    
    //json
    getcon('js/list4.json');
    
    //move
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
        if(pos < (numArray[index-1]-4)){
            $content.find('.out')                  
                    .find('.container')
                    .css({top:0,left:"-=" + step + "px"});
            pos += 1;
            posArray[index-1] = pos;
        }
    });
    
    //pick pattern 
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


function getcon(filename){
	$.getJSON(filename, function(data){
			
		var html = ' <div class="content"> '
					+ '<div class="out">'
						+ '<div class="container">';

		$.each(data, function(index, en){
			//html += '<div class="pic" id="pic' + index + '"></div>';
			//html += '<div class="text">';
			//html += '<h2>' + en['title'] + '</h2>';
			//html += '<p>' + en['author'] + '</p>';
			//html += '<button class="btn view">View</button>';
			//html += '</div></div>';
			html += '<div class="box">';
			html += '<img src="' + en['pic'] + '"/>';
            html += '</div>';
			/*a=$('<div>');
			a.css('cc',5);
			b=$('<div>');
			b.css('cc',6);*/
            /*
             * 
             *<div></div> -> css.backgroudnImage p1, append
            <div></div> -> backgroudnImage p2, append
            */
			//$('#pic' + index).css({'backgroundImage':'url(' + en['pic'] + ')',
				//				   'backgroundColor':'#fff'
					//			 });
			
		});
		$('#wrapper').append(html);
		
		return false;
	});
};	
