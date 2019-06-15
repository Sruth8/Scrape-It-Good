
// ===== this will make the scraps possible =====
var request = require("request");
var cheerio = require("cheerio");

var scrape = function(callback) {
    request("https://www.morganton.com/", function(err, res, body){
        var $ = cheerio.load(body);
        var articles =[];

        $("card-summary").each(function(i, element){
            // ==== grab the text without white spaces
            var head = $(this).children(".tnt-headline").text().trim();
            var sum = $(this).children(".tnt-asset-link").text().trim();

            if(head && sum){
                // ==== this will help match, locate, and manage text called Regex
                var headClean = head.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
                var sumClean = sum.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();

                var addData= {
                    headline: headClean,
                    summary: sumClean
                };
                articles.push(addData);
            }
        });
        callback(articles);
    });
};

module.exports = scrape;