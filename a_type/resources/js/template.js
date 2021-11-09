

/* Visual Area */
$(function(){
    if(!$('.visual_area').length) return;

    var $visualArea = $('.visual_area');
    $visualArea.find('.img p').imgLiquid({fill:true, horizontalAlign:"center", verticalAlign:"center"});
	
    $.fn.visual_area = function(){
        $.each(this, function(i,v){
            var $highlight = function() { 
                var items = $(v).find('.mc_visual').triggerHandler('currentVisible');
                $(v).find('.mc_visual').children().removeClass('act');
                items.addClass('act');
                if(!$(v).find('.md_play').hasClass("on")){
                    sequenceControl("PLAY", false);
                }else{
                    sequenceControl("STOP", false);
                }
                $(v).find('.mc_visual').parent().height($(v).find('.mc_visual').children().first().height());
				
				
				var n = $(v).find('.li').length
				function lan(n) {
				  return (n < 10 ? '0' : '') + n
				}
				$(v).find('.md_pagn_len').text(lan(n));
				
            };

            var $pagin = $(v).find('.md_pagn');
            var $timer = $(v).find('.md_timer p');
            var $paly = $(v).find('.md_btn_play');
            var $stop = $(v).find('.md_btn_stop');
            var $prev = $(v).find('.md_pagn_prev');
            var $next = $(v).find('.md_pagn_next');
			
            $(v).find('.mc_visual').carouFredSel({
                responsive:true,
                firstLoadChk :true,
                direction:'left',
                circular:true,
                infinite:false,
                auto:{
                    progress:$timer,
                    timeoutDuration:3000
                },
                prev: {
                    button:$prev,
                    key: 'left'
                },
                next: {
                    button:$next,
                    key: 'right'
                },
                pagination:{
                    container: $pagin,
                    anchorBuilder: function(nr) { return '<a href="#">'+ (nr < 10 ? "0"+nr : nr) +'</a>';}
                },
                items:{start:0, visible:1},
                swipe:{onMouse:true, onTouch:true},
                scroll:{
                    fx:'fade',
                    duration:0,
                    items:1,
                    direction:'right', 
                    easing :'swing',
                    onBefore: function() {
                    },
                    onAfter:$highlight
                },
                onCreate:$highlight
            });

            $stop.click(function(){
                sequenceControl("STOP", true);
                return false;
            });

            $paly.click(function(){
                sequenceControl("PLAY", true);
                return false;
            });
            
            function sequenceControl(option, changeFocus){
                switch (option) {
                    case "PLAY":
                        if(!$(v).find('.md_play').hasClass("on")) return;
                        
                        $(v).find('.md_play').removeClass('on');
                        $(v).find('.mc_visual').trigger('play', true);
                        $(v).find('.mc_visual video').trigger('play');

                        changeFocus && $stop.focus();
                        break;
                    case "STOP":
                        if($(v).find('.md_play').hasClass("on")) return;

                        $(v).find('.md_play').addClass('on');
                        $(v).find('.mc_visual').trigger('pause', true);
                        $(v).find('.mc_visual video').trigger('pause');

                        changeFocus && $paly.focus();
                        break;
                    // default:
                    //     break;
                }
            }
        });
    };
    $visualArea.visual_area();
});



$.fn.mcSlideEvent = function(){
	$.each(this, function(i,v){
		
		$(v).find('.li').each(function(i) {
			//$(this).addClass('itm'+i);
			//$('.thumb_thumb_area li.itm0').addClass('selected');

			$(this).find('a').click(function() {
							$(v).children().removeClass('act');
				setTimeout(function(){
				$(v).trigger('slideTo', [i, -2, true]);
				return false;
					}, 600);
			});
		});
		
		var $highlight = function() { 
			var items = $(v).triggerHandler('currentVisible');
			//$(v).children().removeClass('act');
			
			setTimeout(function(){
				items.filter(':eq(2)').addClass('act');
			}, 600);
			
			
		};
		$prev = $(v).closest('article').find('.mc_prev');
		$next = $(v).closest('article').find('.mc_next');
		
		$(v).carouFredSel({
			responsive:false,
			firstLoadChk :true,    
			direction:'left',     
			circular:true,
			infinite:false,
			items:{visible:5},
			swipe:{onMouse:true, onTouch:true},
			auto:false, 
			prev: {
				button: $prev,
				key: 'left'
			},
			next: {
				button: $next,
				key: 'right'
			},
			pagination:false, 
			scroll:{
				fx:'scroll',
				items:1,
				//pauseOnHover:true,
				duration:700,
				onAfter:$highlight,
				onBefore: function() {
					var pos = $(this).triggerHandler('currentPosition');
					var page = Math.floor( pos );
					$(v).closest('article').find('.slide_txt').trigger( 'slideToPage', page );
				}
				
			},
			onCreate:$highlight
		});
		
	
	});
};

$(function(){

	$('.mc_group_list').mcSlideEvent();

});





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
		autoplayTimeout:3000,
		//autoplayHoverPause:true
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
		autoplayTimeout:3000,
		//autoplayHoverPause:true
	});
	

 	$('.mc_music_cont .owl-carousel').owlCarousel({
		loop:false,
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

