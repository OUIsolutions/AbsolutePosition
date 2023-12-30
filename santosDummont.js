/**
 * @typedef {object} SantosDummontAspectRatio
 * @property {number} width
 * @property {number} height
 * @property {boolean} is_horizontal
 * @property {boolean} is_vertical
 * */
/**
 * @param {number} width
 * @param {number} height
 * @return {SantosDummontAspectRatio}
 * */
function SantosDummont_convert_aspect_ratio(width,height){
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
 * @param {number} elemenet1
 * @param {number} element2
 * @return {number}
 */
function SantosDummont_returns_diference(elemenet1,element2){
   if(elemenet1 >= element2) {
       return elemenet1 - element2;
   }
   return  element2 - elemenet1;
}

/**
 * @param {Array<SantosDummontProp>} measures
 * @param {number}browser_width
 * @param {number}browser_height
 * @return {SantosDummontProp}
 * **/
function SantosDummont_find_closest_measure(measures, browser_width, browser_height) {
    let closest = undefined;
    let closest_dif = undefined;
    let browser_ratio = SantosDummont_convert_aspect_ratio(browser_width, browser_height);
    for(let measure of measures){
        let measure_ratio = SantosDummont_convert_aspect_ratio(measure.horizontal_ratio, measure.vertical_ratio);
        let width_dif = SantosDummont_returns_diference(measure_ratio.width,browser_ratio.width);
        let heighest_dif = SantosDummont_returns_diference(measure_ratio.height,browser_ratio.height);
        let dif = width_dif+heighest_dif;
        if(closest_dif=== undefined){
            closest = measure;
            closest_dif = dif;
        }

        if(dif <= closest_dif){
            closest = measure;
            closest_dif = dif;
        }

    }

    return closest;
}

/**
 * @typedef SantosDummontDimension
 * @property {number} value
 * @property {string} measure
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
 * @param {number} horizontal_ratio
 * @param {number} vertical_ratio
 * @return {SantosDummontProp}
 * */
function find_or_create_dimension(element,horizontal_ratio,vertical_ratio){
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
function SantosDummont_generate_divided_number(value){

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
 * @param {Array<SantosDummontProp>} final_array
 * @param {string} current

 * */
function  SantosDummont_generate_measure(final_array,current){
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
        left:SantosDummont_generate_divided_number(divided_numbers[0]),
        top:SantosDummont_generate_divided_number(divided_numbers[1]),
        width:SantosDummont_generate_divided_number(divided_numbers[2]),
        height:SantosDummont_generate_divided_number(divided_numbers[3])
    }
}


/**
 * @param {string} value
 * @return {Array<SantosDummontProp>}
 * */
function  SantosDummont_parser(value){
        /**@type {Array<SantosDummontProp>}*/
        let final_array = [];
        let formatted_value = value.replaceAll(" ","");
        let elements = formatted_value.split('$');
        elements = elements.filter(v => v !== '');
        elements.forEach(current=>{
            SantosDummont_generate_measure(final_array,current)
        })
        return final_array;
}

/**
 * @param {HTMLElement} element
 * @param {SantosDummontDimensions} measures
 * @param {string} name
 * @param {HTMLElement} previews_element
 * @param {number} browser_width
 * @param {number} browser_height
 *
 * */
function  SantosDummont_add_brother_props(element,measures,name,previews_element,browser_width,browser_height){
        /**@type {SantosDummontDimension}*/
        let current_measure = measures[name];
        let value  =current_measure.value;
        let measure = current_measure.measure;
        let operator = current_measure.operator;


        if(!previews_element || !operator){
                element.style[name] = value + measure;
                return;
        }

        let previews_rect = previews_element.getBoundingClientRect();
        /**@type {number}*/
        let previews_value = previews_rect[name];


        let pixel_value = value;
        if(measure === '%'){
                console.log(pixel_value)
                let father = element.parentElement;
                let father_rect = father.getBoundingClientRect();
                let father_value = undefined;

                if(name ==='left' || name === 'width'){
                        father_value = father_rect.width;
                }

                if(name === 'top' || name === 'height'){
                        father_value = father_rect.height;
                }

                let fraction =(father_value/100);
                pixel_value = (fraction * pixel_value);

        }



        if(measure === 'vh'){
                pixel_value = (pixel_value/100)*browser_height;
        }
        if(measure === 'vw'){
                pixel_value = (pixel_value/100)*browser_width;
        }

        //get the width of the brother
        if(operator === '+'){
                pixel_value = pixel_value+ previews_value;
        }
        if(operator === '-'){
                pixel_value = previews_value - pixel_value;
        }


        element.style[name] = pixel_value + 'px' ;



}
function processarElementos() {
        let elementosRefer = document.querySelectorAll('[stantosDummont]');

        elementosRefer.forEach(element => {


                let attribute = element.getAttribute('stantosDummont');
                let browser_width = window.innerWidth;
                let browser_height = window.innerHeight;
        
                
                let measures  = SantosDummont_parser(attribute);
                let closest = SantosDummont_find_closest_measure(measures,browser_width,browser_height);

                let dimensions = closest.dimensions;
                let previews_element = element.previousElementSibling;
                element.style.position = 'absolute';

                SantosDummont_add_brother_props(element, dimensions,"left",previews_element,browser_width,browser_height);
                SantosDummont_add_brother_props(element,dimensions,"top",previews_element,browser_width,browser_height);
                SantosDummont_add_brother_props(element,dimensions,"width",previews_element,browser_width,browser_height);
                SantosDummont_add_brother_props(element,dimensions,"height",previews_element,browser_width,browser_height);

        });

}


function  start(){
        processarElementos();
        function handleMutation() {
                processarElementos();
        }
        //set an  listener for change dimensions
        window.addEventListener('resize', function(){
                processarElementos();
        });
        
        const observer = new MutationObserver(handleMutation);
        const config = { childList: true, subtree: true };
        observer.observe(document.body, config);
}

window.onload = start;
