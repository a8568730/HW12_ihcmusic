$(document).ready(function(){
	/*$("#head-container").find("input").focus(function(){
		var text = $(this).val();
		$(this).css('background-image','none');
		if(text != '')
		{
			$(this).css('background-image','none');
		}
	});*/
	var w = window.innerWidth; 
	var h = window.innerHeight; 
	var sizebox = $("<span>").text("size: " + w + "," + h);
	sizebox.css({
		"position":"fixed",
		"top":"0",
		"left":"0",
		"z-index":"99999",
		"font-size":"3em",
		"background-color":"yellow",
	});
	$("body").prepend(sizebox);
	
	rewin();
	
	var view = $("#window");
	var wrapper = $("#wrapper");
	
	togglesign();
	gotolist(view, wrapper);
	gotolyrics(view, wrapper,1);
	backtoprev(view, wrapper);
	
});



function togglesign(){
	$("#ss-container").find("#sign-btn").on('click',function(){
		$(this).toggleClass("btn-active");
		var signcontain = $("#sign-group");
		signcontain.slideToggle('fast');
	});
};
function gotolist(view ,wrapper){
	$("#page1-nav").find("a").on('click',function(){
		var h = view.height();
		var w = view.width();
		if(w < 769)
			wrapper.css("top", "-=" + h);

		//music type as title in page2
		var title = $(this).find(".title").text();
		$("#page2").find("h1").text(title);
		
		//get and load the music json file
		var jlist = 'js/' + $(this).data('type') + '.json';
		getjson(jlist);
		
		//add the player icon on covers
		playicon($("#page2"));
	});
};
function gotolyrics(view ,wrapper,num){
	var h = view.height();
	var w = view.width();
	alert(num);
	if(w<481){
		$("#page2").find(".song").on("click",function(){
			wrapper.css("top", "-=" + (h-1));
			
			var name = $(this).data("song");
			$("#page3").find("h1").text(name);
			alert('Phone, name: ' + name);
			document.getElementById('cursong').play();
		});
	}
	else{
		$("#page2").find(".player").on("click",function(){
			var name = $(this).closest('.song').data("song");
			alert('PC, name: ' + name);
			$("#page3").find("h1").text(name);
			document.getElementById('cursong').play();
		});
	}
}
function backtoprev(view, wrapper){
	$(".return").on('click',function(){
		var h = view.height();
		wrapper.css("top", "+=" + h);
	});
}

function playicon(page2){
	page2.find("#songlist").on('click','.player',function(){
		//$(this).toggleClass("show").siblings().removeClass("show");
		$(this).closest("#songlist").find(".player").removeClass("show");
		$(this).closest("#songlist").find(".play-btn").removeClass("play");
		$(this).toggleClass("show");
		$(this).find(".play-btn").toggleClass("play");
		//$(this).find('.play-btn').toggleClass("btn-play");
	});
}
function rewin(){
	//$("div[id^='page']")
	$(window).bind("load resize",function(){
		var w = window.innerWidth; 
		var h = window.innerHeight; 
		
		$("body").find("span:first").text("size: " + w + "," + h);
		
		//$("#window").height(h);
		//$("div[id^='page']")
		/*var view = $("#window");   
		var h_head = view.prev().height();
		var h_view = h - h_head;
		view.height(h_view);
		$("div[id^='page']").height(h_view);
		*/	});

}
/*
function getcon(type){
	switch (type){
		case 'hot':break;
		case 'j-pop':
		case 'guitar':
		case 'BGM':
		case 'radio':
	}
}*/
function getjson(filename){
	$.getJSON(filename, function(data){
		var songlist = $("#page2").find("#songlist");
		songlist.empty();
		
		$.each(data, function(index, en){
			var html = '<div class="song" data-song="' + en['name'] + '">';
			html += '<div class="cover"><div class="player">';
			html += '<button class="play-btn">►</button></div>';
			
			var cover = '"' + en['cover'] + '"';
			html += '<img src=' + cover + '/></div>'; 
			html += '<h3>' + en['name'] + '</h3>';
			html += '<h4>like: ' + en['like'] + '</h4>';
			html += '</div>';
		
			songlist.append(html);
		});
		var view = $("#window");
		var wrapper = $("#wrapper");
		
		//gotolyrtic event works only after loading json finishment 
		gotolyrics(view, wrapper,2);
		return false;
	});
}