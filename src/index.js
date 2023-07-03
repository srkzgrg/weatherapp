const express = require("express");
const app = express();

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

app.get("/", (req, res) => {
    res.render
    ("index",{
        city: null,
    });
});

app.post("/", async (req, res) => {
    const city = req.body.city;
    res.render("index", {
        city: city
    })
});