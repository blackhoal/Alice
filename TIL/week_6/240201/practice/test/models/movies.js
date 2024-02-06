const mongoose = require('mongoose');
const {Schema} = mongoose;

const movieSchema = new Schema({
    title: {
      type: String,
    },
    author: {
      type: String,
    },
    category: {
      type: String,
    },
  });