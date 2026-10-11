const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const languageSchema = new Schema({
    name: {
        type: String,
        required: true, 
    },
    hero: String,
    tagline: String,
    badges: [String],
    des: String,
    infoPanel: [String],
    logoUrl: String,
    description: String,
    sections: [
        {
            title: String,
            titleLink: String,
            icon: String,
            bgColor: String,
            text: String,
        }
    ]
});

const Language = mongoose.model("Language", languageSchema);
module.exports = Language; 
