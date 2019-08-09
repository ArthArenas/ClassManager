const express = require('express');
const router = express.Router();

// Subjects model
const CourseStudents = require('../../models/CourseStudents');

// @route GET api/course_students
// @desc Get all the course students
// @access Public
router.get('/', (req, res) => {
    CourseStudents.find()
        .then(course_students => res.json(course_students))
});

module.exports = router;