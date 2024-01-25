
const ABSOLUTE_POSITION_ATTRIBUTE = 'APosition';
const ABSOLUTE_POSITION_QUERY_SELECTOR = `[${ABSOLUTE_POSITION_ATTRIBUTE}]`

const ABSOLUTE_POSITION_DOM_LOAD = 'load';
//code assigns
const  ABSOLUTE_POSITION_START_CHAR = '$';
const  ABSOLUTE_POSITION_MEASURE_DIVIDER = ',';
const ABSOLUTE_POSITION_LEFT_PARENTESIS = '(';
const ABSOLUTE_POSITION_RIGHT_PARENTESIS = ')';
const  ABSOLUTE_POSITION_EMPTY_STRING = '';
const ABSOLUTE_POSITION_SPACE = ' ';
const ABSOLUTE_POSITION_BREAK_LINE = '\n'

const ABSOLUTE_POSITION_LAST = 'last';
const  ABSOLUTE_POSITION_VALID_NUMS = ['.','0','1','2','3','4','5','6','7','8','9'];

const ABSOLUTE_POSITION_ASPECT_RATION_SEPARATOR = ':'
//directions
const ABSOLUTE_POSITION_LEFT = 'left';
const ABSOLUTE_POSITION_TOP = 'top';
const ABSOLUTE_POSITION_WIDTH = 'width';
const ABSOLUTE_POSITION_HEIGHT = 'height';


//operators
const ABSOLUTE_POSITION_OPERATOR_PLUS = '+';
const ABSOLUTE_POSITION_OPERATOR_MIN = '-';



const ABSOLUTE_POSITION_VALID_OPERATORS = [
    ABSOLUTE_POSITION_OPERATOR_PLUS,
    ABSOLUTE_POSITION_OPERATOR_MIN
]

const ABSOLUTE_POSITION_HORIZONTAL_DIRECTIONS = [
    ABSOLUTE_POSITION_LEFT,
    ABSOLUTE_POSITION_WIDTH

];
const ABSOLUTE_POSITION_VERTICAL_DIRECTIONS = [
    ABSOLUTE_POSITION_TOP,
    ABSOLUTE_POSITION_HEIGHT
];

//measures
const ABSOLUTE_POSITION_VW = 'vw';
const ABSOLUTE_POSITION_VH  = 'vh';
const ABSOLUTE_POSITION_PX = 'px';
const ABSOLUTE_POSITION_PERCENT = '%';


const ABSOLUTE_POSITION_WIDTH_PERCENT = "w%";
const ABSOLUTE_POSITION_HEIGHT_PERCENT = "v%";


const ABSOLUTE_POSITION_PERCENTS = [
    ABSOLUTE_POSITION_PERCENT,
    ABSOLUTE_POSITION_WIDTH_PERCENT,
    ABSOLUTE_POSITION_HEIGHT_PERCENT
]
const ABSOLUTE_POSITION_VALID_DIMENSIONS = [
    ABSOLUTE_POSITION_VW,
    ABSOLUTE_POSITION_VH,
    ABSOLUTE_POSITION_WIDTH_PERCENT,
    ABSOLUTE_POSITION_HEIGHT_PERCENT,
    ABSOLUTE_POSITION_PX,
    ABSOLUTE_POSITION_PERCENT
]
//html tags
const ABSOLUTE_POSITION_RESIZE = 'resize';
const ABSOLUTE_POSITION_ABSOLUTE = 'absolute';


//errors
const ABSOLUTE_PARENTESIS_NOT_PROVIDED = ' char:"(" not provided at:';
const  ABSOLUTE_POSITION_MISSING_DIVIDER = '"," missing at';
const ABSOLUTE_POSITION_ARGS_NOT_PASSED = 'Args not passed at:';
const ABSOLUTE_POSITION_INVALID_DIMENSION = 'Invalid Dimensions at:'
const ABSOLUTE_POSITION_NOT_VALID_NUMBER = 'Not Valid Number at:';
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


/**
 * @typedef {object} AbsolutePositionAspectRatio
 * @property {number} width
 * @property {number} height
 * @property {boolean} is_horizontal
 * @property {boolean} is_vertical
 * */
