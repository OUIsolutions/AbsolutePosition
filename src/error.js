


/**
 * @param {HTMLElement || string} error
 * */
function absolute_position_log_error(error){

    let signature = String(error);
    if(absolute_position_logged_errors.includes(signature)){
        return;
    }
    absolute_position_logged_errors.push(signature);
    console.log(error);

}



class AbsolutePositionError extends Error {
    constructor(message = "",) {
        super(message);
    }

    /**@param {HTMLElement} element*/
    show_error(element){
        if(absolute_position_show_errors){
            absolute_position_log_error(this.message)
            absolute_position_log_error(element)
        }
    }

}

