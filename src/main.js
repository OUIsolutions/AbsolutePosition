
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
 *@param {DOMRect} father_rect
 *@param {number} browser_width
 *@param {number} browser_height
 **/
function absolute_position_convert_pixel_value(pixel_value,measure,father_rect,browser_width,browser_height){

        if(ABSOLUTE_POSITION_PERCENTS.includes(measure)){
                let formatted_name   = absolute_position_convert_percent(measure,ABSOLUTE_POSITION_LEFT);
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

        let pixel_value = absolute_position_convert_pixel_value(value,measure,father_rect,browser_width,browser_height);

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
function  absolute_position_generate_heght_measures(
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


        let pixel_value = absolute_position_convert_pixel_value(value,measure,father_rect,browser_width,browser_height);

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
 * @param {DOMRect} father_rect
 * @param {DOMRect} previews_rect
 * @param {number} browser_width
 * @param {number} browser_height
 *
 * */
function  absolute_position_generate_left_measures(
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
        let previews_left = 0;

        if(previews_rect){
                previews_width = previews_rect[ABSOLUTE_POSITION_WIDTH];
                previews_left = previews_rect[ABSOLUTE_POSITION_LEFT] - father_rect[ABSOLUTE_POSITION_LEFT];
        }

        let pixel_value = absolute_position_convert_pixel_value(value,measure,father_rect,browser_width,browser_height);

        //get the width of the brother
        if(operator === ABSOLUTE_POSITION_OPERATOR_PLUS ){
                pixel_value += previews_left + previews_width;
        }

        if(operator === ABSOLUTE_POSITION_OPERATOR_MIN){
           let current_size = element.getBoundingClientRect();
           pixel_value =  previews_left  - current_size[ABSOLUTE_POSITION_WIDTH] - pixel_value;
        }

        element.style[ABSOLUTE_POSITION_LEFT] = pixel_value + ABSOLUTE_POSITION_PX ;

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
function  absolute_position_generate_top_measures(
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
        let previews_top = 0;

        if(previews_rect){
                previews_height = previews_rect[ABSOLUTE_POSITION_HEIGHT];
                previews_top = previews_rect[ABSOLUTE_POSITION_TOP] - father_rect[ABSOLUTE_POSITION_TOP];
        }


        let pixel_value = absolute_position_convert_pixel_value(value,measure,father_rect,browser_width,browser_height);

        //get the width of the brother
        if(operator === ABSOLUTE_POSITION_OPERATOR_PLUS ){
                pixel_value += previews_top + previews_height;
        }

        if(operator === ABSOLUTE_POSITION_OPERATOR_MIN){
                let current_size = element.getBoundingClientRect();
                pixel_value =  previews_top  - current_size[ABSOLUTE_POSITION_HEIGHT] - pixel_value;
        }

        element.style[ABSOLUTE_POSITION_TOP] = pixel_value + ABSOLUTE_POSITION_PX ;

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

                let closest = absolute_position_find_closest_measure(measures,browser_width,browser_height);

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

                absolute_position_generate_heght_measures(
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
                    father_rect,
                    previews_rect,
                    browser_width,
                    browser_height
                );

                absolute_position_generate_top_measures(
                    element,
                    dimensions[ABSOLUTE_POSITION_TOP],
                    father_rect,
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