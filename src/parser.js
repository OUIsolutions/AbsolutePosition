/**
 * @typedef SantosDummontDimension
 * @property {number} pixel_value
 * @property {string} operator
 * */


/**
 *@typedef {object} SantosDummontDimensions
 * @property {SantosDummontDimension} left
 * @property {SantosDummontDimension} heigth
 * @property {SantosDummontDimension} width
 * @property {SantosDummontDimension} height
 * */


/**
 * @typedef {object} SantosDummontProp
 * @property {number} horizontal_ratio
 * @property {number} vertical_ratio
 * @property {SantosDummontDimensions} dimensions
 * */


/**
 * @param {Array} element
 * @param {number} width
 * @param {number} height
 * @return {SantosDummontProp}
 * */
function find_or_create_dimension(element,width,height){
    for(let current of element){
        if(current.width === width && current.height === height){
            return current;
        }
    }
    let created = {
        horizontal_ratio:height,
        vertical_ratio:width,
        dimensions:undefined
    };

    element.unshift(created);
    return created;


}
/**
 *  @param {number} value
 *  @param {string} measure
 *  @param {number}browser_width
 *  @param {number} browser_height
 *  @return {number}
 * */
function SantosDummontConvertMeasure(value,measure,browser_width,browser_height){
    let final_value = value;
    if(measure === '%'){
        final_value = (value/100)*browser_width;
    }
    if(measure === 'vh'){
        final_value = (value/100)*browser_height;
    }
    if(measure === 'vw'){
        final_value = (value/100)*browser_width;
    }
    if(measure === 'px'){
        final_value = value;
    }

    return Number(final_value);


}/**
 @param {string} value
 @param {number} browser_width
 @param {number} browser_height
 @return {SantosDummontDimension}
 */
function SantosDummont_generate_divided_number(value,browser_width,browser_height){

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

        if(!isNaN(current)){
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
    let num = parseInt(final_string_num);
    let pixel_value = SantosDummontConvertMeasure(num,dimensions,browser_width,browser_height);
    return {
        pixel_value:pixel_value,
        operator:operator
    }
        

}


/**
 * @param {Array<SantosDummontProp>} final_array
 * @param {string} current
 * @param {number} browser_width
 * @param {number} browser_height
 * */
function  SantosDummont_generate_measure(final_array,current,browser_width,browser_height){
    let division = current.split('(');
    let dimensions_raw = division[0];
    let divided_dimensions = dimensions_raw.split(':');
    let horizontal_ration = Number(divided_dimensions[0]);
    let vertical_ratio = Number(divided_dimensions[1]);
    let created = find_or_create_dimension(final_array,horizontal_ration,vertical_ratio);
    let numbers = division[1];
    numbers = numbers.replaceAll('(','').replaceAll(')','');
    let divided_numbers = numbers.split(',');

    created.dimensions = {
        left:SantosDummont_generate_divided_number(divided_numbers[0],browser_width,browser_height),
        top:SantosDummont_generate_divided_number(divided_numbers[1],browser_width,browser_height),
        width:SantosDummont_generate_divided_number(divided_numbers[2],browser_width,browser_height),
        height:SantosDummont_generate_divided_number(divided_numbers[3],browser_width,browser_height)
    }
}


/**
 * @param {string} value
 * @param {number} browser_width
 * @param {number} browser_height
 * @return {Array<SantosDummontProp>}
 * */
function  SantosDummont_parser(value,browser_width,browser_height){
        /**@type {Array<SantosDummontProp>}*/
        let final_array = [];
        let formatted_value = value.replaceAll(" ","");
        let elements = formatted_value.split('$');
        elements = elements.filter(v => v !== '');
        elements.forEach(current=>{
            SantosDummont_generate_measure(final_array,current,browser_width,browser_height)
        })
        return final_array;
}