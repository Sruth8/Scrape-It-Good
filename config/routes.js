var scrape = require("../scripts/scrape");
var newsController = require("../controllers/news");
var notesController = require("../controllers/notes");




module.exports = function (router) {

    //renders the homepage
    router.get("/", function (req, res) {
        res.render("home");
    });

    //route to render the saved handlebars page
    router.get("/saved", function (req, res) {
        res.render("saved");
    });
    //passing in a request to get back a response for scraping
    router.get("/api/fetch", function (req, res) {
        newsController.fetch(function (err, documents) {
            if (!documents || documents.inCount === 0) {
                res.json({
                    message: "Nothing today. Try back tomorrow!"
                });
            }
            else {
                res.json({
                    message: "Add " + documents.inCount + " new articles"
                });
            }
        });
    });

    router.get("/api/news", function (req, res) {
        var query = {};
        if (req.query.saved) {
            query = req.query;
        }
        newsController.get(query, function (data) {
            res.json(data);
        });
    });

    router.delete("/api/new/:id", function (req, res) {
        var query = {};
        query._id = req.params.id;
        newsController.delete(query, function (err, data) {
            res.json(data);
        });
    });

    router.patch("/api/new", function (req, res) {
        newsController.update(req.body, function (err, data) {
            res.json(data);

        });
    });

    router.get("/api/notes/:headline_id?", function (req, res) {
        var query ={};
        if (req.params.headline_id) {
            query._id = req.params.headline_id;
        }

        notesController.get(query, function(err, data){
            res.json(data);
        });

    });

    router.delete("/api/notes/:id", function(req, res) {
        var query = {};
        query._id = req.params.id;
        notesController.delete(query, function(req, data){
            res.json(data);
        });

    });
    
        

}