/**
 * @param {number} width
 * @param {number} height
 * @return {AbsolutePositionAspectRatio}
 * */
function absolute_position_convert_aspect_ratio(width, height){
    //convert 1920x1080 to 16x9
    let aspect_ratio = width/height;
    let width_ratio = 1;
    let height_ratio = 1;
    if(aspect_ratio > 1){
        width_ratio = aspect_ratio;
    }
    if(aspect_ratio < 1){
        height_ratio = 1/aspect_ratio;
    }
    return {
        is_horizontal:aspect_ratio >= 1,
        is_vertical:aspect_ratio < 1,
        width:width_ratio,
        height:height_ratio
    };
}

/**
 * @param {number} element1
 * @param {number} element2
 * @return {number}
 */
function absolute_position_returns_difference(element1, element2){
   if(element1 >= element2) {
       return element1 - element2;
   }
   return  element2 - element1;
}



/**
 * @param {AbsolutePositionProp} measure
 * @param {AbsolutePositionAspectRatio} browser_ratio
 * @param {number} total_previews
 * */
function absolute_position_create_assignature(measure,browser_ratio,total_previews){
    let measure_ratio = absolute_position_convert_aspect_ratio(measure.horizontal_ratio, measure.vertical_ratio);
    let width_dif = absolute_position_returns_difference(measure_ratio.width,browser_ratio.width);
    let highest_dif = absolute_position_returns_difference(measure_ratio.height,browser_ratio.height);
    let dif = width_dif+highest_dif;



    if(total_previews !==  undefined &&measure.mod){
        let rest = total_previews % measure.mod;
        return `${dif}.${rest}`
    }
    return `${dif}.01`
}

/**
 * @param {Array<AbsolutePositionProp>} measures
 * @param {number}browser_width
 * @param {number}browser_height
 * @param {number || undefined} total_previews
 * @return {AbsolutePositionProp}
 * **/
function absolute_position_find_closest_measure(
    measures,
    browser_width,
    browser_height,
    total_previews
) {



    let browser_ratio = absolute_position_convert_aspect_ratio(browser_width, browser_height);
    measures.forEach(v => v.assignature = absolute_position_create_assignature(v,browser_ratio,total_previews))


    let ordered = measures.sort((a,b)=>{


         if(a.assignature < b.assignature){
             return -1;
         }
         if(a.assignature > b.assignature){
             return  1;
         }
         return 0;
    })

    return  ordered[0];

}


/**
 * @param {HTMLElement} element
 * */
function absolute_position_find_father(element){
    /**@type {HTMLElement}*/
    let father = element.parentElement;

    while(father){

        if(father === document.body){
            break;
        }

        if(father.hasAttribute(ABSOLUTE_POSITION_ATTRIBUTE)){
            if(father.style.display !== 'none'){
                break;
            }
        }


        father = father.parentElement;

    }

    return father;
}

/**
 * @param {HTMLElement} element
 * */
function  absolute_position_retrive_element_or_child_if_is_aposition(element){

    if(element.style.display === 'none'){
        return undefined;
    }

    if(element.hasAttribute(ABSOLUTE_POSITION_ATTRIBUTE)){
        return  element;
    }

    for(let i = 0; i < element.children.length;i++){
        let current =  element.children[i];

        let result =absolute_position_retrive_element_or_child_if_is_aposition(current);
        if(result){
            return  result;
        }
    }
}

/**
 * @param {HTMLElement} element
 * @return {HTMLElement || undefined}
 * */
function absolute_position_find_previews_element(element){
    /**@type {HTMLElement}*/
    let previews =element;
    let father = absolute_position_find_father(element);
    while(previews){

        if(previews === document.body){
            return  undefined;
        }

        if(previews === father){
            return  undefined;
        }


        let possible_previews = previews.previousElementSibling;

        if(!possible_previews){
            previews = previews.parentElement;
            continue;
        }

        previews = possible_previews;
        let possible = absolute_position_retrive_element_or_child_if_is_aposition(
            previews
        );
        if(possible){
            return  possible;
        }

    }

}
/**
 * @param {HTMLElement} element
 * @return {number}
 * */
