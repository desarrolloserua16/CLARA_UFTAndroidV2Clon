'use strict';

app.eventsView = kendo.observable({
    onShow: function() {  },
    afterShow: function() { initEvents();  }
});

app.eventDetailView = kendo.observable({
    onShow: function() { initEventDetail(); },
    afterShow: function() {  }
});


var Events_Refresh = true;

function Refresh_Events(){
      Events_Refresh = true;
      initEvents();
  }

function translateDay(day_english){
	day_english = day_english.trim().toLowerCase();
	switch(day_english){
		case 'monday': return 'Lunes';
		case 'tuesday': return 'Martes';
		case 'wednesday': return 'Miercoles';
		case 'thursday': return 'Jueves';
		case 'friday': return 'Viernes';
		case 'saturday': return 'S&aacute;bado';
		case 'sunday': return 'Domingo';
	}
	return day_english;
}
function initEvents()
{  
	
     if(Events_Refresh==false)
        return;
    
    var usuario =  window.localStorage.getItem("usuario");
    var password = window.localStorage.getItem("password");
	
    var websevicename = 'evento/' + usuario;
    $('.km-loader').show();
	$.ajax({
		data: {websevicename: websevicename, username:usuario, password:password},
		url: 'http://redanahuac.mx/mobile/webservice/curl.php',
		dataType: 'jsonp', // Notice! JSONP <-- P (lowercase)
		jsonp: 'callback',
		contentType: "application/json; charset=utf-8",
        complete:function(data){
         $('.km-loader').hide(); 
        },
		success:function(data)
		{
            Events_Refresh=false;
			eventsView_arrayEvents = data;
			var html='';
            if(data.length!=0){
			$.each(data, function(index1, event)
			{
				html +=
					'<div class="card-2">'+
                    '<div class="card-header"><span>'+translateDay(event.vsDiaFecInicio)+'</span><span class="item-after">'+event.vsFecInicio+'</span></div> '+
                    '</div><div class="list-block media-list">'+
					'<ul>'+
                        '<li class="swipeout">'+
                        '<div class="swipeout-content" style="padding:10px 15px !important;"><a class="item-link item-content" onclick="clickHandler_4('+index1+')">'+
                        '<div class="item-inner">'+
                        '<div class="item-title-row">'+
                        '<div class="item-subtitle">'+event.vsAsunto+'</div>'+
                        '</div>'+
                        '<div class="item-after">Hora: '+event.vsRangoHora+'</div>'+
                        '</div></a></div>'+
						'</li>'+
                    '</ul>'+
				    '</div>';
			});}else{
           html =
                 '<div class="card">'+
                 '<div class="card-header">NO TIENE EVENTOS</div>'+
                 '</div>'+
                 '';
      }
			
			$('#div_events_id').html(html);
		},
		error:function(){ alert("Error en ajax"); }
	});
}


function initEventDetail(){
    var event = eventsView_arrayEvents[eventsView_selectedIndex];
    
    $('#dia_id').html(translateDay(event.vsDiaFecInicio));
    $('#fecha_id').html(event.vsFecInicio);
    $('#asunto_id').html(event.vsAsunto);
    $('#lugar_id').html(event.vsUbiEvento);
    $('#fechas_id').html(event.vsRangoFecha);
    $('#hora_id').html(event.vsRangoHora);
    $('#evento_id').html(event.vsDetEvento);
    $('#contacto_id').html(event.vsUbicacionContacto);
    $('#telefono_id').html(event.vsTelefono);
    $('#link_id').html('<a href="'+event.vsLiga+'" data-rel="external">'+event.vsLiga+'</a>');
}

var eventsView_arrayEvents=null;
var eventsView_selectedIndex=-1;

function clickHandler_4(id_option) {
    eventsView_selectedIndex = id_option;
    app.mobileApp.navigate('components/eventsView/eventDetail.html');
}



// START_CUSTOM_CODE_academicHistoryView
// END_CUSTOM_CODE_academicHistoryView