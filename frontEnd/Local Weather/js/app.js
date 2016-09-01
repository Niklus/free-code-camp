'use strict';

/*Model*/
var data = {

  getWeatherData: function(current_Url,forecast_Url) {
  
    $.when(
      $.getJSON(current_Url), 
      $.getJSON(forecast_Url)
    ).then(
      function(current,forecast){
        //console.log(current);
        //console.log(forecast);
        handler.handleCurrentData(current);
        handler.handleForecastData(forecast);
      });
  },
};


/*Controller*/
var handler = {
  
  getGeoWeather: function(lat,long) {                       
   
    let current_Url='http://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+long+
    '&appid=8ebe5fef05ebd9a45403357e1ef5a16c';  
   
    let forecast_Url='http://api.openweathermap.org/data/2.5//forecast/daily?lat='+lat+'&lon='+long+
    '&cnt=7&appid=8ebe5fef05ebd9a45403357e1ef5a16c';           
    
    data.getWeatherData(current_Url,forecast_Url);
  },

  getCityWeather: function(cityName){  
    
    let current_Url='http://api.openweathermap.org/data/2.5/weather?q='+cityName+
    '&appid=8ebe5fef05ebd9a45403357e1ef5a16c';    
    
    let forecast_Url='http://api.openweathermap.org/data/2.5/forecast/daily?q='+cityName+
    '&cnt=7&appid=8ebe5fef05ebd9a45403357e1ef5a16c'; 
    
    data.getWeatherData(current_Url,forecast_Url);
  },

  handleCurrentData: function(current){
    
    //Handle current data and update view
    current = current[0];

    let tmp=current.main.temp-273.15;
    let icon = current.weather[0].icon;
    let description = current.weather[0].description;
    let location = current.name;
    let main = current.weather[0].main;
    view.displayCurrentWeather(tmp,icon,description,location,main);

    let temp_max = (current.main.temp_max-273.15).toFixed()
    let temp_min = (current.main.temp_min-273.15).toFixed()
    let humidity = current.main.humidity;
    let pressure = current.main.pressure;
    view.displayWeatherDetails(temp_max,temp_min,humidity,pressure);  
  },

  handleForecastData: function(forecast){
    forecast = forecast[0];
    view.displayForecastData(forecast);
  }
};


/*View*/
var view = {

  displayCurrentWeather: function(tmp,icon,description,location,main){

    //Clear div
    var $weather = $('#weather').html(''); 

    //Get temp color
    var tempColor;
    if(tmp<15){
      tempColor = 'cold';
    } else if(tmp < 25){
      tempColor = 'warm';
    }else{
      tempColor ='hot';
    }
    
    //Weather info
    var $weatherInfo = $('<div>');
    $weatherInfo.addClass(tempColor);
    
    var $location = $("<p>").text(location);
    var $main = $('<p id="main">').text(main);
    var $weatherIcon = $('<img>');
    $weatherIcon.attr({ 
      src: 'http://openweathermap.org/img/w/'+icon+'.png', 
      alt:" weather icon" 
    });
    
    var $iconSup = $('<sup>').append($weatherIcon);
    var $mainWithSup = $main.append($iconSup);
    var $temp = $('<p id="temp">').text(Math.round(tmp)); 
    $temp.val(Math.round(tmp)); // use to convert
    var $tempSup = $('<sup id ="tempSup">');
    var $btn = $('<button>').text('°C');
    $btn.attr( 'class', 'btnSup');
    $tempSup.append($btn);
    
    var $tempWithSup = $temp.append($tempSup);
    var $description = $('<p>').text(description);
    $weatherInfo.append($location);
    $weatherInfo.append($mainWithSup);
    $weatherInfo.append($tempWithSup);
    $weatherInfo.append($description);
    $weather.append($weatherInfo);
  },

  displayWeatherDetails: function(temp_max,temp_min,humidity,pressure){
    
    // Clear div
    var $details = $('#details').html('');
    //Details
    //ADD WINDD SPEED
    var $weatherDetails = $('<div>');
    var $temp_max = $("<p>").text('Max Temp: '+temp_max);
    var $temp_min = $("<p>").text('Min Temp: '+temp_min);
    var $humidity = $("<p>").text('Humidity: '+humidity+'%');
    var $pressure = $("<p>").text('Pressure: '+pressure+' hPa');
    $weatherDetails.append($temp_max.append($('<sup>').text('°C')));
    $weatherDetails.append($temp_min.append($('<sup>').text('°C')));
    $weatherDetails.append($humidity);
    $weatherDetails.append($pressure);
    $details.append($weatherDetails);
  },

  displayForecastData: function(forecast) {
    
    var $icons = $('.icons').html('');
    var $days = $('.weekdays').html('');
    
    
    //Sort days in order starting from today
    var sortedDays;
    (function (){
      let list = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
      let day = new Date().getDay();
      let spliced = list.splice(day);
      sortedDays = spliced.concat(list);
    })();
    

    // Update icon list
    for(var i = 0; i<forecast.list.length; i++){   
      var $imageList = $('<li>');
      var $img = $('<img>');
     
      $imageList.append($img)
      $icons.append($imageList);
      $img.attr( { 
        src: 'http://openweathermap.org/img/w/'+forecast.list[i].weather[0].icon+'.png', 
        alt:" weather icon" 
      });

      $days.append($('<li>').text(sortedDays[i]));
    } 
  },

  setUpEventListeners: function(){

    var bool = false; 
    var $cityInput = $('#cityInput');
    $cityInput.on('keypress', function (event) {
      let city = $cityInput.val();      
      if(event.keyCode === 13 && city){          
        handler.getCityWeather(city);  
        $cityInput.val('');
      }
    });
   
    $('#weather').on('click','#tempSup',function(event) { 
      //Switch from °C-°F vice versa
      bool = !bool;
      $('.btnSup').text(bool?'°F':'°C');   
    });   
  }
};

//Use clientGeoLocator, if not activated - use ipGeoLocator as a "fallback" 
navigator.geolocation.getCurrentPosition(clientGeoLocator,ipGeoLocator); 

function clientGeoLocator(position){      
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  handler.getGeoWeather(lat,long);  
}

function ipGeoLocator (){
  $.get("http://ipinfo.io", function(response) {    
    var location = response.loc.split(/,/);
    let lat = location[0];
    let long = location[1];
    handler.getGeoWeather(lat,long);
  },"jsonp");
}

view.setUpEventListeners();






































































































  

