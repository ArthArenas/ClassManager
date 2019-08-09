import uuid from 'uuid';

class Course {

    constructor(args){
        if (args === null) {
            this._id = uuid().toString();
            this.term_id = null;
            this.subject_id = null;
            this.workload = null;
            this.hasExam = null;
        }
        else if(typeof(args) === 'object'){
            this._id = (args._id == null) ? uuid().toString() : args._id;
            this.term_id = args.term_id;
            this.subject_id = args.subject_id;
            this.workload = args.workload;
            this.hasExam = args.hasExam;
        }
        else{
            this._id = uuid().toString();
            this.term_id = args[0];
            this.subject_id = args[1];
            this.workload = args[2];
            this.hasExam = args[3];
        }
    }
}

export default Course;