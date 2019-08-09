const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const StudentsSchema = new Schema({
    givenNames: String,
    surnames: String,
    gender: String
});

module.exports = Students = mongoose.model('students', StudentsSchema);