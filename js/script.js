


//api stuff
var APIKey = "30520a5ce7b5178a150f8c3048451b43";

var queryURL = "https://api.openweathermap.org/data/2.5/weather?" +
"q=Toronto,Canada&units=metric&appid=" + APIKey

$.ajax({
	url: queryURL,
	method: "GET"
  })
  // We store all of the retrieved data inside of an object called "response"
  .then(function(response) {

	// Log the queryURL
	console.log(queryURL);

	// Log the resulting object
	console.log(response);

	// Transfer content to HTML
	$(".city").html("<h1>" + response.name + " Current Weather Details</h1>");
	$(".temperature").text("Current Temperature: " + response.main.temp + " C");
	$(".windspeed").text("Wind Speed: " + response.wind.speed + "km/h");
	$(".humidity").text("Humidity: " + response.main.humidity + "%");
	$(".hiTemp").text("Today's High Temperature: " + response.main.temp_max + " C");
	$(".lowTemp").text("Today's Low Temperature: " + response.main.temp_min + " C");
	
  });