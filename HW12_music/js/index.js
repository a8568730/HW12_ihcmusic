var prev_size = window.innerWidth;
var prev_page = 1;
	
$(document).ready(function() {
	/*
	 * $("#head-container").find("input").focus(function(){ var text =
	 * $(this).val(); $(this).css('background-image','none'); if(text != '') {
	 * $(this).css('background-image','none'); } });
	 */
	var w = window.innerWidth;
	var h = window.innerHeight;
	var sizebox = $("<span>").text("size: " + w + "," + h);
	sizebox.css({
		"position" : "fixed",
		"top" : "0",
		"left" : "0",
		"z-index" : "99999",
		"font-size" : "3em",
		"background-color" : "yellow",
	});
	$("body").prepend(sizebox);

	rewin();

	var view = $("#window");
	var wrapper = $("#wrapper");

	togglesign();
	gotolist(view, wrapper);// json
	// gotolyrics(view, wrapper,1);
	backtoprev(view, wrapper);

});

function togglesign() {
	// phone, pad: toggle sign-up and sign-in
	$("#ss-container").find("#sign-btn").on('click', function() {
		$(this).toggleClass("btn-active");
		var signcontain = $("#sign-group");
		signcontain.slideToggle('fast');
	});
};
function gotolist(view, wrapper) {
	$("#page1-nav").find("a").on('click', function() {
		var h = view.height();
		var w = view.width();
		// phone, pad
		prev_page = 2;
		resettop();
//		if (w < 769)
//			wrapper.css("top", -h);

		// music type as title in page2
		var title = $(this).find(".title").text();
		$("#page2").find("h1").text(title);

		// get *.json list
		var jlist = 'js/' + $(this).data('type') + '.json';
		getjson(jlist);

		// add the player icon on covers
		playicon($("#page2"));
	});
};

function gotolyrics(view, wrapper, num) {
	var h = view.height();
	var w = view.width();

	// phone: click on song
	if (w < 481) {
		$("#page2").find(".song").on("click", function() {
//			wrapper.css("top", "-=" + (h - 1));
			prev_page = 3;
			resettop();
			
			setmp3lrc($(this));
		});
	}
	// pad, pc: click on covers
	else {
		$("#page2").find(".player").on("click", function() {
			var parent = $(this).closest('.song');
			setmp3lrc(parent);
		});
	}
}

function backtoprev(view, wrapper) {
	$(".return").on('click', function() {
		var h = view.height();
		//wrapper.css("top", "+=" + h);
		if(prev_page > 1) prev_page-=1;
		resettop();
	});
}

function SHOWTOP() {
	var w = window.innerWidth;
	var h = window.innerHeight;
	var top = parseInt($("#window").find("#wrapper").css('top'), 10);
	$("body").find("span:first").text("size: " + w + "_" + h + ' top: ' + top);
}

function playicon(page2) {
	page2.find("#songlist").on('click', '.player', function() {
		// $(this).toggleClass("show").siblings().removeClass("show");
		$(this).closest("#songlist").find(".player").removeClass("show");
		$(this).closest("#songlist").find(".play-btn").removeClass("play");
		$(this).toggleClass("show");
		$(this).find(".play-btn").toggleClass("play");
		// $(this).find('.play-btn').toggleClass("btn-play");
	});
}

function rewin() {
	// $("div[id^='page']")
	$(window).bind("load resize", resettop);
}
function resettop(){
	var w = window.innerWidth;
	var h = window.innerHeight;

	SHOWTOP();
	// $("#window").height(h);
	// $("div[id^='page']")
	/*
	 * var view = $("#window"); var h_head = view.prev().height(); var
	 * h_view = h - h_head; view.height(h_view);
	 * $("div[id^='page']").height(h_view);
	 */
	// var top_now = parseInt($("#window").find("#wrapper").css('top'),10);
	var medium = 481;
	var large = 789;
	
	var page = prev_page;
	// phone prev
	if (prev_size < medium) {
		// phone to pad
		if (w > prev_size && w >= medium) {
			if (prev_page == 3) {
				page = 2;
			}
		}
	}
	// pad prev
	else if (prev_size >= medium && prev_size < large) {
		// pad to pc
		if (w > prev_size && w >= large) {
			if (prev_page == 2) {
				page = 1;
			}
		}
	}
	// pc prev (ok!)
	prev_page = page;
	prev_size = w;
	var move = +$("#head-container").height();
	move = h - move;
	
	//phone now
	if (w < medium) {
		if(page == 1)
			$("#wrapper").css('top',0);
		else if(page == 2)
		 	$("#wrapper").css('top',-move);
		else
			$("#wrapper").css('top',-2*move);
	}
	//pad now
	else if (w < large) {
		if(page == 1)
			$("#wrapper").css('top',0);
		else
		 	$("#wrapper").css('top',-move);
	}
	else{
		$("#wrapper").css('top',0);
	}	
}

