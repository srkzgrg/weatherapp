const express = require("express");
const app = express();
const request = require('request');

var dotenv = require("dotenv");
dotenv.config();


const path = require("path");

const bodyParser = require('body-parser');

const PORT  = process.env.PORT || 8080;
app.use(bodyParser.json());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/"));
app.use(express.static(path.join(__dirname, "/")));
app.use(express.urlencoded({ extended: true }));


app.listen(PORT, () => {
    console.log("App listening at: http://localhost:8080/");
});


/* -------------------------------------------------------------------------- */
/* --------------------------------- ROUTING -------------------------------- */
/* -------------------------------------------------------------------------- */

app.get("/", (req, res) => {
    const city = req.query.city;
    const key = process.env.API_KEY;
    const url = `http://api.weatherapi.com/v1/forecast.json?key=${key}&q=${city}&days=5&aqi=no&alerts=no`;
    request(url, function (err, response, body) {
        if(err || response.statusCode != 200){
            res.render("index", {city: null, weather: null, error: 'Error, please try again'});
        } else {
            const weather = JSON.parse(body);
            res.render
            ("index",{
                city: city,
                weather: weather,
                day0icon: weather.forecast.forecastday[0].day.condition.icon.substring(39,42),
                day1icon: weather.forecast.forecastday[1].day.condition.icon.substring(39,42),
                day2icon: weather.forecast.forecastday[2].day.condition.icon.substring(39,42),
                day3icon: weather.forecast.forecastday[3].day.condition.icon.substring(39,42),
                day4icon: weather.forecast.forecastday[3].day.condition.icon.substring(39,42),
            });
        }
    });
});
