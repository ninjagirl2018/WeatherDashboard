const apiKey = "30520a5ce7b5178a150f8c3048451b43";

  
  //get windspeed in mph and make sure it displays
  let mph = (speed) => {
    return parseFloat(speed * (3600/1609.344)).toFixed(2);
  } 
  
  //Searched cities
  let searchedCities = [];
  if( localStorage.getItem("citySearch")){
    searchedCities = JSON.parse(localStorage.getItem("citySearch"));
  }
  

  //JSON method to get the current date
    let getDate = function(days){
    let someDate = new Date();
    let numberOfDaysToAdd = days ;
    someDate.setDate(someDate.getDate() + numberOfDaysToAdd); 
  
    let dd = someDate.getDate();
    let mm = someDate.getMonth() + 1;
    let y = someDate.getFullYear();
  
    return mm + " / "+ dd + " / "+ y;
  }
  

$(document).ready(function() {

    //Ajax call #1 for the current conditions for the city searched
    var currentConditions = function(cityName, searched){      
      $.ajax({url: `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`, success: function(result){
      
      //checks to see if the search value is already in local storage, and if not, will push into local storage
      if(searched === true){
        if(searchedCities.includes($("#search input").val()) !== true){
          searchedCities.push($("#search input").val());
          localStorage.setItem("citySearch", JSON.stringify(searchedCities));
        }
        localStorage.setItem("lastCitySearch", $("#search input").val());
       }
    

    // AJAX call #2 has to use the response from the Ajax call #1 to pull the object names that are required for the app
    cityId = result.id;
        $.ajax({url: `https://api.openweathermap.org/data/2.5/forecast?id=${cityId}&APPID=${apiKey}&units=metric`, 
        success: function(result){
          $("#today").html("");
          $("#today").append(`<div class="blockHeading"><h2>${result.city.name} ( ${getDate(0)} )</h2><img src="https://openweathermap.org/img/w/${result.list[0].weather[0].icon}.png" alt="${result.list[0].weather[0].description}" width='50' height='50'>`);
          $("#today").append(`<p class="temperature">Temperature: ${result.list[0].main.temp} °C</p>`);
          $("#today").append(`<p class="humidity"> Humidity: ${result.list[0].main.humidity} %</p>`);
          $("#today").append(`<p class="wind_speed">Wind Speed:  ${mph(result.list[0].wind.speed)} MPH</p>`);
          
          
    // AJAX call #3 uses the objects that return from the AJAX Call #2 for longitude and latitude to get the UV index

        $.ajax({url: `https://api.openweathermap.org/data/2.5/uvi?appid=${apiKey}&lat=` + result.city.coord.lat + "&lon=" + result.city.coord.lon, 
        success: function(result){
            $("#today").append(`<p class="uv">UV Index: <span>${result.value}</span></p>` );
          }});
         
    // 5 Day forecast
          
        $("#forecast .fiveDays").html("");
            for(let i=1; i <= 5; i++){
            let forecast5 = function(i){
                return('<div>' +
                '<p class="date">' + getDate(i) + '</p>' +  
                `<img src="https://openweathermap.org/img/w/${result.list[i].weather[0].icon}.png" alt="${result.list[i].weather[0].description}" "width='50' height='50'>` +
                `<p class="temperature">Temp: ${result.list[i].main.temp}&nbsp;°C</p>` +
                `<p class="humidity">Humidity: ${result.list[i].main.humidity}&nbsp;%"</p>` +
                '</div>');
                }
            
            $("#forecast .fiveDays").append(forecast5(i));
          }
        }});

      },error: function () {
        if ($("#search input").val() === ""){
          $("#searchError").html("Please pick a city"); 
        }else{
          $("#searchError").html("Sorry we have no data on that city");
        }
      }
    });
}
      
      if( localStorage.getItem("lastCitySearch")){
        currentConditions( localStorage.getItem("lastCitySearch"), false);
      }else{
        currentConditions("Toronto", false);
      }
    
      $("#sampleSearches button").on( "click", function() {
        currentConditions($(this).html().toString(), false);
      });
    
      $("#search button").on( "click", function() {
        currentConditions($("#search input").val(), true);     
      });
    
      
    
      });