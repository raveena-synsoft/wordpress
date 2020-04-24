$(document).on('mouseenter', ".domain_li", function() {
    var img = $(this).attr('data-img');
    if(typeof img === "string" ){                
        $(".domain_image").css("background", "url(" + img + ")");
    }
});

//Mobile naviagtion JS  
if (jQuery(window).width() <= 767) {
    //open (or close) submenu items in the lateral menu. Close all the other open submenu items.

    $('.item-has-children').children('a').on('click', function(event) {
        event.preventDefault();
        $(this).toggleClass('submenu-open').next('.sub-menu').slideToggle(200).end().parent('.item-has-children').siblings('.item-has-children').children('a').removeClass('submenu-open').next('.sub-menu').slideUp(200);
    });
}

// Full page scroll JS  -->

$('#pagepiling').pagepiling({});
$(document).ready(function() {
});
/*$(document).ready(function() {
    anchors = [];
    navigation = [];
    if (jQuery(window).width() >= 1025) {
        $('.pagepillHome').pagepiling({
            menu: '#menu',
            anchors: ['page1', 'page2', 'page3', 'page4', 'page5', 'page6', 'page7'],
            sectionsColor: ['#fff', '#fff', '#fff', '#39C', '#fff9f6', '#fff', '#f6eeea'],
            navigation: {
                'position': 'right',
                'tooltips': ['Indroduction', 'What We Do', 'So Far', 'Domains', 'Testimonials', 'Send Request', 'Quick Links']
            },
            afterRender: function() {
                $('#pp-nav').addClass('custom');
            },
            afterLoad: function(anchorLink, index) {
                if (index > 1) {
                    $('#pp-nav').removeClass('custom');
                } else {
                    $('#pp-nav').addClass('custom');
                }
            }
        });

    }
});*/

$(document).ready(function() {
    //carousel interval
    /*$('#myCarousel1').carousel({
        interval: 8000
    });

    $('#myCarousel').carousel({
        interval: 3000
    });*/

});