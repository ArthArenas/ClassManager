const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const students = require('./routes/api/students');

// Initialize the express app
const app = express();

// Bodyparser middleware
app.use(bodyParser.json());

// DB Config
const db = require('./config/keys').mongoURI; // connection string

// Connect to MongoDB
mongoose.connect(db, {useNewUrlParser: true})
    .then(() => console.log('Connection with database was successful'))
    .catch(err => console.log(err));

// Use routes
app.use('/api/students', students);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));