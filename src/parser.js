/**
 * @typedef SantosDummontDimension
 * @property {number} value
 * @property {string} measure
 * @property {string} operator
 * */


/**
 *@typedef {object} AbsolutePositionDimensions
 * @property {SantosDummontDimension} left
 * @property {SantosDummontDimension} heigth
 * @property {SantosDummontDimension} width
 * @property {SantosDummontDimension} height
 * */


/**
 * @typedef {object} AbsolutePositionProp
 * @property {number} horizontal_ratio
 * @property {number} vertical_ratio
 * @property {AbsolutePositionDimensions} dimensions
 * */


/**
 * @param {Array} element
 * @param {number} horizontal_ratio
 * @param {number} vertical_ratio
 * @return {AbsolutePositionProp}
 * */
function absolute_position_find_or_create_dimension(element, horizontal_ratio, vertical_ratio){
    for(let current of element){
        if(current.width === horizontal_ratio && current.height === vertical_ratio){
            return current;
        }
    }
    let created = {
        horizontal_ratio:horizontal_ratio,
        vertical_ratio:vertical_ratio,
        dimensions:undefined
    };

    element.unshift(created);
    return created;


}
/**
 @param {string} value

 @return {SantosDummontDimension}
 */
function absolute_poisition_generate_divided_number(value){

    let num_string = '';
    let operator = undefined;
    const VALID_OPERATORS = ['+','-'];

    let passed_operator = VALID_OPERATORS.includes(value[0]);

    if(passed_operator){
        operator = value[0];
        num_string = value.substring(1);
    }
    if(!passed_operator){
        num_string = value;
    }


    //revert num_string
    let reverted_num_string = num_string.split('').reverse();
    let dimensions_list = [];
    let new_num_string = [];
    let num_found = false;
    for(let current of reverted_num_string){

        let VALID_CHARS = ['.','0','1','2','3','4','5','6','7','8','9'];
        
        if(VALID_CHARS.includes(current)){
            num_found = true;
        }

        if(!num_found){
            dimensions_list.unshift(current);
        }
        if(num_found){
            new_num_string.unshift(current);
        }

    }

    let dimensions = dimensions_list.join('');
    
    if(dimensions === ''){
        dimensions = '%';
    }
    

    let final_string_num = new_num_string.join('');
    let num = Number(final_string_num);
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
    let division = current.split('(');
    let dimensions_raw = division[0];
    let divided_dimensions = dimensions_raw.split(':');
    let horizontal_ration = Number(divided_dimensions[0]);
    let vertical_ratio = Number(divided_dimensions[1]);
    let created = absolute_position_find_or_create_dimension(final_array,horizontal_ration,vertical_ratio);
    let numbers = division[1];
    numbers = numbers.replaceAll('(','').replaceAll(')','');
    let divided_numbers = numbers.split(',');

    created.dimensions = {
        left:absolute_poisition_generate_divided_number(divided_numbers[0]),
        top:absolute_poisition_generate_divided_number(divided_numbers[1]),
        width:absolute_poisition_generate_divided_number(divided_numbers[2]),
        height:absolute_poisition_generate_divided_number(divided_numbers[3])
    }
}


/**
 * @param {string} value
 * @return {Array<AbsolutePositionProp>}
 * */
function  absolute_position_parser(value){
        /**@type {Array<AbsolutePositionProp>}*/
        let final_array = [];
        let formatted_value = value.replaceAll(" ","");
        let elements = formatted_value.split('$');
        elements = elements.filter(v => v !== '');
        elements.forEach(current=>{
            absolute_position_generate_measure(final_array,current)
        })
        return final_array;
}