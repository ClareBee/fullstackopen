const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minLength: 5
  },
  password: {
    type: String,
    required: true,
    minLength: 5
  },
  favoriteGenre: {
    type: String,
    minlength: 5
  }
})
module.exports = mongoose.model('Visitor', schema)
