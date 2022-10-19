const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  //Schema
})

const User = new mongoose.model('User', userSchema);

module.exports = User;