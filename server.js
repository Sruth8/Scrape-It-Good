var express = require("express");
var mongojs = require("mongojs");
var request = require("request");
var cheerio = require("cheerio");


var app = express();
var PORT = process.env.PORT || process.env.DEV_PORT || 3000;

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

//database config
var databaseUrl = "scraper";
var collections = ["scrapedData"];
//connects mongojs to the db variable
var db = mongojs(databaseUrl, collections);
db.on("error", function (error) {
    console.log("Database Error:", error);
});


// main route
app.get("/", function (req, res) {
    res.send("whatz good?!");
});

app.get("/all", function (req, res) {
    db.scrapeData.find({}, function (err, found) { // {} <-- will find everything in a json document
        if (err) {
            console.log(err)
        }
        else {
            res.json(found);
        }
    });
});

// this will load all the html to the response cheerio
app.get("/scrape", function (req, res) {
    request("http://news.ycombinator.com", function (err, res, html) {

        var $ = cheerio.load(html);
        $(".title").each(function (i, element) {
            var title = $(this).children("a").text(); //gabs the text from the "a" link
            var link = $(this).children("a").attr("href");

            if (title && link) {
                db.scrapeData.save({
                    title: title,
                    link: link
                },
                    function (err, saved) {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            console.log(saved);
                        }
                    });


            }
        });

res.send("Scrape complete");


    });
});

app.listen(PORT, function () {
    console.log("App listening on PORT: " + PORT);
});



//mongoose.connect(MONGODB_URI);

// {} this means it will retrive everythings
