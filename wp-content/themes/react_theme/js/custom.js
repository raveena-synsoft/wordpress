$(document).on("mouseenter","ul.menu_cls li", function() {
    $(this).toggleClass('active').siblings().removeClass('active');
});

setInterval(function() {
    $(".nav-icon").click(function() {
        
        $(".rightphace").toggleClass("active, open");
    });
}, 1000);
setInterval(function() {
    $(".nav-icon").click(function() {
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
$(document).ready(function(){
    //Explore button JS 
    document.querySelectorAll('.button').forEach(button => button.innerHTML = '<div><span>' + button.textContent.trim().split('').join('</span><span>') + '</span></div>'); 

});

//Mobile naviagtion JS  
if (jQuery(window).width() <= 767) {
    //open (or close) submenu items in the lateral menu. Close all the other open submenu items.

    $('.item-has-children').children('a').on('click', function(event) {
        event.preventDefault();
        $(this).toggleClass('submenu-open').next('.sub-menu').slideToggle(200).end().parent('.item-has-children').siblings('.item-has-children').children('a').removeClass('submenu-open').next('.sub-menu').slideUp(200);
    });
}

$(document).on("click","ul.menu_cls li", function() {
    $("#s_menu").removeClass("active");
});
$('#pagepiling').pagepiling({});