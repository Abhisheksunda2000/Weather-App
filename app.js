const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
const https = require("https");

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req,res){
    res.sendFile(__dirname+"/index.html");
});

app.post("/", function(req,res){
    
    const query = req.body.cityName;
    const apiKey = "a60e36c9df5cbaae5be7f3fd010eae2c";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+ "&appid=" + apiKey + "&units="+unit;
    
    https.get(url,function(response){
        console.log(response.statusCode);

        response.on("data", function(data){
            const weatherdata = JSON.parse(data);
            const temp = weatherdata.main.temp;
            const weatherdescription = weatherdata.weather[0].description;
            const feelslike = weatherdata.main.feels_like;
            const icon = weatherdata.weather[0].icon;
            
            const imageurl = "https://openweathermap.org/img/wn/"+icon +"@2x.png>";

            res.write("<p>The weather is currently " + weatherdescription +"</p>");
            res.write("<h1>The temp in "+ query+ " is " + temp + " degree celcius and Feels like " + feelslike + "</h1>");
            res.write("<img src="+imageurl+">");
            res.send();
              
        });
    });
})

app.listen(port, function(){
    console.log("server is running at port 3000");
});



   