$(document).ready(function() {
   
   	$('<div class="mwrap"><div class="mmenu"><div></div></div>Меню</div>').insertBefore('');
  	$('#header-wrapper li .all-site').wrapInner('<span class="desktop"></span>');
  	$('#header-wrapper li .all-site').append('<span class="mobile">Меню</span>');
    
    $('.mwrap').click(function() {
        $(this).toggleClass('active');
    });
  
  	$('.vtours').parents('table').addClass('resp');
  	$('img[src*="heros1.jpg"]').parent('.constructor-text').addClass('resp');
    
    $('.b-video iframe[src="https://Zd1TpYiBskSH.ru/partnership/index.html"]').parent().addClass('site');
  	
  	$('<li class="hidden">'+$('#menu-100').html()+'</li>').insertAfter($('#header-wrapper .submenu li[data-id="menu-7"]'));
  	$('#header-wrapper .museums-wrap .ico').each(function() {
      	var src = '/img/'+$(this).attr('class').split(' ')[1]+'.png';
      	var alt = $(this).next().text();
      	if ( $(this).parents('li.active').length )
          	src = src.replace('.png', '-active.png');
    		$(this).append('<img src="'+src+'" alt="'+alt+'">');
    });
  	$('#header-wrapper .museums-wrap li a')
      .mouseenter(function() {
					var src = $(this).find('img').attr('src');
      		var new_src = src.replace('.png', '-active.png');
      		$(this).find('img').attr('src', new_src);
      })
      .mouseleave(function() {
					var src = $(this).find('img').attr('src');
      		var new_src = src.replace('-active.png', '.png');
      		$(this).find('img').attr('src', new_src);
      });
  	
//    $('*').click(function() {
//      	if ( $('#header-wrapper li.has-submenu.active').length )
//        	$('#header-wrapper .main-menu').addClass('sorted');
//      	else
//          	$('#header-wrapper .main-menu').removeClass('sorted');
//        if ( $('#header-wrapper li.has-submenu.max-width.active').length )
//            $('#header-wrapper').addClass('mactive');
//        else
//            $('#header-wrapper').removeClass('mactive');
//    });
    
    function load() {
        if ( window.matchMedia('(max-width: 768px)').matches ) {            
            if ( !$('body').hasClass('moved_768') ) {    
                $('.constructor-text .aside').appendTo('.constructor-text'); 
                $('body').addClass('moved_768');
				console.log('var_one');
            }
        } else if ( $('body').hasClass('moved_768') ) {
            $('.constructor-text .aside').prependTo('.constructor-text'); 
            $('body').removeClass('moved_768');
			console.log('var_two');           
        } 
    }
    load();
    var width = $(window).width();
    $(window).resize(function() {
        load();
        if ( $(window).width() != width ) {
            $('#header-wrapper').removeClass('mactive');
            $('#header-wrapper li.has-submenu.max-width').removeClass('active');
        }
    });

if(window.location.pathname=='/') {
    $('.main-menu a').click(function() {
      var url_link = $(this).attr('href');
      if (url_link != '#') {
      _gaq.push(['_trackEvent', 'celi', 'top_menu']);
      }
    });
    $('#widthOfSlider a').click(function() {
      _gaq.push(['_trackEvent', 'celi', 'slider'])
    });
    $('.events a').click(function() {
      _gaq.push(['_trackEvent', 'celi', 'sobitije'])
    });
    $('#footer a').click(function() {
      _gaq.push(['_trackEvent', 'celi', 'footer'])
    });
    $('#project_container a').click(function() {
      _gaq.push(['_trackEvent', 'celi', 'partner'])
    });
}

});