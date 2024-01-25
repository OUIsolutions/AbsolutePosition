/**
 * @typedef AbsolutePositionDimension
 * @property {number} value
 * @property {string} measure
 * @property {string} operator
 * */


/**
 *@typedef {object} AbsolutePositionDimensions
 * @property {AbsolutePositionDimension} left
 * @property {AbsolutePositionDimension} heigth
 * @property {AbsolutePositionDimension} width
 * @property {AbsolutePositionDimension} height
 * */


/**
 * @typedef {object} AbsolutePositionProp
 * @property {number} horizontal_ratio
 * @property {number} vertical_ratio
 * @property {number} mod
 * @property {string} assignature
 * @property {AbsolutePositionDimensions} dimensions
 * */


/**
 * @param {Array} element
 * @param {number} horizontal_ratio
 * @param {number} vertical_ratio
 @param {number} mod
 * @return {AbsolutePositionProp}
 * */
function absolute_position_find_or_create_dimension(
    element,
    horizontal_ratio,
    vertical_ratio,
    mod,

){
    for(let current of element){
        if(current.width === horizontal_ratio && current.height === vertical_ratio && current.mod  === mod){
            return current;
        }
    }
    let created = {
        horizontal_ratio:horizontal_ratio,
        vertical_ratio:vertical_ratio,
        mod:mod,
        dimensions:undefined
    };

    element.unshift(created);
    return created;


}
/**
 @param {string} value

 @return {AbsolutePositionDimension}
 */
function absolute_position_generate_divided_number(value){


    if(value === ABSOLUTE_POSITION_EMPTY_STRING){
        throw new AbsolutePositionError(ABSOLUTE_POSITION_ARGS_NOT_PASSED);
    }


    let num_string = ABSOLUTE_POSITION_EMPTY_STRING;
    let operator = undefined;

    let passed_operator = ABSOLUTE_POSITION_VALID_OPERATORS.includes(value[0]);


    if(passed_operator){
        operator = value[0];
        num_string = value.substring(1);
    }

    if(!passed_operator){
        num_string = value;
    }


    //revert num_string
    let reverted_num_string = num_string.split(ABSOLUTE_POSITION_EMPTY_STRING).reverse();
    let dimensions_list = [];
    let new_num_string = [];
    let num_found = false;
    for(let current of reverted_num_string){

        
        if(ABSOLUTE_POSITION_VALID_NUMS.includes(current)){
            num_found = true;
        }

        if(!num_found){
            dimensions_list.unshift(current);
        }
        if(num_found){
            new_num_string.unshift(current);
        }

    }

    let dimensions = dimensions_list.join(ABSOLUTE_POSITION_EMPTY_STRING);


    if(dimensions === ABSOLUTE_POSITION_EMPTY_STRING){
        dimensions = ABSOLUTE_POSITION_PERCENT;
    }
    if(!ABSOLUTE_POSITION_VALID_DIMENSIONS.includes(dimensions)){
        throw new  AbsolutePositionError(ABSOLUTE_POSITION_INVALID_DIMENSION);
    }

    
    

    let final_string_num = new_num_string.join(ABSOLUTE_POSITION_EMPTY_STRING);


    let num = Number(final_string_num);
    if(num === undefined){
        throw  new AbsolutePositionError(ABSOLUTE_POSITION_NOT_VALID_NUMBER);
    }

    return {
        measure:dimensions,
        value:num,
        operator:operator
    }
        

}


/**
 * @param {Array<AbsolutePositionProp>} final_array
 * @param {string} current

 * */
function  absolute_position_generate_measure(final_array, current){


    let division = current.split(ABSOLUTE_POSITION_LEFT_PARENTESIS);

    if(division.length <= 1){
        throw new AbsolutePositionError(ABSOLUTE_PARENTESIS_NOT_PROVIDED);
    }



    let dimensions_raw = division[0];
    let mod = undefined;
    if(dimensions_raw.includes('%')){
        let sub_division = dimensions_raw.split('%');
        dimensions_raw = sub_division[0];
        mod = Number(sub_division[1]);
    }

    let divided_dimensions = dimensions_raw.split(ABSOLUTE_POSITION_ASPECT_RATION_SEPARATOR);

    let  horizontal_ration = window.innerWidth;
    let  vertical_ratio =window.innerHeight;

    if(divided_dimensions.length === 2){
        horizontal_ration = Number(divided_dimensions[0]);
        vertical_ratio = Number(divided_dimensions[1]);
    }


    let numbers = division[1];
    numbers = numbers
        .replaceAll(ABSOLUTE_POSITION_LEFT_PARENTESIS,ABSOLUTE_POSITION_EMPTY_STRING)
        .replaceAll(ABSOLUTE_POSITION_RIGHT_PARENTESIS,ABSOLUTE_POSITION_EMPTY_STRING);


    let divided_numbers = numbers.split(ABSOLUTE_POSITION_MEASURE_DIVIDER);

    if(divided_numbers.length !== 4){
        throw new AbsolutePositionError(ABSOLUTE_POSITION_MISSING_DIVIDER);
    }

    let left =absolute_position_generate_divided_number(divided_numbers[0]);
    let top =absolute_position_generate_divided_number(divided_numbers[1]);
    let width =absolute_position_generate_divided_number(divided_numbers[2]);
    let height =absolute_position_generate_divided_number(divided_numbers[3])

    let created = absolute_position_find_or_create_dimension(
        final_array,
        horizontal_ration,
        vertical_ratio,
        mod
    );

    created.dimensions = {
        left:left,
        top:top,
        width:width,
        height:height
    }


}


/**
 * @param {HTMLElement} element
 * @param {string} value
 * @return {Array<AbsolutePositionProp>}
 * */
function  absolute_position_parser(element,value){
        /**@type {Array<AbsolutePositionProp>}*/
        let final_array = [];
        let formatted_value = value.replaceAll(ABSOLUTE_POSITION_SPACE,ABSOLUTE_POSITION_EMPTY_STRING);
        let elements = formatted_value.split(ABSOLUTE_POSITION_START_CHAR);
        elements = elements.filter(v => v !== ABSOLUTE_POSITION_EMPTY_STRING);

        elements.forEach(current=>{
            try{
                absolute_position_generate_measure(final_array,current)
            }
            /**@type {AbsolutePositionError}*/
            catch (error){
               error.show_error(element);
            }

        })
        return final_array;
}