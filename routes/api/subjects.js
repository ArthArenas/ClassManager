const express = require('express');
const router = express.Router();

const Subjects = require('../../models/Subjects');
const Students = require('../../models/Students');
const Terms = require('../../models/Terms');
const Courses = require('../../models/Courses');
const CourseStudents = require('../../models/CourseStudents');

// @route GET api/subjects
// @desc Get all the subjects
// @access Public
router.get('/', (req, res) => {
    Subjects.find()
        .then(subjects => res.json(subjects))
});

router.put('/:subject_id', (req, res) => {
    Subjects.findOneAndUpdate(
        {
            _id: req.params.subject_id
        },
        req.body.update
    )
    .then(res.status(200).send());
});

router.post('/', (req, res) => {
    const subject = new Subjects(req.body.subject);
    subject.save().then(rep => {
        Terms.find({}, {_id: 1})
        .then(terms => {
            terms.map(term => {
                const course = new Courses({
                    term_id: term._id,
                    subject_id: rep._id,
                    workload: {
                        finalExam: null,
                        homework: null,
                        classwork: null,
                        attendance: null,
                        behavior: null,
                    },
                    hasExam: null
                });
                course.save()
                .then(repCourse => {
                    Students.find({}, {_id: 1})
                    .then(students => {
                        students.map(student => {
                            const courseStudent = new CourseStudents({
                                course_id: repCourse._id,
                                student_id: student._id,
                                workUnits: {
                                    finalExam: null,
                                    homework: null,
                                    classwork: null,
                                    attendance: null,
                                    behavior: null,
                                    extra: null
                                },
                                grade: null
                            });
                            courseStudent.save()
                            .then(res.status(200).send());
                        })
                    })
                })
            })
        })
    })
});

router.delete('/:subject_id', (req, res) => {
    Promise.all([
        Subjects.findByIdAndDelete(req.params.subject_id),
        Courses.deleteMany({
            subject_id: req.params.subject_id
        })
    ])
    .then(ans => {
        res.status(200).json(ans);
    });
});

module.exports = router;