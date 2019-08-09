import uuid from 'uuid';

class CourseStudent {

    constructor(args){
        if(args == null){
            this._id = uuid().toString();
            this.course_id = null;
            this.student_id = null;
            this.workUnits = null;
            this.grade = null;
        }
        else if(typeof(args) === 'object'){
            this._id = (args._id == null) ? uuid().toString() : args._id;
            this.course_id = args.course_id;
            this.student_id = args.student_id;
            this.workUnits = args.workUnits;
            this.grade = args.grade;
        }
        else{
            this._id = uuid().toString();
            this.course_id = args[0];
            this.student_id = args[1];
            this.workUnits = args[2];
            this.grade = args[3];
        }
    }
}

export default CourseStudent;