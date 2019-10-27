var APIKey = "30520a5ce7b5178a150f8c3048451b43";

var queryURL = "https://api.openweathermap.org/data/2.5/weather?" +
"q=Toronto,Canada&units=metric&appid=" + APIKey;





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
});