const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BlogSchema = new Schema({
  title: String,
  body: String
});

const Blog = mongoose.model("Blog", BlogSchema)
module.exports = Blog;
