document.addEventListener('DOMContentLoaded',function(){

	var photo = new SmartPhoto(".js-img-viwer");
    photo.on('change',function(){
        console.log('change');
    });
    photo.on('close',function(){
        console.log('close');
    });
    photo.on('swipestart',function(){
        console.log('swipestart');
    });
    photo.on('swipeend',function(){
        console.log('swipeend');
    });
    photo.on('loadall',function(){
        console.log('loadall');
    });
    photo.on('zoomin',function(){
        console.log('zoomin');
    });
    photo.on('zoomout',function(){
        console.log('zoomout');
    });
    photo.on('open',function(){
        console.log('open');
    });
});

$(document).ready(function() {    
	if (jQuery(window).width() >= 768) {
		(function($){
			$(window).on("load",function(){
											
				$(".custom-scroll").mCustomScrollbar({
					setHeight:700,
					theme:"dark-3"
				});	
			});
		})(jQuery);
	}
	
 
	// Mobile naviagtion JS
	if (jQuery(window).width() <= 767) {
	  //open (or close) submenu items in the lateral menu. Close all the other open submenu items.
		
		$('.item-has-children').children('a').on('click', function(event){
			event.preventDefault();
			$(this).toggleClass('submenu-open').next('.sub-menu').slideToggle(200).end().parent('.item-has-children').siblings('.item-has-children').children('a').removeClass('submenu-open').next('.sub-menu').slideUp(200);
		});
	}
});

	// Full page scroll JS	 
	if (jQuery(window).width() >= 1025) {

		/*$(document).ready(function() {

			/*
			    Plugin intialization
			*/
			$('#pagepiling').pagepiling({
				menu: '#menu',
				anchors: ['page1', 'page2', 'page3', 'page4', 'page5', 'page6', 'page7' ],
			    sectionsColor: ['#fff', '#fff', '#fff', '#39C', '#fff9f6', '#fff', '#f6eeea'],
			    navigation: {
			    	'position': 'right',
			   		'tooltips': ['Indroduction', 'What We Do', 'So Far', 'Domains', 'Testimonials', 'Send Request', 'Footer']
			   	},
			    afterRender: function(){
			    	$('#pp-nav').addClass('custom');
			    },
			    afterLoad: function(anchorLink, index){
			    	if(index>1){
			    		$('#pp-nav').removeClass('custom');
			    	}else{
			    		$('#pp-nav').addClass('custom');
			    	}
			    }
			});

		});*/
	}
//});
    