function getjson(filename) {
	$.getJSON(filename, function(data) {
		var songlist = $("#page2").find("#songlist");
		songlist.empty();

		$.each(data, function(index, en) {
			var html = '<div class="song" data-song="' + en['name'] + '" ';
			html += 'data-mp3="' + en['mp3'] + '" ';
			html += 'data-lrc="' + en['lrc'] + '">';
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

		// gotolyric event only works after loading json finishment
		gotolyrics(view, wrapper, 2);
		return false;
	});
}

function setmp3lrc(node) {
	var name = node.data("song");
	var mp3 = node.data("mp3");
	var lyric = node.data("lrc")

	$("#page3").find("h1").text(name);

	synclrc(lyric);

	document.getElementById('cursong').src = mp3;
	document.getElementById('cursong').play();
}

function synclrc(lyric) {
	$("#page3").find("#lyrics").empty();

	// read *.lrc
	loadlrc(lyric);
	// synchroniclly highlight lyric
	displaylrc();
}

function loadlrc(filename) {
	$.get(filename, {}, function(txt) {
		// append to #lyric
		appendlrc(txt);
	}, 'html');
}

function appendlrc(txt) {
	var area = $("#page3").find("#lyrics");
	var lines = txt.split('\n').reverse();
	var prevtime = 0;

	$.each(lines, function(index, val) {
		// [xx:xx.xx]abcdefg
		var arr = val.split(']');
		var char = arr[1];
		var time = arr[0].split('[')[1];
		var p = $('<p>');
		var record = prevtime;

		if (time) {
			if (time[0] >= '0' && time[0] <= '9') {
				// transform time string to integer
				record = counttime(time);
				// refresh previous end time
				prevtime = record;
			} else
				return;
		}
		p.text(char);
		p.attr('data-time', record);

		p.prependTo(area);
	});

	// Skip the first multiple '\n':
	// keypoint: next lyric has same time attr as breakline
	// 1. get the breakline's time
	// 2. find the next lyric under breakline
	var firstime = +area.find('p:first-child').data("time");
	var firstline = area.find('p').filter(function() {
		return +$(this).data('time') == firstime;
	}).last();
	firstline.addClass('highlight');
}

function counttime(time) {
	var arr = time.split(':');
	var min = +arr[0];
	var sec = +arr[1];
	var result = min * 60 + sec;
	return result;
}

function displaylrc() {
	var inter = 5;
	setInterval(checkifnextline, inter);
}

function checkifnextline() {
	var myVid = document.getElementById("cursong");
	var current = myVid.currentTime;

	var area = $("#page3").find("#lyrics");
	var highlight = +area.find('p.highlight').data('time');
	if (current >= highlight) {
		nextline();
	}
}

function nextline() {
	var area = $("#page3").find("#lyrics");
	var count = +area.find('p').length;
	var p_now = area.find('p.highlight');
	var index = p_now.index();

	if (index < (count - 1)) {

		// Skip the first multiple '\n':
		// keypoint: next lyric has same time attr as breakline
		var p_next = p_now.next();
		var nexttime = p_next.data('time');

		p_next = p_now.nextAll().filter(function() {
			return $(this).data('time') == nexttime;
		}).last();

		if (p_next[0].tagName == "P") {
			p_now.removeClass('highlight');
			p_next.addClass('highlight');
		} else
			return false;
	} else
		return false;
}
