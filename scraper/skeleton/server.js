var express = require("express");
var mongojs = require("mongojs");
var request = require("request");
var cheerio = require("cheerio");


var app = express();
var PORT = process.env.PORT || process.env.DEV_PORT || 3000;
//database config
var databaseUrl = "scraper";
var collections = ["scrapedData"];
//connects mongojs to the db variable
var db = mongojs (databaseUrl, collections);
db.on ("error", function(error) {
    console.log("Database Error:", error);
});


// main route
app.get("/", function(req, res){
    res.send("whatz good?!");
});

// app.listen(3000, function(){
//     console.log("App running on port 3000!");
// });

app.listen(PORT, function () {
    console.log("App listening on PORT: " + PORT);
});

app.get("/all", function(req, res){
    db.scrapeData.find({}, function (err, found){
        if (err) {
            console.log(err)
        }
else{
    res.json(found);
}
    });
});


