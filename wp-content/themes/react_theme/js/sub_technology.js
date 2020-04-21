$(document).ready(function(){
          $("ul.menu_cls li").hover(function(){
             $(this).addClass("active").siblings().removeClass('active');
          });
        setInterval(function(){
            $(".nav-icon").click(function(){
             $(".rightphace").addClass("active");
          });
        }, 1000);
          setInterval(function(){
            $("#close_menu").click(function(){
             $(".rightphace").removeClass("active");
          });
        }, 1000);

          const $menu = $('.menu_cls');
          $(document).mouseup(e => {
               if (!$menu.is(e.target) // if the target of the click isn't the container...
               && $menu.has(e.target).length === 0) // ... nor a descendant of the container
               {
//                  $("ul.menu_cls li").removeClass('active');
                }
             });
   

     
    
    
    
			
$('.technology-slider').slick({
dots: true,
  slidesPerRow: 1,
  rows: 2,
  infinite: true,
  speed: 1500,
			
  responsive: [
    {
      breakpoint: 1025,
      settings: {
        slidesPerRow: 1,
         rows: 1,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 814,
      settings: {
        slidesPerRow: 1,
        rows: 1,
      }
    },
    {
      breakpoint: 767,
      settings: {
        slidesPerRow: 1,
        rows: 1,
      }
    }
  ]
});
	
 
    
    
    

			
$('.responsive').slick({
  dots: true,
  slidesPerRow: 3,
  rows: 2,
  infinite: true,
  speed: 1500,
			
  responsive: [
    {
      breakpoint: 1025,
      settings: {
        slidesPerRow: 2,
         rows: 2,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 814,
      settings: {
        slidesPerRow: 2,
        rows: 1,
      }
    },
    {
      breakpoint: 767,
      settings: {
        slidesPerRow: 1,
        rows: 1,
      }
    }
  ]
});
	
 
 
	
	if (jQuery(window).width() >= 1025) {
    // your codes goes here;

	  $(document).ready(function() {
	    	$('#pagepiling').pagepiling({
	    		menu: '#menu',
	    		anchors: ['page1', 'page2', 'page3', 'page4', 'page5', 'page6', 'page7'],
			    sectionsColor: ['#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#f6eeea'],
			    navigation: {
			    'position': 'right',
			   	'tooltips': ['Page 1', 'Pgae 2', 'page3', 'page4', 'page5', 'Connect With Us', 'Quick Links']
			   	}
			});
	    });		
}
 

	if (jQuery(window).width() <= 767) {
    // your codes goes here;

	$('.item-has-children').children('a').on('click', function(event){
		event.preventDefault();
		$(this).toggleClass('submenu-open').next('.sub-menu').slideToggle(200).end().parent('.item-has-children').siblings('.item-has-children').children('a').removeClass('submenu-open').next('.sub-menu').slideUp(200);
	});
}
	 

	if (jQuery(window).width() >= 991) {
		(function($){
			$(window).on("load",function(){
											
				$(".custom-scroll").mCustomScrollbar({
					setHeight:700,
					theme:"dark-3"
				});							
				
			});
		})(jQuery);
}
	
       });