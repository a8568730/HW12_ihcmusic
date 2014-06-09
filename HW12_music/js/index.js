$(document).ready(function(){
	/*$("#head-container").find("input").focus(function(){
		var text = $(this).val();
		$(this).css('background-image','none');
		if(text != '')
		{
			$(this).css('background-image','none');
		}
	});*/
	
	$("#ss-container").find("button").on('click',function(){
		$(this).toggleClass("btn-active");
		//var signcontain = $(this).closest("#ss-container").next();
		var signcontain = $('#sign-group');
		signcontain.slideToggle('fast');
	});
});