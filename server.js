const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const course_students = require('./routes/api/course_students');
const courses = require('./routes/api/courses');
const students = require('./routes/api/students');
const subjects = require('./routes/api/subjects');
const terms = require('./routes/api/terms');

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
app.use('/api/course_students', course_students);
app.use('/api/courses', courses);
app.use('/api/students', students);
app.use('/api/subjects', subjects);
app.use('/api/terms', terms);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));