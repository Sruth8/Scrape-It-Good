var express = require("express");
var mongojs = require("mongojs");
var request = require("request");
var cheerio = require("cheerio");
var axios = require("axios");
var bodyParser =require("body-parser");
var mongoose = require("mongoose");
var expressHandlebars = require("express-handlebars");

//var rp= require("request-promise");

var app = express();
var PORT = process.env.PORT || process.env.DEV_PORT || 3000;
 
// === EXPRESS ROUTER ====
var router = express.Router();

//==== Public folder as static directory ===
app.use(express.static(__dirname + "/public"));

//=== routes file pass the router object ==
require("./config/routes")(router);

// ===connect Handlebars to express app
app.engine("handlebars", expressHandlebars({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");



app.use(bodyParser.urlencoded({
    extended: false
}));

//=== everthing will go through the router
app.use(router);

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

//mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

//=== connects to database
mongoose.connect(MONGODB_URI, function(err){
    if(err){
        console.log(err);
    }

    else{
        console.log("mongoose connected");
    }
});



























// // If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
// var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
// mongoose.connect(MONGODB_URI);

// //database config
// var dbURL = "scraper";
// var collections = ["scrapedData"];
// //connects mongojs to the db variable
// var db = mongojs(dbURL, collections);
// db.on("error", function (error) {
//     console.log("Database Error:", error);
// });


// // main route
// app.get("/", function (req, res) {
//     res.send("whatz good?!");
// });

// app.get("/all", function (req, res) {
//     db.scrapeData.find({}, function (err, found) { // {} <-- will find everything in a json document
//         if (err) {
//             console.log(err)
//         }
//         else {
//             res.json(found); // this should display everything in a json file
//         }
//     });
// });

// // this will load all the html to the response cheerio

// // It was hard to find a good website to scrap 
// axios.get("/scrape", function (req, res) {
//     request("https://www.morganton.com/", function (err, res, html) {

//         var $ = cheerio.load(html);
//         $(".title").each(function (i, element) {
//             var title = $(this).children("a").text(); //gabs the text from the "a" link
//             var link = $(this).children("a").attr("href");

//             if (title && link) {
//                 db.scrapeData.save({
//                     title: title,
//                     link: link
//                 },
//                     function (err, saved) {
//                         if (err) {
//                             console.log(err);
//                         }
//                         else {
//                             console.log(title);
//                         }
//                     });


//             }
//         });

// res.send("Scrape complete");


//     });
// });

app.listen(PORT, function () {
    console.log("App listening on PORT: " + PORT);
});



//mongoose.connect(MONGODB_URI);

// {} this means it will retrive everythings
