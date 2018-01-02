const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PostSchema = require('./post');
const UserSchema = new Schema({
  name:{
    type:String,
    validate:{
      validator: (name) => name.length >2,
      message: 'Name must be greater than 2 characters.'
    }
     },
  email: String,
  age: Number,
  postCount: Number,
  posts: [PostSchema]
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