function absolute_position_count_previews(element){
    let total = 0;
    let previews = absolute_position_find_previews_element(element);
    while (previews){
        total+=1;
        previews = absolute_position_find_previews_element(previews);
    }
    return  total;
}
/**
 * @typedef AbsolutePositionDimension
 * @property {boolean} last
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
    if(value === ABSOLUTE_POSITION_LAST){
        return {last:true};
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
        last:false,
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

    let width =absolute_position_generate_divided_number(divided_numbers[2]);
    let height =absolute_position_generate_divided_number(divided_numbers[3])
    let left =absolute_position_generate_divided_number(divided_numbers[0]);
    let top =absolute_position_generate_divided_number(divided_numbers[1]);

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
        formatted_value = formatted_value.replaceAll(ABSOLUTE_POSITION_BREAK_LINE,ABSOLUTE_POSITION_EMPTY_STRING);
        formatted_value = formatted_value.toLowerCase();
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

let absolute_position_macros = {

}

/**
 * @param {string} name
 * @param {string} value
 * */
function  APosition_define_macro(name,value){
    absolute_position_macros[name] = value;
}
/**
 * @param {string} attribute
 * @return {string}
 * */
function  Absolute_position_replace_macros(attribute){
    let result = attribute;
    for(let key in absolute_position_macros){
        let value = absolute_position_macros[key];
        result = attribute.replaceAll(key,value);
    }
    return  result;
}
/**
 * @param {string} measure
 * @param {string} name
 * @return {string}
 * */
function  absolute_position_convert_percent(measure,name){
    if(measure === ABSOLUTE_POSITION_WIDTH_PERCENT){
        return  ABSOLUTE_POSITION_WIDTH;
    }
    if(measure ===ABSOLUTE_POSITION_HEIGHT_PERCENT){
        return  ABSOLUTE_POSITION_HEIGHT;
    }
    if(ABSOLUTE_POSITION_HORIZONTAL_DIRECTIONS.includes(name)){
        return  ABSOLUTE_POSITION_WIDTH;
    }

    if(ABSOLUTE_POSITION_VERTICAL_DIRECTIONS.includes(name)){
        return  ABSOLUTE_POSITION_HEIGHT;
    }

}

/**
 *@param {number} pixel_value
 *@param {string} measure
 *@param {string} name
 *@param {DOMRect} father_rect
 *@param {number} browser_width
 *@param {number} browser_height
 **/
function absolute_position_convert_pixel_value(pixel_value,measure,name,father_rect,browser_width,browser_height){

    if(ABSOLUTE_POSITION_PERCENTS.includes(measure)){
        let formatted_name   = absolute_position_convert_percent(measure,name);
        let father_size = father_rect[formatted_name];
        let fraction =(father_size/100);
        return fraction * pixel_value;
    }

    if(measure === ABSOLUTE_POSITION_VH){
        return (pixel_value/100)*browser_height;
    }

    if(measure === ABSOLUTE_POSITION_VW){
        return (pixel_value/100)*browser_width;
    }
    return  pixel_value;
}



/**
 * @param {HTMLElement} element
 * @param {AbsolutePositionDimension} current_measure
 * @param {DOMRect} father_rect
 * @param {DOMRect} previews_rect
 * @param {number} browser_width
 * @param {number} browser_height
 *
 * */
function  absolute_position_generate_width_measures(
    element,
    current_measure,
    father_rect,
    previews_rect,
    browser_width,
    browser_height){

    let value  =current_measure.value;
    let measure = current_measure.measure;
    let operator = current_measure.operator;

    let previews_width = 0;

    if(previews_rect){
        previews_width = previews_rect[ABSOLUTE_POSITION_WIDTH];
    }

    if(current_measure.last){
        element.style[ABSOLUTE_POSITION_WIDTH] = previews_width +ABSOLUTE_POSITION_PX;
        return;
    }


    let pixel_value = absolute_position_convert_pixel_value(
        value,
        measure,
        ABSOLUTE_POSITION_WIDTH,
        father_rect,
        browser_width,
        browser_height
    );

    //get the width of the brother
    if(operator === ABSOLUTE_POSITION_OPERATOR_PLUS ){
        pixel_value +=  previews_width;
    }

    if(operator === ABSOLUTE_POSITION_OPERATOR_MIN){
        pixel_value-=previews_width;
    }

    element.style[ABSOLUTE_POSITION_WIDTH] = pixel_value + ABSOLUTE_POSITION_PX ;

}


