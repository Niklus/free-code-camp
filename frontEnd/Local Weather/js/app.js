var main = function(){

	'use strict';

  function getJson(url){
  	$.ajax({ 
      url: url, 
      dataType: "json",  
      success: function(res){
        //log(res);
        view(res);
      }
	  });
  }

  function getGeoWeather(lat,long) {	  		  		        
    let url='http://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+long+
    '&appid=8ebe5fef05ebd9a45403357e1ef5a16c';				  
    getJson(url);

  }

  function getCityWeather(cityName){ 
  	let url='http://api.openweathermap.org/data/2.5/weather?q='+cityName+
  	'&appid=8ebe5fef05ebd9a45403357e1ef5a16c';  
    getJson(url);
  }
  
  function ipGeoLocator(){
    $.get("http://ipinfo.io", function(response) {    
      var location = response.loc.split(/,/);
      let lat = location[0];
      let long = location[1];
      getGeoWeather(lat,long);
    },"jsonp");
  }
  
  function clientGeoLocator(position){      
    let lat = position.coords.latitude;
    let long = position.coords.longitude;
    getGeoWeather(lat,long);
  }

  /*function log(res) {
    console.log('LOCATION:')
    console.log('City: '+res.name);
    console.log('Country: '+res.sys.country);
    console.log('Coordinates: '+ res.coord.lat +' , '+ res.coord.lon);
    console.log('WEATHER:')
    console.log('Description: '+res.weather[0].description);
    console.log('Weather icon: '+ res.weather[0].icon);
    console.log('Weather id: '+ res.weather[0].id);
    console.log('Main: '+ res.weather[0].main);
    console.log('DETAILS:')
    console.log('Humidity: '+res.main.humidity);  
    console.log('Pressure: '+res.main.pressure); 
    console.log('Temp: '+res.main.temp); 
    console.log('Max temp: '+res.main.temp_max);
    console.log('Min temp: '+res.main.temp_min); 
  }*/

  function view(res){
    
    var temprature=Number((res.main.temp-273.15).toFixed());
    var icon = res.weather[0].icon;
    var description = res.weather[0].description;
    var location = res.name;
    var mainWeather = res.weather[0].main;
    
    var $weather = $('#weather').html(''); 
    var $location = $("<p id='location'>").text(location);
    var $weatherIcon = $('<img src = http://openweathermap.org/img/w/'+icon+'.png>');
    var $mainWeather = $("<p id='main'>").text(mainWeather);
    var $temp = $("<p id='temp'>").text(temprature);
    var $description = $("<p id='description'>").text(description);
    var $sup1 = $('<sup id="iconSup">').append($weatherIcon);
    var $sup2 = $('<sup id="tempSup">').text('°C');
    
    var tempColor;
    var bool = false;
    var $mainWithSup = $mainWeather.append($sup1);
    var $tempWithSup = $temp.append($sup2);

    if(temprature<15){
       tempColor = 'cold';
    } else if(temprature < 25){
      tempColor = 'warm';
    }else{
      tempColor ='hot';
    }

    $location.addClass(tempColor);
    $mainWeather.addClass(tempColor);
    $temp.addClass(tempColor);
    $description.addClass(tempColor);

    $weather.append($location);
    $weather.append($mainWithSup)
    $weather.append($tempWithSup);
    $weather.append($description);
    
    $weather.on('click','#tempSup',function(event) {    
      bool = !bool;
      var elem = $(this);
      elem.text(bool?'°F':'°C');
      temprature = bool?temprature+32:temprature-32;
      $temp.text(temprature).append(elem);   
    });
      
    /*var $details = $('#details').html('');
    var $temp_max = $("<p>").text('Max Temp: '+(res.main.temp_max-273.15).toFixed());
    var $temp_min = $("<p>").text('Min Temp: '+(res.main.temp_min-273.15).toFixed());
    var $humidity = $("<p>").text('Humidity: '+res.main.humidity+'%');
    var $pressure = $("<p>").text('Pressure: '+res.main.pressure+' hPa');
    $details.append($temp_max.append($('<sup>').text('°C')));
    $details.append($temp_min.append($('<sup>').text('°C')));
    $details.append($humidity);
    $details.append($pressure);*/
  }
  

  var $cityInput = $('#cityInput');
  $cityInput.on('keypress', function (event) {
    let city = $cityInput.val();			
		if(event.keyCode === 13 && city){					 
		  getCityWeather(city);	
		  $cityInput.val('');
	  }
	});

  navigator.geolocation.getCurrentPosition(clientGeoLocator,ipGeoLocator);
};

$(document).ready(main);
