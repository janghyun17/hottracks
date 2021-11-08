$(function () {
 	$('.md_pick_cont .owl-carousel').owlCarousel({
		loop:true,
		items:3,
		margin:38,
		
		nav:true,
		navText:false,
		dots:false,
		
		smartSpeed:650,
		autoplay:true,
		autoplayTimeout:5000,
		autoplayHoverPause:true
	});
	
 	$('.hot_deal_cont .owl-carousel').owlCarousel({
		loop:true,
		items:5,
		margin:0,
		
		nav:true,
		navText:false,
		dots:false,
		center: true,
		autoWidth:true,
		
		smartSpeed:650,
		autoplay:true,
		autoplayTimeout:5000,
		autoplayHoverPause:true
	});
	

 	$('.mc_music_cont .owl-carousel').owlCarousel({
		loop:true,
		items:5,
		margin:16,
		
		nav:false,
		dots:false,
		
		smartSpeed:550,
		center: true,
		URLhashListener: true,
		 autoWidth:true,
		//autoplay:true,
		//autoplayTimeout:5000,
		//autoplayHoverPause:true

		
            onInitialized: function(e){
                $(this).addClass("act");
            },
            onRefreshed: function(e){ // FIREFOX
                $(this).addClass("act");
            },
            onChanged: function(e){
                $(this).removeClass("act");
            },
		
	});
});


















/* Scroll Event */
$(window).on('scroll', feScrollFn);
$.fn.feScrollGet = function(){
    var offset = $(window).scrollTop() + $(window).height() * 0.9;
	var offset_half = $(window).scrollTop() + $(window).height() * 0.2;
	var offset_half2 = $(window).scrollTop() + $(window).height() * 0.5;
  	
	$animate = $('.ani');
    $animate.each(function(i){
        var $ani = $(this),
            ani = $ani,
            item_top = $ani.offset().top,
            item_h = $ani.height();
		if(($ani.offset().top) < offset){
            if(!$ani.hasClass('active')){
                $ani.addClass('active');	
            }
        }else{
            if($ani.hasClass('active')){
            	$ani.removeClass('active');
            }
        }
    });
	
	
	$videos = $('.video');
    $videos.each(function(i){
        var $video = $(this).find('video'),
            video = $video,
            item_top = $video.offset().top,
            item_h = $video.height();
		if(($video.offset().top) < (offset) && (item_top + item_h) > (offset_half)){
            if(!$video.hasClass('video_on')){
                video.get(0).play();
                $video.addClass('video_on');
            }
        }else{
            if($video.hasClass('video_on')){
                video.get(0).pause();
				video.get(0).currentTime = 0;
                $video.removeClass('video_on');
            }
        }	
    });
};

// Scroll Event Function 
function feScrollFn(){
    $.fn.feScrollGet();
}

