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

       $(document).ready(function(){
         $('li.finace_report').hover(function() {
            $(".left_container.first_pannel").addClass("show_flex");			
            $(".left_container.first_pannel").show();
            $(".left_container.second_pannel").removeClass("show_flex");
            $(".left_container.third_pannel").removeClass("show_flex");
            $(".left_container.four_pannel").removeClass("show_flex");
            $(".left_container.five_pannel").removeClass("show_flex");
        });
        $('li.predictive_analysis').hover(function() {
            $(".left_container.first_pannel").removeClass("show_flex");
            $(".left_container.first_pannel").hide();
            $(".left_container.second_pannel").addClass("show_flex");
			
            $(".left_container.third_pannel").removeClass("show_flex");
            $(".left_container.four_pannel").removeClass("show_flex");
            $(".left_container.five_pannel").removeClass("show_flex");
     });
         $('li.data_visualization').hover(function() {
            $(".left_container.first_pannel").removeClass("show_flex");
            $(".left_container.first_pannel").hide();
            $(".left_container.second_pannel").removeClass("show_flex");
            $(".left_container.third_pannel").addClass("show_flex");
			
            $(".left_container.four_pannel").removeClass("show_flex");
            $(".left_container.five_pannel").removeClass("show_flex");
     });
          $('li.quickbooks_integration').hover(function() {
            $(".left_container.first_pannel").removeClass("show_flex");
            $(".left_container.first_pannel").hide();
            $(".left_container.second_pannel").removeClass("show_flex");
            $(".left_container.third_pannel").removeClass("show_flex");
            $(".left_container.four_pannel").addClass("show_flex");
			
            $(".left_container.five_pannel").removeClass("show_flex");
     });
           $('li.chatbots').hover(function() {
            $(".left_container.first_pannel").removeClass("show_flex");
            $(".left_container.first_pannel").hide();
            $(".left_container.second_pannel").removeClass("show_flex");
            $(".left_container.third_pannel").removeClass("show_flex");
            $(".left_container.four_pannel").removeClass("show_flex");
            $(".left_container.five_pannel").addClass("show_flex");
			
     });
    });

     

$('.usecase').slick({
  dots: true,
  infinite: true,
  speed: 1500,
  slidesToShow: 3,
			
  slidesToScroll: 3,
			
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 815,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
});	
 

			
$('.domain-slider').slick({
  dots: true,
  infinite: true,
  speed: 300,
  slidesToShow: 1,
			
  slidesToScroll: 1,
			
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 1,
        slidesToScroll:1,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 815,
      settings: {
        slidesToShow: 1,
        slidesToScroll:1
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
});
	 
	
	if (jQuery(window).width() >= 1025) {
   

	  $(document).ready(function() {
	    	$('#pagepiling').pagepiling({
	    		menu: '#menu',
	    		anchors: ['page1', 'page2', 'page3', 'page4', 'page5', 'page6', 'page7', 'page8'],
			    sectionsColor: ['#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#f6eeea'],
			    navigation: {
			    'position': 'right',
			   	'tooltips': ['1', '2', '3', '4', '5', '6', '7']
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
