var main = function(){

	'use strict';

  function getJson(url){
  	$.ajax({ 
      url: url, 
      dataType: "json",  
      success: function(res){
        log(res);
      }
	  });
  }

  function getGeoWeather(position) {	  		  		      
    let lat = position.coords.latitude;
	  let long = position.coords.longitude;  
    let url='http://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+long+
    '&appid=8ebe5fef05ebd9a45403357e1ef5a16c';				  
    getJson(url);
  }

  function getCityWeather(cityName){ 
  	let url='http://api.openweathermap.org/data/2.5/weather?q='+cityName+
  	'&appid=8ebe5fef05ebd9a45403357e1ef5a16c';  
    getJson(url);
  }
  
  function getZipWeather(zipCode) {	  		  		       
    let url='http://api.openweathermap.org/data/2.5/weather?zip='+zipCode+
    '&appid=8ebe5fef05ebd9a45403357e1ef5a16c';
    getJson(url);
  }

  function error(){
  	alert('Geolocation not enabled');
  }

  function log(res) {
    console.log('NAME:')
    console.log('City: '+res.name);
    console.log('Country: '+res.sys.country); 
    console.log('WEATHER:')
    console.log('Description: '+res.weather[0].description);
    console.log('Weather icon: '+ res.weather[0].icon);
    console.log('Weather id: '+ res.weather[0].id);
    console.log('Mainly: '+ res.weather[0].main);
    console.log('MAIN:')
    console.log('Humidity: '+res.main.humidity);  
    console.log('Pressure: '+res.main.pressure); 
    console.log('Temp: '+res.main.temp); 
    console.log('Max temp: '+res.main.temp_max);
    console.log('Min temp: '+res.main.temp_min); 
  }
     
  var $cityInput = $('#cityInput');
  $cityInput.on('keypress', function (event) {
    let city = $cityInput.val();			
		if(event.keyCode === 13 && city){					 
		  getCityWeather(city);	
		  $cityInput.val('');
	  }
	});
  
  var $zipCode = $('#zipInput');
  $zipCode.on('keypress', function (event) {
		let zipCode = $zipCode.val();		
		if(event.keyCode === 13 && zipCode){					 
		  getZipWeather(zipCode);	
		  $zipCode.val('');
	  }
	});

  navigator.geolocation.getCurrentPosition(getGeoWeather,error);
};

$(document).ready(main);