/**
 * @param {HTMLElement} element
 * @param {AbsolutePositionDimension} current_measure
 * @param {DOMRect} father_rect
 * @param {DOMRect} previews_rect
 * @param {number} browser_width
 * @param {number} browser_height
 *
 * */
function  absolute_position_generate_height_measures(
    element,
    current_measure,
    father_rect,
    previews_rect,
    browser_width,
    browser_height){

    let value  =current_measure.value;
    let measure = current_measure.measure;
    let operator = current_measure.operator;

    let previews_height = 0;

    if(previews_rect){
        previews_height = previews_rect[ABSOLUTE_POSITION_HEIGHT];
    }

    if(current_measure.last){
        element.style[ABSOLUTE_POSITION_HEIGHT] = previews_height +ABSOLUTE_POSITION_PX;
        return;
    }


    let pixel_value = absolute_position_convert_pixel_value(
        value,
        measure,
        ABSOLUTE_POSITION_HEIGHT,
        father_rect,
        browser_width,
        browser_height
    );

    //get the width of the brother
    if(operator === ABSOLUTE_POSITION_OPERATOR_PLUS ){
        pixel_value += previews_height ;
    }

    if(operator === ABSOLUTE_POSITION_OPERATOR_MIN){
        pixel_value-=previews_height;
    }

    element.style[ABSOLUTE_POSITION_HEIGHT] = pixel_value + ABSOLUTE_POSITION_PX ;

}




/**
 * @param {HTMLElement} element
 * @param {AbsolutePositionDimension} current_measure
 * @param {HTMLElement} father
 * @param {DOMRect} previews_rect
 * @param {number} browser_width
 * @param {number} browser_height
 *
 * */
function  absolute_position_generate_top_measures(
    element,
    current_measure,
    father,
    previews_rect,
    browser_width,
    browser_height){

    let value  =current_measure.value;
    let measure = current_measure.measure;
    let operator = current_measure.operator;

    let previews_height = 0;
    let previews_top = 0;
    let father_rect = father.getBoundingClientRect();
    if(previews_rect){
        previews_height = previews_rect[ABSOLUTE_POSITION_HEIGHT];
        previews_top = previews_rect[ABSOLUTE_POSITION_TOP]

        if(father !== document.body){
            previews_top-=father_rect[ABSOLUTE_POSITION_TOP];
        }
    }

    if(current_measure.last){
        element.style[ABSOLUTE_POSITION_TOP] = previews_top +ABSOLUTE_POSITION_PX;
        return;
    }

    let pixel_value = absolute_position_convert_pixel_value(
        value,
        measure,
        ABSOLUTE_POSITION_TOP,
        father_rect,
        browser_width,
        browser_height
    );

    //get the width of the brother
    if(operator === ABSOLUTE_POSITION_OPERATOR_PLUS ){
        pixel_value += previews_top + previews_height;
    }

    if(operator === ABSOLUTE_POSITION_OPERATOR_MIN){
        let current_size = element.getBoundingClientRect();
        pixel_value = pixel_value - (previews_top -current_size[ABSOLUTE_POSITION_HEIGHT]);
        pixel_value = Math.abs(pixel_value);

    }


    element.style[ABSOLUTE_POSITION_TOP] = pixel_value + ABSOLUTE_POSITION_PX ;

}

/**
 * @param {HTMLElement} element
 * @param {AbsolutePositionDimension} current_measure
 * @param {HTMLElement} father
 * @param {DOMRect} previews_rect
 * @param {number} browser_width
 * @param {number} browser_height
 *
 * */
