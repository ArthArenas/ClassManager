const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const TermsSchema = new Schema({
    title: String,
    number: Number
});

module.exports = Terms = mongoose.model('terms', TermsSchema);