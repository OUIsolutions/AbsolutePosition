let absolute_position_show_errors =true;

class AbsolutePositionError extends Error {
    constructor(message = "",) {
        super(message);
    }
    show_error(value){
        if(absolute_position_show_errors){
            console.log(this.message + value)
        }
    }
}

