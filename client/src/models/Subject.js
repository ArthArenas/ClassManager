import uuid from 'uuid';

class Subject {

    constructor(args){
        if (args === null){
            this._id = uuid().toString();
            this.title = null;
        }
        else if(typeof(args) === 'object'){
            this._id = (args._id == null) ? uuid().toString() : args._id;
            this.title = args.title;
        }
        else{
            this._id = uuid().toString();
            this.title = args[0].title;
        }
    }
}

export default Subject;