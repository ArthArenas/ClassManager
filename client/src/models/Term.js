import uuid from 'uuid';

class Term {

    constructor(args){
        if (args === null){
            this._id = uuid().toString();
            this.title = null;
            this.number = null;
        }
        else if(typeof(args) === 'object'){
            this._id = (args._id == null) ? uuid().toString() : args._id;
            this.title = args.title;
            this.number = args.number;
        }
        else{
            this._id = uuid().toString();
            this.title = args[0].title;
            this.number = args[1].number;
        }
    }
}

export default Term;