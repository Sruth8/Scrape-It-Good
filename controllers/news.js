var scrape = require("../scripts/scrape");
var createDate = require("../scripts/date");
var News = require("../models/News");

module.exports = {
    fetch: function (data) {
        scrape(function (data) {


            var articles = data;
            for (var i = 0; i < articles.length; i++) {
                articles[i].date = createDate();
                articles[i].saved = false;
            } //if an article fails it will keep running until the next articles
            News.collection.insertMany(articles, { ordered: false }, function (err, docs) {
                callback(err, docs);
            });


        });

    },

    // create a delete function
    delete: function (query, callback) {
        News.remove(query, callback);
    },
    // find the most recent info in the collection and sort them then pass to the callback function
    get: function (query, callback) {
        News.find(query)
            .sort({
                _id: -1
            })
            .exec(function (err, doc) {
                callback(document);
            });
    },
// this will update new articale with the correct id
    update: function (query, callback) {
        News.update({ _id: query._id }, {
            $set: query
        }, {}, callback);
    }



}