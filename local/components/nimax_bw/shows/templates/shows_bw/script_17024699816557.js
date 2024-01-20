$(document).ready(function(){
	var showsFilter = $('#shows_filter');
	var filterType = $("#filter-type");
	var filterDate = $("#filter-date");
	var filterMuseum = $("#filter-museum");
	var ajaxItems = $('#ajax-items');
	var LastPage;
	var pageCounter = 1;
	var FirstLoaded = false;
	var Loading = false;

	function getVal(filterList){
		var vals=[];
		filterList.find('input').each(function(){
			if(this.checked)
			vals.push($(this).val())
		});
		return vals;
	}

	function getTypeVals(){return getVal(filterType)};
	function getDateVals(){return getVal(filterDate)};
	function getMuseumVals(){return getVal(filterMuseum)};
	function getVals(){
		var typeVals = getTypeVals();
		var dateVals = getDateVals();
		var museumVals = getMuseumVals();
		var vals ={
			type:typeVals,
			date:dateVals,
			museum:museumVals
		};
		return vals
	}

	{// в типах при нажатии на "все" отключаем остальные и наоборот
		//$(document).on('change', '.list_title', function(e){
		$('#type_filter_0').change(function(){
			if(this.checked){
				filterType.find('input').each(function(){
					if($(this).attr('id')!='type_filter_0'){
						$(this).prop('checked', false);
					}
				});
			}
		})
		//$(document).on('change', '#filter-type input', function(e){
		filterType.find('input').change(function(){		
			if(($(this).attr('id')!='type_filter_0')&&(this.checked)){
				$('#type_filter_0').prop('checked', false)
			}
		})
	}

	$(document).on('click', '.list_title', function(e){
		$(this).parent().toggleClass('active');		
		$(this).parent().find('.list_wrap').slideToggle(300);		
	});

	$(document).mouseup(function (e){ // событие клика по веб-документу
		var pItem = $('#shows_filter').find('.filter_list').filter('.active'); 
		if (!pItem.is(e.target) // если клик был не по нашему блоку
		    && pItem.has(e.target).length === 0) { // и не по его дочерним элементам
		
			pItem.removeClass('active')
			pItem.find('.list_wrap').slideUp(200);
		}
	});

	function contentReload(data, add=false, page=1, responseType = false){
		data.page = page;
		data.responseType = responseType;
		console.log(data);

		if(!add) pageCounter=1;
		$.get(
			location.pathname,
			{
				type: 'SHOWS',
                query:data,
			},
			function(data){
				//console.log(data);
				data = JSON.parse(data);
				if(!add) $('#ajax-items').empty();
				ajaxItems.append(data.itemsHTML);
				//При переходе в архив или наоборот перезагружаем страницу
				let arhiveCur;
				if($(location).attr('href').indexOf('archive')== -1){
					arhiveCur=false;
				}else{
					arhiveCur=true;
				}
				let arhiveNew;
				if(data['seourl'].indexOf('archive')== -1){
					arhiveNew=false;
				}else{
					arhiveNew=true;
				}
				//При переходе в архив или наоборот перезагружаем страницу
				//Смена названия у кнопки времени
				let newUrl=data['seourl'];//адрес новой страницы
				let TimeArhive;
				let TimeCurrent;
				let TimeNext;
				let btnname="Время";
				if(newUrl.indexOf('archive')==-1){
					TimeArhive=false;
				}else{
					TimeArhive=true;
				}
				if(newUrl.indexOf('current')==-1){
					TimeCurrent=false;
				}else{
					TimeCurrent=true;
				}
				if(newUrl.indexOf('next')==-1){
					TimeNext=false;
				}else{
					TimeNext=true;
				}
				if (TimeNext && !TimeCurrent && !TimeArhive) {
					btnname = 'Планируемые';
				}else if (!TimeNext && TimeCurrent && !TimeArhive) {
					btnname= 'Текущие';
				}else if (!TimeNext && !TimeCurrent && TimeArhive) {
					btnname= 'Архив';
				}
				$('#filter-date .list_title').html(btnname);
				//Смена названия у кнопки времени	
				if(false){
					//Обновление фильтра
					$('#shows_filter').empty();	
					$('#shows_filter').html(data.filter);
				}
				if(data.metatags.title)
					var ttl = data.metatags.title;
				else
					var ttl = data.itemsHTML;
				console.log(data.prov);	
				console.log(data.metatags);	
				window.history.pushState('', ttl,data['seourl']);
				if(arhiveCur!=arhiveNew){
					location.reload()
				}
				
				if(data.metatags.title){
					document.title = data.metatags.title;
				}
				if(data.metatags.description){
					let description = document.querySelector('meta[name="description"]');
					if(description)
						document.querySelector('meta[name="description"]').setAttribute("content", data.metatags.description);
					else
						$('head').append('<meta name="description" content="'+data.metatags.description+'">' );
				}
				if(data.metatags.keywords){
					let keywords = document.querySelector('meta[name="keywords"]');
					if(keywords)
						document.querySelector('meta[name="keywords"]').setAttribute("content", data.metatags.keywords);
					else
						$('head').append('<meta name="keywords" content="'+data.metatags.keywords+'">' );
				}
				if(data.metatags.h1){
					let h1 = $('h1').text();
					if(h1)
						$('h1').text(data.metatags.h1);
				}
				if(data.pagenHTML==''){
					LastPage = 1;
				}else{
					LastPage = $(data.pagenHTML).find('.pages-list').find('a').last().get(0).dataset.page;
				}				
				Loading = false;
				FirstLoaded = true;				
			}
		)
	}
	$('#type_filter_0').change(function(){

	})
	function DayListLoad(data){
		$.get(
			location.pathname,
			{
				type: 'SHOWS',
                query: {
					data:data,
					responseType:'DayList'
				},
			},
			function(data){			
				data = JSON.parse(data); 
				console.log(data);
				ajaxItems.empty();
				ajaxItems.append(data.DayListHTML);
			}
		)
	}
	$(document).on('click', '#kalendar .event_exist', function(){
		var data = this.dataset.eventdate;
		DayListLoad(data);
	})
	
	$(document).on('change', '#shows_filter', function(e){
	//showsFilter.change(function(){
		contentReload(getVals());
	});
	//contentReload(getVals());
	
	$(window).scroll(function() {
		if(Loading || !FirstLoaded) return;
		var scroll = $(window).scrollTop()+$(window).height();
		var offset = $('#ajax-pagen').offset().top;
		if (scroll > offset) {
			if(++pageCounter > LastPage) return;
			Loading = true;
			contentReload(getVals(), true, pageCounter);
		}
	});	

})

$(document).ready(function(){
	$('#selectDate').click(function(){
		$('#kalendarModal').fadeIn();
	})
	$('#kalendarModal').find('.dark_area').click(function(){
		$('#kalendarModal').fadeOut();
	})
})