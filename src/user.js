const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
  postCount: Number
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
