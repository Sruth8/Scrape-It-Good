module.exports = function(router) {

    //renders the homepage
    router.get("/", function(req, res){
        res.render("home");
    });

    //route to render the saved handlebars page
    router.get("/saved", function(req1, res){
        res.render("saved");
    });
}