'use strict'

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: String,
    lastName: String,
    emailAddress: { type: String, index: true, unique: true, required: true },
    password: String,
});

var User = mongoose.model("User", UserSchema);

module.exports.User = User;