// JavaScript Document
$(document).ready(function(){
	
	    $(window).bind("load resize", function() {
			re_win();
		});
		
		//ex0.load text to layout
		//$('.box_a').load('index_0_content.html');
		
		//ex1. json
		$('.ba').click(function(){
			
			switch (this.id){
				case 'b_1':
					//getcon('js/list.json');
					getcon('js/list3.json');
					break;
					
				case 'b_2':
					getcon('js/list4.json');
					break;	
			}
			$(this).addClass('cb').siblings().removeClass('cb');
			
			//瘥活�賡�閮苓isplay, ����洵銝�活��fadeIn��
			$('.box_a').css({"display":"none"}).fadeIn();
		});
		
		$('.box_a').on('click','.vbtn',function(){
			$('.box_a').show();
			//alert('haha');
			var $pic = $(this).closest('.text').prev(); 
			var id   = $pic.attr('id');
			var src  = $pic.css('backgroundImage');
			
			$('.pic').css('opacity',1);
			$pic.css('opacity',0);
			$('body').css('backgroundImage',src);
			
		});
});

function re_win(){
	
	var w = window.innerWidth;
	var h = window.innerHeight;
		
	var m_w = $('.box_b_b').width();
	var	m_win = w - m_w;
	
	//$('.box_b_b').height(h);
	
	/*$('.out').height(h);			
	$('.out').width(m_win);
	$('.out').offset({top:0,left:250});
	*/
	$('.box_b_b').height(h);
	$('.out').height(h);			
	$('.out').width(w);
	$('.box_a').width(m_win);
	
		
	$('.out').offset({top:0,left:m_w});
};
	
	/*
function getcon(filename){
	$.getJSON(filename, function(data){
			
		$('.box_a').empty();
		
		$.each(data, function(index, en){
			var html = '<div class="box">';
			html += '<img src="' + en['pic'] + '" height="380px"/>';
			html += '<div class="text">';
			html += '<h2>' + en['title'] + '</h2>';
			html += '<p>' + en['size'] + '</p>';
			html += '<p>' + en['content'] + '</p>';
			html += '<p>' + en['other'] + '</p>';
			html += '</div></div>';
			
			$('.box_a').append(html);
		});
		return false;
	});
};	*/

function getcon(filename){
	$.getJSON(filename, function(data){
			
		$('.box_a').empty();
		
		$.each(data, function(index, en){
			var html = '<div class="box">';
			html += '<div class="pic" id="pic' + index + '"></div>';
			//alert(en['pic']);
			html += '<div class="text">';
			html += '<h2>' + en['title'] + '</h2>';
			html += '<p>' + en['author'] + '</p>';
			html += '<button class="vbtn">View</button>';
			html += '</div></div>';
			
			$('.box_a').append(html);
			
			$('#pic' + index).css({'backgroundImage':'url(' + en['pic'] + ')',
								   'backgroundColor':'#fff'
								 });
			
		});
		return false;
	});
};	