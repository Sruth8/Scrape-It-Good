var Note = require("../models/Notes");
var createDate = require("../scripts/date");


module.exports = {
    // this get function will get all of the notes 

    get: function(data, callback) {
        Note.find({
            _headlineId: data._id,
           
        }, callback);

    },
    save: function(data, callback) {
        var recentNote = {
            _headlineId: data._id,
            date: createDate(),
            noteText: data.noteText
        };

        Note.create(recentNote, function (er, doc){
            if(err) {
                console.log(err);
            }
            else {
                console.log(doc);
                callback(document);
            }
        });
    },
}