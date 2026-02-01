const mongoose = require("mongoose");

// defining schema for post for mongoose in mongodb
const postSchema = new mongoose.Schema({
  image: {
    type: String,
    require: true,
    unique: true,
  },
  caption: String,
});

const postModel = mongoose.model("post", postSchema);

module.exports = postModel;