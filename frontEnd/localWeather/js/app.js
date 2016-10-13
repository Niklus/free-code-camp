'use strict';

/*Model*/
var model = {

  getWeatherData: function(current_Url,forecast_Url){
    $.when(
      $.getJSON(current_Url), 
      $.getJSON(forecast_Url)
    ).then(
      function(current,forecast){
        //console.log(this);
        model.updateCurrentView(current[0]);
        model.updateForecastView(forecast[0]);   
    });
  },

  updateCurrentView: function(current){
    
    var tmp = current.main.temp-273.15;
    var icon = current.weather[0].icon;
    var description = current.weather[0].description;
    var location = current.name;
    var main = current.weather[0].main;
    var temp_max = (current.main.temp_max-273.15).toFixed();
    var temp_min = (current.main.temp_min-273.15).toFixed();
    var humidity = current.main.humidity;
    var windSpeed = current.wind.speed;

    // Update view 
    view.displayCurrentWeather(tmp,icon,description,location,main);
    view.displayWeatherDetails(temp_max,temp_min,humidity,windSpeed); 
  },

  updateForecastView: function(forecast){
    
    var icons = [];
    for(var i = 0; i<forecast.list.length; i++){ 
      icons.push(forecast.list[i].weather[0].icon);
    }

    //Sort days in order starting from today
    var days;
    (function (){
      var list = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
      var day = new Date().getDay();
      var spliced = list.splice(day);
      days = spliced.concat(list);
    })();

    view.displayForecastData(icons,days);
  }

};


/*Controller*/
var controller = {
  
  getGeoWeather: function(lat,long) {

    let current_Url='http://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+long+'&appid=8ebe5fef05ebd9a45403357e1ef5a16c';  
    let forecast_Url='http://api.openweathermap.org/data/2.5//forecast/daily?lat='+lat+'&lon='+long+'&cnt=7&appid=8ebe5fef05ebd9a45403357e1ef5a16c';     
    model.getWeatherData(current_Url, forecast_Url);
  },
  
  getCityWeather: function(cityName){    
    let current_Url='http://api.openweathermap.org/data/2.5/weather?q='+cityName+'&appid=8ebe5fef05ebd9a45403357e1ef5a16c';    
    let forecast_Url='http://api.openweathermap.org/data/2.5/forecast/daily?q='+cityName+'&cnt=7&appid=8ebe5fef05ebd9a45403357e1ef5a16c'; 
    model.getWeatherData(current_Url, forecast_Url);
  } 
};


/*View*/
var view = {

  displayCurrentWeather: function(tmp,icon,description,location,main){

    //Clear elements
    var $weather = $('#weather').html(''); 

    //Create elements
    var $weatherInfo = $('<div>');
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
    $temp.val(Math.round(tmp)); 
    
    var $tempSup = $('<sup id ="tempSup">');
    var $btn = $('<button class="btnSup">').text('°C');
    $tempSup.append($btn);
    
    var $tempWithSup = $temp.append($tempSup);
    var $description = $('<p>').text(description);
    
    $weatherInfo.append($location);
    $weatherInfo.append($mainWithSup);
    $weatherInfo.append($tempWithSup);
    $weatherInfo.append($description);
     
    //Styling
    var tempColor;

    if(tmp < 15)
      tempColor = 'cold';
    else if(tmp < 25)
      tempColor = 'warm';
    else
      tempColor = 'hot';
    
    $weatherInfo.addClass(tempColor);

    //Render
    $weather.append($weatherInfo);
  },

  displayWeatherDetails: function(temp_max,temp_min,humidity,windSpeed){
    
    // Clear elements 
    var $details = $('#details').html('');
    
    //Create elements
    var $weatherDetails = $('<div>');
    var $temp_max = $("<p>").text('Max Temp: '+temp_max);
    var $temp_min = $("<p>").text('Min Temp: '+temp_min);
    var $humidity = $("<p>").text('Humidity: '+humidity+'%');
    var $windSpeed = $("<p>").text('Wind: '+windSpeed+' m/s');
    
    $weatherDetails.append($temp_max.append($('<sup>').text('°C')));
    $weatherDetails.append($temp_min.append($('<sup>').text('°C')));
    $weatherDetails.append($humidity);  
    $weatherDetails.append($windSpeed);

    //Render
    $details.append($weatherDetails);
  },

  displayForecastData: function(icons,days) {
    
    //Clear icon & day list
    var $icons = $('.icons').html('');
    var $days = $('.weekdays').html('');
    
    // Create and update lists
    for(var i = 0; i<icons.length; i++){   
      
      var $imageList = $('<li>');
      var $img = $('<img>');
      
      $img.attr( { 
        src: 'http://openweathermap.org/img/w/'+icons[i]+'.png', 
        alt:" weather icon" 
      });
      
      $imageList.append($img)
      $icons.append($imageList);
      $days.append($('<li>').text(days[i]));
    } 
  },

  setUpEventListeners: function(){
   
    var $cityInput = $('#cityInput');
   
    $cityInput.on('keypress', function (event) {
      
      var city = $cityInput.val();      
      
      if(event.keyCode === 13 && city){            
        controller.getCityWeather(city);  
        $cityInput.val('');
      }
    });

    var bool = false;
    
    $('#weather').on('click','#tempSup',function(event) { 

      //Switch from °C-°F & vice versa
      bool = !bool;
      var $temp = $("#temp");
      var temprature =  $temp.val(); 
    
      $('.btnSup').text(bool?'°F':'°C');
     
      temprature = bool?(temprature*1.8)+32:(temprature-32)/1.8;   
      $temp.text(Math.round(temprature)).append(this);
      $temp.val(temprature);  
    });   
  }
};

view.setUpEventListeners();

//Use clientGeoLocator, if not activated - use ipGeoLocator as a "fallback" 
navigator.geolocation.getCurrentPosition(clientGeoLocator,ipGeoLocator); 

function clientGeoLocator(position){      
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  controller.getGeoWeather(lat,long);  
}

function ipGeoLocator (){
  $.get("http://ipinfo.io", function(response) {    
    var location = response.loc.split(/,/);
    let lat = location[0];
    let long = location[1];
    controller.getGeoWeather(lat,long);
  },"jsonp");
}








































































































  

