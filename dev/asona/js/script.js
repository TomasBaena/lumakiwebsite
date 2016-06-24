$(function(){
	$(".dropdown-menu > li > a.trigger").on("click",function(e){
		var current=$(this).next();
		var grandparent=$(this).parent().parent();
		if($(this).hasClass('left-caret')||$(this).hasClass('right-caret'))
			$(this).toggleClass('right-caret left-caret');
		grandparent.find('.left-caret').not(this).toggleClass('right-caret left-caret');
		grandparent.find(".sub-menu:visible").not(current).hide();
		current.toggle();
		e.stopPropagation();
	});
	$(".dropdown-menu > li > a:not(.trigger)").on("click",function(){
		var root=$(this).closest('.dropdown');
		root.find('.left-caret').toggleClass('right-caret left-caret');
		root.find('.sub-menu:visible').hide();
	});
});
if ( ($(window).height() + 100) < $(document).height() ) {
	alert("hello");
    $('#top-link-block').removeClass('hidden').affix({
        // how far to scroll down before link "slides" into view
        offset: {top:100}
    });
}
function sidebarTriangle() {
	 $('html, body').animate({
	        scrollTop: ($("#triangle-feature").offset().top-110)
	    }, 'slow');
}
function sidebarHegel() {
	 $('html, body').animate({
	        scrollTop: ($("#hegel-feature").offset().top-110)
	 }, 'slow');
}
function sidebarAnalogue() {
	 $('html, body').animate({
	        scrollTop: ($("#audio-analogue-feature").offset().top-110)
	    }, 'slow');
}
function sidebarAune() {
	 $('html, body').animate({
	        scrollTop: ($("#aune-feature").offset().top-110)
	    }, 'slow');
}
function sidebarHifiman() {
	 $('html, body').animate({
	        scrollTop: ($("#hifiman-feature").offset().top -110)
	    }, 'slow');
}
function sidebarIndiana() {
	 $('html, body').animate({
	        scrollTop: ($("#indiana-line-feature").offset().top-110)
	    }, 'slow');
}
function sidebarNuprime() {
	 $('html, body').animate({
	        scrollTop: ($("#nuprime-feature").offset().top-110)
	    }, 'slow');
}
function sidebarAsona() {
	 $('html, body').animate({
	        scrollTop: ($("#asona-feature").offset().top-110)
	    }, 'slow');
}
function playPauseTriangle() {
	var triangleVideo = document.getElementById("triangleVideo");
	var playButton = document.getElementById("triangle-play-button");
    if (triangleVideo.paused) {
        triangleVideo.play();
        playButton.style.visibility = "hidden"; 
    }
    else {
        triangleVideo.pause(); 
    	playButton.style.visibility = "visible";
    	} 
} 