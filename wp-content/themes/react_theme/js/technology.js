if (jQuery(window).width() <= 767) {
    // your codes goes here;

	   	//open (or close) submenu items in the lateral menu. Close all the other open submenu items.
	$('.item-has-children').children('a').on('click', function(event){
		event.preventDefault();
		$(this).toggleClass('submenu-open').next('.sub-menu').slideToggle(200).end().parent('.item-has-children').siblings('.item-has-children').children('a').removeClass('submenu-open').next('.sub-menu').slideUp(200);
	});
}


/*if (jQuery(window).width() >= 1025) {
    // your codes goes here;

	  $(document).ready(function() {
	    	$('#pagepiling').pagepiling({
	    		menu: '#menu',
	    		anchors: ['page1', 'page2', 'page3', 'page4', 'page5', 'page6', 'page7', 'page8', 'page9'],
			    sectionsColor: ['#fff', '#fff', '#fff', '#fff', '#fff', '#f6eeea', '#f6eeea'],
			    navigation: {
			    'position': 'right',
			   	'tooltips': ['Introduction', 'We Build', 'Page 3', 'Web Tech', 'So Far', 'Connect With Us', 'Quick Links']
			   	}
			});
	    });		
}*/


  var $animation_elements = $('.animation-element');
            var $window = $(window);

            function check_if_in_view() {
              var window_height = $window.height();
              var window_top_position = $window.scrollTop();
              var window_bottom_position = (window_top_position + window_height);
             
              $.each($animation_elements, function() {
                var $element = $(this);
                var element_height = $element.outerHeight();
                var element_top_position = $element.offset().top;
                var element_bottom_position = (element_top_position + element_height);
             
                //check to see if this current container is within viewport
                if ((element_bottom_position >= window_top_position) &&
                    (element_top_position <= window_bottom_position)) {
                  $element.addClass('in-view');
                } else {
                  $element.removeClass('in-view');
                }
              });
            }

            $window.on('scroll resize', check_if_in_view);
            $window.trigger('scroll');




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


$('.webtech_slider').slick({
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
        });
	