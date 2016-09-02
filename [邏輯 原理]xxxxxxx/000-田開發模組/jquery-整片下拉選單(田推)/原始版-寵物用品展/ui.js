//----------------------
// slide navigation
//----------------------

//pause before animation
$.fn.pause = function(duration) {
	$(this).stop().animate({ dummy: 1 }, duration);
	return this;
};

function mouseleft() {
	$("#nav-bar").triggerHandler("mouseleave");
}

//slide open navigation on over (add focus someday)
$(document).ready(function(){
	var selectedInput = null;
	$("#query").focus(function() {
		selectedInput = this;
	});
	$("#query").blur(function() {
		selectedInput = null;
	});
	$("#nav-bar").mouseenter(
		function () {
			$("#query").unbind("blur", mouseleft);
			$(this).stop().pause(60).animate({ height:"200px" }, 400, "easeOutQuart" );
		}).mouseleave(
		function () {
			$("#query").bind("blur", mouseleft);
			if (selectedInput == null) {
				$(this).stop().pause(60).animate({ height:"40px" }, 400, "easeOutQuart" );
			}
		}
	);
});


//----------------------
// navigte sub features
//----------------------

$.fn.reverse = [].reverse;

//prep more/previous buttons
$(document).ready(function() {
	disableCheck();
	var randomSeed = new Date().getTime(); //defeat IE caching of $.load function
	
	$("#more:not(.disabled)").live("click", function(event) {
		event.preventDefault();
		
		var urlPieces = (event.target.href).split("/");
		var nextURL = '/home/' + urlPieces[urlPieces.length - 2] + "/" + urlPieces[urlPieces.length - 1];
		var items = $(".item");
		fadeOutOld(items, false, nextURL + "?cachebust=" + randomSeed);
	});
	
	$("#previous:not(.disabled)").live("click", function(event) {
		event.preventDefault();
		
		var urlPieces = (event.target.href).split("/");
		
		if (isNaN(parseInt(urlPieces[urlPieces.length - 2]))) {
			var nextURL = '/home/' + urlPieces[urlPieces.length - 1];
		}
		else {
			var nextURL = '/home/' + urlPieces[urlPieces.length - 2] + "/" + urlPieces[urlPieces.length - 1];
		}
		
		var items = $(".item");
		fadeOutOld(items, true, nextURL + "?cachebust=" + randomSeed);
	});
	
	//legacy code - ensures that if the disabled arrows are visible they still cannot be clicked.
	$("#more.disabled, #previous.disabled").live("click", function(event) {
		event.preventDefault();
	});
});

//test if we need to disable an arrow
function disableCheck() {
	var moreHref = $("#more").attr("href");
	var prevHref = $("#previous").attr("href");
	
	//cannot test simply for "#" as the href because IE resolves that to the full current path with a pound at the end when loaded in dynamically.
	if ((!moreHref) || (moreHref.indexOf("#") === moreHref.length - 1)) {
		$("#more").addClass("disabled");
	}
	else if ((prevHref) && (prevHref.indexOf("#") === prevHref.length - 1)) {
		$("#previous").addClass("disabled");
	}
}

//fade in new items
function fadeInNew(items, rev) {
	items.animate({opacity:"0"}, 0);
	disableCheck();
	
	if (rev) {
		items.reverse();
	}
	
	items.each(function(i) {
		var passthru = this;
		window.setTimeout(function() {
			$(passthru).animate({opacity:"1"}, 60);
		}, 60*i);
	});
}

//fade out old items, load in new items from next page and call fadeInNew
function fadeOutOld(items, rev, nextURL) {
	var itemCount = items.length;
	
	if (rev) {
		items.reverse();
	}
	
	items.each(function(i) {
		var passthru = this;
		var alreadyLoaded = false;
		window.setTimeout(function() {
			$(passthru).animate({opacity:"0"}, 60, function() {
				if (i == itemCount - 1) {
					window.setTimeout(function() {
						if (!alreadyLoaded) {
							$("#browse").addClass("loading");
						}
					}, 50);
					
					$("#browse").html("<!-- clear -->");
					$.get(nextURL, function(data) {
						$("#browse").append($(".item", data)).append($("#controls", data));
						alreadyLoaded = true;
						$("#browse").removeClass("loading");
						fadeInNew($(".item"), rev);
					}, 'html');
				}
			});
		}, 60*i);
	});
} 
$(function(){
		    // 取消超連結的虛線框
		$('a').focus(function(){
			this.blur();
		});
	});
	
	//動畫向上
$(function(){
		$(".top").click(function(){
$('html, body').animate({
scrollTop: $("#header_wrapper").offset().top
}, 1000);
		});
	});