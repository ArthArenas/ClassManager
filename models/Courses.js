const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const CoursesSchema = new Schema({
    term_id: {
        type: Schema.Types.ObjectId,
        ref: 'terms'
    },
    subject_id: {
        type: Schema.Types.ObjectId,
        ref: 'subjects'
    },
    workload: {
        finalExam: Number,
        homework: Number,
        classwork: Number,
        attendance: Number,
        behavior: Number,
        extra: Number
    },
    hasExam: Boolean
});

module.exports = Courses = mongoose.model('courses', CoursesSchema);