   $(document).ready(function(){
          $("ul.menu_cls li").hover(function(){
			 $(this).toggleClass('active').siblings().removeClass('active');
          });	   
		   
        setInterval(function(){
            $(".nav-icon").click(function(){
             $(".rightphace").toggleClass("active, open");
          });
        }, 1000);
          setInterval(function(){
            $(".nav-icon").click(function(){
             $(".rightphace").removeClass("active");
          });
        }, 1000);

          const $menu = $('.menu_cls');
          $(document).mouseup(e => {
               if (!$menu.is(e.target) // if the target of the click isn't the container...
               && $menu.has(e.target).length === 0) // ... nor a descendant of the container
               {
                // $("ul.menu_cls li").removeClass('active');
				   
                }
             });
        });

var imageitem = ['fintech', 'retail', 'insurance', 'cryptocurrency', 'supply_chain', 'health_fitness', 'hailing', 'smart_city']
          var images = {
            fintech: 'fintech',
            retail: 'retail',
            insurance: 'insurances',
            cryptocurrency: 'crypocurrency',
            supply_chain: 'supply-chain',
            health_fitness: 'health',
            hailing: 'e-hailing',
            smart_city: 'smart-city',
          };

          imageitem.forEach(li => {
            $("li." + li).hover(function(){
            $(".domain_image").css("background", "url('images/" + images[li] + ".png')");
            });
          })

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
	 
	 if (jQuery(window).width() >= 1025) {
	 
		$(document).ready(function() {

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

	    });
	 }
    document.querySelectorAll('.button').forEach(button => button.innerHTML = '<div><span>' + button.textContent.trim().split('').join('</span><span>') + '</span></div>');	

	$(document).ready(function(){
    $(".filter-link").click(function(){
        var value = $(this).attr('data-filter');
        
        if(value == "all")
        {
            $('.filter').fadeIn('1000');
        }
        else
        {
            $(".filter").not('.'+value).fadeOut('1000');
            $('.filter').filter('.'+value).fadeIn('1000');
            
        }
    });
    
if ($(".filter-link").removeClass("p-filter")) {
$(this).removeClass("p-filter");
}
$(this).addClass("p-filter");
});	

	   $('#myCarousel1').carousel({
    interval: 8000
      });	
		
		 $('#myCarousel').carousel({
    interval: 3000
      });