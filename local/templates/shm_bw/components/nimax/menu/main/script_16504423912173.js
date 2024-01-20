$(document).ready(function(){
	var header = $('#header-wrapper');
/*	
	header.find('.main_menu').find('.parent_item').hover(
		function(){
			if(!header.find('.menublock').hasClass('mobil')) 
				$(this).find('.submenu').slideDown(200);
		},
		function(){			
			if(!header.find('.menublock').hasClass('mobil')) 
				$(this).find('.submenu').slideUp(200);
		}
	);
*/			
	removeAction = function (submenu){
		submenu.removeClass('action');
	}
	// подменю  по наведению
	/*
	header.find('.main_menu').find('.parent_item').mouseenter(function(){
			if(!header.find('.menublock').hasClass('mobil')) {
				if($(this).find('.submenu').css('display') != 'none') return;
				$(this).find('.submenu').slideDown(200);
			}
	});
	header.find('.main_menu').find('.parent_item').mouseleave(function(){
			if(!header.find('.menublock').hasClass('mobil')){
				if($(this).find('.submenu').css('display') == 'none') return;
				$(this).find('.submenu').slideUp(200);	
			}
	});
	*/
	
	// подменю  по клику
	
	header.find('.main_menu').find('.parent_item').find('.submenu').prev().click(function(){
		let parent_item = $(this).parent();
		if(parent_item.hasClass('active')){
			parent_item.removeClass('active')
			parent_item.find('.submenu').slideUp(200);
		}else{
			parent_item.addClass('active')
			parent_item.find('.submenu').slideDown(200);
		}
	})
	$(document).mouseup(function (e){ // событие клика по веб-документу
		var pItem = header.find('.main_menu').find('.active'); // тут указываем ID элемента
		if (!pItem.is(e.target) // если клик был не по нашему блоку
		    && pItem.has(e.target).length === 0) { // и не по его дочерним элементам
			// pItem.hide(); // скрываем его			
			pItem.removeClass('active')
			pItem.find('.submenu').slideUp(200);
		}
	});
	
	
	
	
	header.find('.main_menu').find('.parent_item').find('.arrow').click(
		function(){
			if(header.find('.menublock').hasClass('mobil')) 
				$(this).parents('.parent_item').find('.submenu').slideToggle(200);
			$(this).toggleClass('active');
			return false;
		}
	);
	
});