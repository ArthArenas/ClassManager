const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const CourseStudentsSchema = new Schema({
    course_id: {
        type: Schema.Types.ObjectId,
        ref: 'courses'
    },
    student_id: {
        type: Schema.Types.ObjectId,
        ref: 'students'
    },
    workUnits: {
        finalExam: Schema.Types.Mixed,
        homework: Number,
        classwork: Number,
        attendance: Number,
        behavior: Number,
        extra: Number
    },
    grade: Number
});

module.exports = CourseStudents = mongoose.model('course_students', CourseStudentsSchema);