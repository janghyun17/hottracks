

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
                direction :'up',
                circular:true,
                infinite:false,
                auto:{
                    progress:$timer,
                    timeoutDuration:4000
                },
                prev:false,
                next:false,
                pagination:{
                    container: $pagin,
                    anchorBuilder: function(nr) { return '<a href="#">'+ (nr < 10 ? "0"+nr : nr) +'</a>';}
                },
                items:{start:0, visible:1},
                swipe:{onMouse:true, onTouch:true},
                scroll:{
                    fx:'cover',
                    duration:800,
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
	
$(function(){
	
    $(document).mousemove(function(e){
        o = $('#wrap').offset();
        $('.dot').css({
            'top': e.pageY - o.top,
            'left': e.pageX - o.left
        });
    });
	
    $('a').mouseover(function(){
        $('.cursor').addClass('act');
	});
    $('a').mouseleave(function(){
        $('.cursor').removeClass('act');
	});
	
});





$(function(){
    if(!$('.mc09_cont').length) return;
	$.fn.mcMusic = function(){
		$.each(this, function(i,v){
			var $highlight = function() { 
				var items = $(v).triggerHandler('currentVisible');
				$(v).children().removeClass('act');;
				items.filter(':eq(2)').addClass('act');
				$('.mc09_cont .list').addClass('on');
			};

			$(v).carouFredSel({
				responsive:false,
				firstLoadChk :true,    
				direction:'up',     
				circular:true,
				infinite:false,
				items:{visible:5, start:0},
				swipe:{onMouse:true, onTouch:true},
				auto:3000, 
				prev:false,
				next:false,
				pagination:false, 
				scroll:{
					fx:'scroll',
					items:1,
					//pauseOnHover:true,
					duration:500,
					onBefore: function() {
						$('.mc09_cont .list').removeClass('on')
					},
					onAfter:$highlight,
				},
				onCreate:$highlight
			});


		});
	};
	$('.mc09_list').mcMusic();
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
	
};

// Scroll Event Function 
function feScrollFn(){
    $.fn.feScrollGet();
}

