//jshint esversion:6

const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){

  const query = req.body.cityName;
  const apiKey = "d3c74675f91808daad6d00edb10b559b";
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" +query+ "&appid=" +apiKey+ "&units="+ unit;
  https.get(url, function(response) {

    response.on("data", function(data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imgURL = "http://openweathermap.org/img/wn/"+ icon  +"@2x.png";
      res.write("<h1>The temperature of " + query +" is : "+temp+" degree celsius.</h1>");
      res.write("<h3>The weather description of " +query+ " today is  : "+ weatherDescription+"</h3>");
      res.write("<img src = "+ imgURL +">");
      res.send();
    });
  });


  console.log("Request Received.");
});




app.listen(3000, function() {
  console.log("Server started on 3000");
});
