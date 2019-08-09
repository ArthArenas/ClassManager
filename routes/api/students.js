const express = require('express');
const router = express.Router();

const Subjects = require('../../models/Subjects');
const Students = require('../../models/Students');
const Terms = require('../../models/Terms');
const Courses = require('../../models/Courses');
const CourseStudents = require('../../models/CourseStudents');

router.get('/', (req, res) => {
    Students.find()
    .then(students => res.json(students))
});

router.put('/:student_id', (req, res) => {
    Students.findOneAndUpdate(
        {
            _id: req.params.student_id
        },
        req.body.update
    )
    .then(res.status(200).send());
});

router.post('/', (req, res) => {
    const student = new Students(req.body.student);
    student.save().then(rep => {
        Courses.find({}, {_id: 1, hasExam: 1, "workload.finalExam": 1})
        .then(courses => {
            courses.map(course => {
                const courseStudent = new CourseStudents({
                    course_id: course._id,
                    student_id: rep._id,
                    workUnits: {
                        finalExam: course.hasExam ? Array(course.workload.finalExam).fill(null) : null,
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
            });
        })
    });
});

router.delete('/:student_id', (req, res) => {
    Promise.all([
        Students.findByIdAndDelete(req.params.student_id),
        CourseStudents.deleteMany({
            student_id: req.params.student_id
        })
    ])
    .then(ans => {
        res.status(200).json(ans);
    });
});

module.exports = router;