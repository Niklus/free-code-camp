'use strict';

/*Model*/
var model = {

  getWeatherData: function(current_Url,forecast_Url){
    $.when(
      $.getJSON(current_Url), 
      $.getJSON(forecast_Url)
    ).then(
      function(current,forecast){
        model.handleCurrentData(current);
        model.handleForecastData(forecast);
        //console.log(this);
    });
  },

  getGeoWeather: function(lat,long) {

    let current_Url='http://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+long+'&appid=8ebe5fef05ebd9a45403357e1ef5a16c';  
    let forecast_Url='http://api.openweathermap.org/data/2.5//forecast/daily?lat='+lat+'&lon='+long+'&cnt=8&appid=8ebe5fef05ebd9a45403357e1ef5a16c';     
    this.getWeatherData(current_Url, forecast_Url);
  },
  
  getCityWeather: function(cityName){  
    
    let current_Url='http://api.openweathermap.org/data/2.5/weather?q='+cityName+'&appid=8ebe5fef05ebd9a45403357e1ef5a16c';    
    let forecast_Url='http://api.openweathermap.org/data/2.5/forecast/daily?q='+cityName+'&cnt=8&appid=8ebe5fef05ebd9a45403357e1ef5a16c'; 
    this.getWeatherData(current_Url, forecast_Url);
  },

  handleCurrentData: function(current){
    
    current = current[0]; 
    
    let tmp = current.main.temp-273.15;
    let icon = current.weather[0].icon;
    let description = current.weather[0].description;
    let location = current.name;
    let main = current.weather[0].main;
    
    let temp_max = (current.main.temp_max-273.15).toFixed();
    let temp_min = (current.main.temp_min-273.15).toFixed();
    let humidity = current.main.humidity;
    let windSpeed = current.wind.speed;

    controller.displayCurrentWeather(tmp,icon,description,location,main);
   
    controller.displayWeatherDetails(temp_max,temp_min,humidity,windSpeed); 
  },

  handleForecastData: function(forecast){
    
    let icons = [];

    for(var i = 1; i<forecast[0].list.length; i++){ 
      icons.push(forecast[0].list[i].weather[0].icon);
    }

    controller.displayForecastData(icons);
  }

};


/*Controller*/
var controller = {
  
  getGeoWeather: function(lat,long) {                         
    model.getGeoWeather(lat,long);
  },

  getCityWeather: function(cityName){      
    model.getCityWeather(cityName);
  },

  displayCurrentWeather: function(tmp,icon,description,location,main){
    view.displayCurrentWeather(tmp,icon,description,location,main);
  },
  
  displayWeatherDetails: function(temp_max,temp_min,humidity,windSpeed){
    view.displayWeatherDetails(temp_max,temp_min,humidity,windSpeed);
  },

  displayForecastData: function(icons){
   view.displayForecastData(icons);
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

  displayWeatherDetails: function(temp_max,temp_min,humidity,windSpeed){
    
    // Clear div
    var $details = $('#details').html('');
    
    //Details
    var $weatherDetails = $('<div>');
    var $temp_max = $("<p>").text('Max Temp: '+temp_max);
    var $temp_min = $("<p>").text('Min Temp: '+temp_min);
    var $humidity = $("<p>").text('Humidity: '+humidity+'%');
    var $windSpeed = $("<p>").text('Wind: '+windSpeed+' m/s');
    
    $weatherDetails.append($temp_max.append($('<sup>').text('°C')));
    $weatherDetails.append($temp_min.append($('<sup>').text('°C')));
    $weatherDetails.append($humidity);  
    $weatherDetails.append($windSpeed);

    $details.append($weatherDetails);
  },

  displayForecastData: function(icons) {
    
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
    for(var i = 0; i<icons.length; i++){   
      var $imageList = $('<li>');
      var $img = $('<img>');
     
      $imageList.append($img)
      $icons.append($imageList);
      $img.attr( { 
        src: 'http://openweathermap.org/img/w/'+icons[i]+'.png', 
        alt:" weather icon" 
      });

      $days.append($('<li>').text(sortedDays[i]));
    } 
  },

  setUpEventListeners: function(){

     
    var $cityInput = $('#cityInput');
    $cityInput.on('keypress', function (event) {
      let city = $cityInput.val();      
      if(event.keyCode === 13 && city){          
        controller.getCityWeather(city);  
        $cityInput.val('');
      }
    });

    var bool = false;
    $('#weather').on('click','#tempSup',function(event) { 
      
      //Switch from °C-°F & vice versa
      bool = !bool;
      $('.btnSup').text(bool?'°F':'°C');   

      var $temp = $("#temp");
      var temprature =  $temp.val();
      
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








































































































  

