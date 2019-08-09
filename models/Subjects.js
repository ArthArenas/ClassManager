const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const SubjectsSchema = new Schema({
    title: String
});

module.exports = Subjects = mongoose.model('subjects', SubjectsSchema);