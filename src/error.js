let absolute_position_show_errors =true;

class AbsolutePositionError extends Error {
    constructor(message = "",) {
        super(message);
    }

    /**@param {HTMLElement} element*/
    show_error(element){
        if(absolute_position_show_errors){
            console.log(this.message)
            console.log(element)
        }
    }

}

