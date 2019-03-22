const express = require('express');
const router = express.Router();

// Student model
const Student = require('../../models/Students');

// @route GET api/students
// @desc Get all the students
// @access Public
router.get('/', (req, res) => {
    Student.find()
        .then(students => res.json(students))
});

// @route POST api/students
// @desc Create a student
// @access Public
router.post('/', (req, res) => {
    const newStudent = new Student({
        givenNames: req.body.givenNames,
        surname: req.body.surname,
        gender: req.body.gender
    });

    newStudent.save().then(student => res.json(student));
});

// @route DELETE api/students/:id
// @desc Delete a student
// @access Public
router.delete('/:id', (req, res) => {
    Student.findById(req.params.id)
        .then(student => student.remove().then(() => res.json({success: true})))
        .catch(err => res.status(404).json({success: false}))
});

module.exports = router;