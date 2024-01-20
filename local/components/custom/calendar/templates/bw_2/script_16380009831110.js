$(document).ready(function(){
	var kalendar = $('#kalendar');
	var year = kalendar.find('.year').get(0).dataset.year;
	var month = kalendar.find('.month').get(0).dataset.month;
	

	
	kalendar.on('click', '.year_wrap .prev', function(){
		if(!year)year--; 
		year--;
		replaceKalendar(year,month);
	})
	kalendar.on('click', '.year_wrap .next', function(){
		year++;
		replaceKalendar(year,month);
	})
	
	kalendar.on('click', '.month_wrap .prev', function(){
		if(month>1)		month--;
		else if(month==1)	{month=12;year--;}
		replaceKalendar(year,month);
	})
	kalendar.on('click', '.month_wrap .next', function(){
		if(month<12)	month++;
		else if(month==12){	month=1;year++;}
		replaceKalendar(year,month);
	})
	
	kalendar.on('click', '.event_exist', function(){
	})
	
	function replaceKalendar(year,month){
		$.get({
			url:location.pathname,
			data:{
				YEAR:year,
				MONTH:month,
				AJAX:'Y'
			},
			success:function(data){
				kalendar.empty();
				kalendar.append(data);
				year = kalendar.find('.year').get(0).dataset.year;
				month = kalendar.find('.month').get(0).dataset.month;
			}
		})		
	}
	
})