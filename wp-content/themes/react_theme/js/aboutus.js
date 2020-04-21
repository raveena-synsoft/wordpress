
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
                  //  $("ul.menu_cls li").removeClass('active');
                }
             });
        }); 
	if (jQuery(window).width() >= 1025) {
   

	  $(document).ready(function() {
	    	$('#pagepiling').pagepiling({
	    		menu: '#menu',
	    		anchors: ['page1', 'page2', 'page3', 'page4', 'page5', 'page6', 'page7'],
			    sectionsColor: ['#ffffff', '#f6eeea', '#f6eeea', '#f6eeea', '#f6eeea', '#f6eeea', '#f6eeea'],
			    navigation: {
			    'position': 'right',
			   	'tooltips': ['About Us',  'The Offshore Model', 'Why Us', 'How It Works', 'So Far', 'Connect With Us', 'Quick Links']
			   	}
			});
	    });		
}
	if (jQuery(window).width() <= 767) {
   
	$('.item-has-children').children('a').on('click', function(event){
		event.preventDefault();
		$(this).toggleClass('submenu-open').next('.sub-menu').slideToggle(200).end().parent('.item-has-children').siblings('.item-has-children').children('a').removeClass('submenu-open').next('.sub-menu').slideUp(200);
	});
}