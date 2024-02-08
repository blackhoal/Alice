const express = require('express');
const app = express();
const mongoose = require("mongoose");

mongoose.connect('mongodb+srv://Jason:<password>@cluster0.h6hywhr.mongodb.net/')
    .then(() => console.log('Connected!'));

const User = mongoose.model('user', new mongoose.Schema({
    name: String,
    username: String,
    email: String,
    age: Number,
}));