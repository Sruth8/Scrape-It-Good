var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var NewsSchema = new Schema({
    Headline: {
        type: String,
        require: true,
        unique: true,
    },

    summary: {
        type: String,
        require: true
    },

    URL: {
        type:  String,
        require: true
    },

    saved: {
        type: Boolean,
        default: false
    },
     notes:[{
         type: Schema.Types.ObjectId,
         ref: "Note"
     }]
});

var News = mongoose.model("News", NewsSchema);

module.exports = News;