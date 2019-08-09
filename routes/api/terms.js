const express = require('express');
const router = express.Router();

const Subjects = require('../../models/Subjects');
const Students = require('../../models/Students');
const Terms = require('../../models/Terms');
const Courses = require('../../models/Courses');
const CourseStudents = require('../../models/CourseStudents');

router.get('/', (req, res) => {
    Terms.find()
    .then(terms => res.json(terms))
});

router.put('/:term_id', (req, res) => {
    Terms.findOneAndUpdate(
        {
            _id: req.params.term_id
        },
        req.body.update
    )
    .then(ans => {
        res.status(200).json(ans);
    });
});

router.post('/', (req, res) => {
    const term = new Terms(req.body.term);
    term.save().then(rep => {
        Subjects.find({}, {_id: 1})
        .then(subjects => {
            subjects.map(subject => {
                const course = new Courses({
                    term_id: rep._id,
                    subject_id: subject._id,
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

router.delete('/:term_id', (req, res) => {
    Promise.all([
        Terms.findByIdAndDelete(req.params.term_id),
        Courses.deleteMany({
            term_id: req.params.term_id
        })
    ])
    .then(ans => {
        res.status(200).json(ans);
    });
});

module.exports = router;