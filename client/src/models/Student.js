import uuid from 'uuid';

class Student {
    
    constructor(args){
        if (args === null) {
            this._id = uuid().toString();
            this.givenNames = null;
            this.surnames = null;
            this.gender = null;
        }
        else if(typeof(args) === 'object'){
            this._id = (args._id == null) ? uuid().toString() : args._id;
            this.givenNames = args.givenNames;
            this.surnames = args.surnames;
            this.gender = args.gender;
        }
        else{
            this._id = uuid().toString();
            this.givenNames = args[0];
            this.surnames = args[1];
            this.gender = args[2];
        }
    }
}

export default Student;