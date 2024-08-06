const mongoose = require("mongoose");

const urlShortDbSchema = mongoose.Schema({
  shortId: {
    type: String,
    require: true,
    unique: true,
  },
  redirectUrl: {
    type: String,
    require: true,
  },
  visitHistory: [{ timeStamp: { type: Number } }],
},
{timestamps:true}
);




const urlShortModel = mongoose.model("url",urlShortDbSchema)

module.exports = urlShortModel;