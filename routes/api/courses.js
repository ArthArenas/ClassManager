const express = require('express');
const router = express.Router();

const Subjects = require('../../models/Subjects');
const Students = require('../../models/Students');
const Terms = require('../../models/Terms');
const Courses = require('../../models/Courses');
const CourseStudents = require('../../models/CourseStudents');

router.get('/:course_id/exam', (req, res) => {
    var course_id = req.params.course_id;
    CourseStudents.find({
        course_id: course_id
    },{
        student_id: 1,
        "workUnits.finalExam": 1
    })
    .populate('student_id')
    .then(grades => res.json(grades));
});

router.get('/:course_id', (req, res) => {
    var course_id = req.params.course_id;
    Promise.all([
        Courses.find({
            _id: course_id
        },{
            _id: 1,
            term_id: 1,
            //subject_id: 0,
            workload: 1,
            hasExam: 1
        })
        .populate('term_id')
        .populate('subject_id'),
        CourseStudents.find({
            course_id: course_id
        },{
            course_id: 0
        })
        .populate('student_id')
    ])
    .then(resArr => {
        const [course, data] = resArr;
        res.json({
            course,
            data
        });
    });
});

router.get('/', (req, res) => {
    Courses.find()
        .then(courses => res.json(courses))
});

router.put('/:course_id/:student_id', (req, res) => {
    CourseStudents.findOneAndUpdate(
        {
            course_id: req.params.course_id,
            student_id: req.params.student_id
        },
        req.body.update
    )
    .then(res.status(200).send());
});

router.put('/:course_id/exam/:student_id', (req, res) => {
    CourseStudents.findOneAndUpdate(
        {
            course_id: req.params.course_id,
            student_id: req.params.student_id
        },
        req.body.update
    )
    .then(res.status(200).send());
});

router.put('/:course_id', (req, res) => {
    Courses.findOneAndUpdate(
        {
            _id: req.params.course_id
        },
        req.body.update
    )
    .then(res.status(200).send());
});

module.exports = router;