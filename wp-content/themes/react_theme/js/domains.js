

if (jQuery(window).width() >= 1025) {
  $(document).ready(function() {
    anchors = [];
    navigation = [];
    $('.pagepillDomain').pagepiling({
      menu: '#menu',
      anchors: ['page1', 'page2', 'page3', 'page4', 'page5', 'page6', 'page7'],
      sectionsColor: ['#fff', '#fff', '#fff', '#fff', '#fff', '#f6eeea', '#f6eeea'],
      navigation: {
      'position': 'right',
      'tooltips': ['Introduction', 'Features', 'Send Request', 'Use Cases', 'So Far', 'Connect With Us', 'Quick Links']
      }
   });
  });   
}
  $(document).on('mouseenter', 'li.feature_html', function() {
    var id = $(this).attr('id');
    $("div.left_container").removeClass("show_flex");
    $("div.left_container").css('display', 'none');
    $("div."+id).addClass("show_flex");			
    $("div."+id).show();   
  });
  
     
/*$(document).ready(function(){
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
  });	*/

			
/*$('.domain-slider').slick({
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
	 */
	

	
if (jQuery(window).width() <= 767) {
   
	$('.item-has-children').children('a').on('click', function(event){
		event.preventDefault();
		$(this).toggleClass('submenu-open').next('.sub-menu').slideToggle(200).end().parent('.item-has-children').siblings('.item-has-children').children('a').removeClass('submenu-open').next('.sub-menu').slideUp(200);
	});
}