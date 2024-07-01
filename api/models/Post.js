const mongoose = require('mongoose');
const {Schema, model} =  mongoose;

const PostSchema = new Schema({
    title: String,
    summary: String,
    content: String,
    cover: String
},{
    timestamps: true  //allows us to know when post is created and updated
});

const PostModel = model('Post', PostSchema);

module.exports = PostModel;