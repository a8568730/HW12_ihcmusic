$(document).ready(function(){
	/*$("#head-container").find("input").focus(function(){
		var text = $(this).val();
		$(this).css('background-image','none');
		if(text != '')
		{
			$(this).css('background-image','none');
		}
	});*/
	var window = $("#window");
	var wrapper = $("#wrapper");
	
	togglesign();
	gotolist(window, wrapper);
	backtoprev(window, wrapper);
});



function togglesign(){
	$("#ss-container").find("#sign-btn").on('click',function(){
		$(this).toggleClass("btn-active");
		var signcontain = $("#sign-group");
		signcontain.slideToggle('fast');
	});
};

function gotolist(window ,wrapper){
	$("#head-nav").find("a").on('click',function(){
		var h = window.height();
		wrapper.offset({'top':-h});
		
		var list = $(this).find(".title").text();
		$("#page2").find("h1").text(list);
	});
};

function backtoprev(window, wrapper){
	$(".return").on('click',function(){
		var h = window.height();
		wrapper.css("top", "+=" + h + "px");
	});
}