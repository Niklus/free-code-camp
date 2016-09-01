var main = function(){

	'use strict';


  function getData(current_Url,forecast_Url){
    
    //loading two Ajax requests concurrently with one callback
    $.when(
        $.getJSON(current_Url), 
        $.getJSON(forecast_Url)
    ).then(
    function(currentData,forecastData) { 
      console.log(currentData[0]);
      console.log(forecastData[0]);
      logCurrent(currentData[0]);
      view(currentData[0],forecastData[0]);
    });
  }

  function getGeoBasedWeather(lat,long) {	  		  		        
    
    let current_Url='http://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+long+
    '&appid=8ebe5fef05ebd9a45403357e1ef5a16c';	
    
    let forecast_Url='http://api.openweathermap.org/data/2.5//forecast/daily?lat='+lat+'&lon='+long+
    '&cnt=7&appid=8ebe5fef05ebd9a45403357e1ef5a16c';			  
    
    getData(current_Url,forecast_Url);
  }

  function getCityBasedWeather(cityName){ 
  	
    let current_Url='http://api.openweathermap.org/data/2.5/weather?q='+cityName+
  	'&appid=8ebe5fef05ebd9a45403357e1ef5a16c';  
    
    let forecast_Url='http://api.openweathermap.org/data/2.5/forecast/daily?q='+cityName+
    '&cnt=7&appid=8ebe5fef05ebd9a45403357e1ef5a16c'; 

    getData(current_Url,forecast_Url);
  }
  
  function ipGeoLocator(){
    $.get("http://ipinfo.io", function(response) {    
      var location = response.loc.split(/,/);
      let lat = location[0];
      let long = location[1];
      getGeoBasedWeather(lat,long);
    },"jsonp");
  }
  
  function clientGeoLocator(position){      
    let lat = position.coords.latitude;
    let long = position.coords.longitude;
    getGeoBasedWeather(lat,long);  
  }

  function logCurrent(res) {
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
  }

  /*function logForecast(res) {
    console.log(res); 
  }*/

  function view(current,forecast){
    
    var temperature=current.main.temp-273.15;
    var icon = current.weather[0].icon;
    var description = current.weather[0].description;
    var location = current.name;
    var mainWeather = current.weather[0].main;
    

    //Clear divs
    var $weather = $('#weather').html(''); 
    var $details = $('#details').html('');

    //Get temp color
    var tempColor;
    if(temperature<15){
      tempColor = 'cold';
    } else if(temperature < 25){
      tempColor = 'warm';
    }else{
      tempColor ='hot';
    }
    
    //Weather info
    var $weatherInfo = $('<div>');
    $weatherInfo.addClass(tempColor);
    //Location
    var $location = $("<p>").text(location);
    //Main Weather Elements
    var $mainWeather = $('<p id="main">').text(mainWeather);
    var $weatherIcon = $('<img>');
    $weatherIcon.attr({ 
      src: 'http://openweathermap.org/img/w/'+icon+'.png', 
      alt:" weather icon" 
    });
    var $iconSup = $('<sup>').append($weatherIcon);
    var $mainWithSup = $mainWeather.append($iconSup);
    //Temprature Elements
    var $temp = $('<p id="temp">').text(Math.round(temperature));  
    var $tempSup = $('<sup id ="tempSup">');
    
    var $btn = $('<button>').text('°C');
    $btn.attr( 'class', 'btnSup');

    $tempSup.append($btn);
    var $tempWithSup = $temp.append($tempSup);
    //Description
    var $description = $('<p>').text(description);
    //Append the created Elements
    $weatherInfo.append($location);
    $weatherInfo.append($mainWithSup);
    $weatherInfo.append($tempWithSup);
    $weatherInfo.append($description);
    $weather.append($weatherInfo);
    //Switch btn °F and °C
    var bool = false; 
    $weather.on('click','#tempSup',function(event) {    
      var elem = $(this); 
      bool = !bool;     
      temperature = bool?(temperature*1.8)+32:(temperature-32)/1.8;
      $temp.text(Math.round(temperature)).append(elem);
      $btn.text(bool?'°F':'°C');   
    });

    //Details
    //ADD WINDD SPEED
    var $weatherDetails = $('<div>');
    var $temp_max = $("<p>").text('Max Temp: '+(current.main.temp_max-273.15).toFixed());
    var $temp_min = $("<p>").text('Min Temp: '+(current.main.temp_min-273.15).toFixed());
    var $humidity = $("<p>").text('Humidity: '+current.main.humidity+'%');
    var $pressure = $("<p>").text('Pressure: '+current.main.pressure+' hPa');
    $weatherDetails.append($temp_max.append($('<sup>').text('°C')));
    $weatherDetails.append($temp_min.append($('<sup>').text('°C')));
    $weatherDetails.append($humidity);
    $weatherDetails.append($pressure);
    $details.append($weatherDetails);

    //Forecasting
    var $days = $('.weekdays').html('');
    var $icons = $('.icons').html(''); 
    
    var day = new Date().getDay();
    var list = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
    var spliced = list.splice(day);
    var sorted = spliced.concat(list);
    
    for(var i = 0; i<7; i++){
      $days.append($('<li>').text(sorted[i]));
    }
    
    for(var i = 0; i<forecast.list.length; i++){   
      var $imageList = $('<li>');
      var $img = $('<img>');
      $imageList.append($img)
      $icons.append($imageList);
      $img.attr( { 
        src: 'http://openweathermap.org/img/w/'+forecast.list[i].weather[0].icon+'.png', 
        alt:" weather icon" 
      });
    } 
  }
  

  var $cityInput = $('#cityInput');
  $cityInput.on('keypress', function (event) {
    let city = $cityInput.val();			
		if(event.keyCode === 13 && city){					 
		  getCityBasedWeather(city);	
		  $cityInput.val('');
	  }
	});
 
  //Use clientGeoLocator, if not activated - use ipGeoLocator as a "fallback" 
  navigator.geolocation.getCurrentPosition(clientGeoLocator,ipGeoLocator); 
};

$(document).ready(main);