function  absolute_position_generate_left_measures(
    element,
    current_measure,
    father,
    previews_rect,
    browser_width,
    browser_height){



    let value  =current_measure.value;
    let measure = current_measure.measure;
    let operator = current_measure.operator;

    let previews_width = 0;
    let previews_left = 0;
    let father_rect = father.getBoundingClientRect();


    if(previews_rect){
        previews_width = previews_rect[ABSOLUTE_POSITION_WIDTH];
        previews_left = previews_rect[ABSOLUTE_POSITION_LEFT];

        if(father !== document.body){
            previews_left-=father_rect[ABSOLUTE_POSITION_LEFT];
        }

    }
    if(current_measure.last){

        element.style[ABSOLUTE_POSITION_LEFT] = previews_left +ABSOLUTE_POSITION_PX;
        return;
    }

    let pixel_value = absolute_position_convert_pixel_value(
        value,
        measure,
        ABSOLUTE_POSITION_LEFT,
        father_rect,
        browser_width,
        browser_height
    );

    //get the width of the brother
    if(operator === ABSOLUTE_POSITION_OPERATOR_PLUS ){
        pixel_value += previews_left + previews_width;
    }

    if(operator === ABSOLUTE_POSITION_OPERATOR_MIN){
        let current_size = element.getBoundingClientRect();
        pixel_value = pixel_value - (previews_left -current_size[ABSOLUTE_POSITION_WIDTH]);
        pixel_value = Math.abs(pixel_value);

    }

    element.style[ABSOLUTE_POSITION_LEFT] = pixel_value + ABSOLUTE_POSITION_PX ;

}




function absolute_position_processElements() {
        let elementosRefer = document.querySelectorAll(ABSOLUTE_POSITION_QUERY_SELECTOR);
        elementosRefer.forEach(element => {


                let attribute = element.getAttribute(ABSOLUTE_POSITION_ATTRIBUTE);
                attribute = Absolute_position_replace_macros(attribute);


                let browser_width = window.innerWidth;
                let browser_height = window.innerHeight;
        
                
                let measures  = absolute_position_parser(element,attribute);

                if(measures.length === 0){
                        return;
                }

                let total_previews = undefined;

                if(measures.some(m => m.mod)){
                      total_previews = absolute_position_count_previews(element);
                }

                let closest = absolute_position_find_closest_measure(
                    measures,
                    browser_width,
                    browser_height,
                    total_previews
                );

                let father = absolute_position_find_father(element);
                let father_rect = father.getBoundingClientRect();
                let dimensions = closest.dimensions;
                let previews_element = absolute_position_find_previews_element(element);

                /**@type {DOMRect}*/
                let previews_rect = undefined;
                if(previews_element){
                        previews_rect = previews_element.getBoundingClientRect();
                }
                element.style.position = ABSOLUTE_POSITION_ABSOLUTE;

                absolute_position_generate_height_measures(
                    element,
                    dimensions[ABSOLUTE_POSITION_HEIGHT],
                    father_rect,
                    previews_rect,
                    browser_width,
                    browser_height
                );

                absolute_position_generate_width_measures(
                    element,
                    dimensions[ABSOLUTE_POSITION_WIDTH],
                    father_rect,
                    previews_rect,
                    browser_width,
                    browser_height
                );


                absolute_position_generate_left_measures(
                    element,
                    dimensions[ABSOLUTE_POSITION_LEFT],
                    father,
                    previews_rect,
                    browser_width,
                    browser_height
                );

                absolute_position_generate_top_measures(
                    element,
                    dimensions[ABSOLUTE_POSITION_TOP],
                    father,
                    previews_rect,
                    browser_width,
                    browser_height
                );



        });

}


function  absolute_position_start(){
        absolute_position_processElements();
        //set an  listener for change dimensions

        window.addEventListener(ABSOLUTE_POSITION_RESIZE, absolute_position_processElements);
        const observer = new MutationObserver(absolute_position_processElements);
        const config = { childList: true, subtree: true };
        observer.observe(document, config);

}

//add an document listener for window laod 
window.addEventListener(ABSOLUTE_POSITION_DOM_LOAD,absolute_position_start);
