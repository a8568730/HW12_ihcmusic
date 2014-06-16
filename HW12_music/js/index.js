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
	gotolyrics(view, wrapper);
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
		wrapper.css("top", "-=" + h);
		
		//music type as title in page2
		var title = $(this).find(".title").text();
		$("#page2").find("h1").text(title);
	});
};
function gotolyrics(view ,wrapper){
	$("#page2").find("p").on("click",function(){
		var h = view.height();
		var w = view.width();
		if( w < 481 ){
			wrapper.css("top", "-=" + h);
		}
		var name = $(this).data("song");
		$("#page3").find("h1").text(name);
		
	});
}
function backtoprev(view, wrapper){
	$(".return").on('click',function(){
		var h = view.height();
		wrapper.css("top", "+=" + h);
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
		var view = $("#window");   
		var h_head = view.prev().height();
		var h_view = h - h_head;
		view.height(h_view);
		$("div[id^='page']").height(h_view);
	});
	
}


function getjson(){
	
}