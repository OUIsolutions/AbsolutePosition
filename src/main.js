


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
 * @param {HTMLElement} element
 * @param {AbsolutePositionDimensions} measures
 * @param {string} name
 * @param {HTMLElement} previews_element
 * @param {number} browser_width
 * @param {number} browser_height
 *
 * */
function  absolute_position_generate_measures(element, measures, name, previews_element, browser_width, browser_height){
        /**@type {SantosDummontDimension}*/
        let current_measure = measures[name];
        let value  =current_measure.value;
        let measure = current_measure.measure;
        let operator = current_measure.operator;

        let previews_size = 0;
        let previews_margin = 0;
        if(previews_element){
                let previews_rect = previews_element.getBoundingClientRect();

                if(ABSOLUTE_POSITION_HORIZONTAL_DIRECTIONS.includes(name)){
                        previews_size = previews_rect[ABSOLUTE_POSITION_WIDTH];
                }
                if(ABSOLUTE_POSITION_VERTICAL_DIRECTIONS.includes(name)){
                        previews_size = previews_rect[ABSOLUTE_POSITION_HEIGHT];
                }


                if(name === ABSOLUTE_POSITION_LEFT){
                        previews_margin = previews_rect[ABSOLUTE_POSITION_LEFT];
                }

                if(name === ABSOLUTE_POSITION_TOP){
                        previews_margin = previews_rect[ABSOLUTE_POSITION_TOP];
                }


        }


        let father = element.parentElement;
        let father_rect = father.getBoundingClientRect();


        let pixel_value = value;
        if(ABSOLUTE_POSITION_PERCENTS.includes(measure)){
                let formatted_name   = absolute_position_convert_percent(measure,name);
                let father_size = father_rect[formatted_name];
                let fraction =(father_size/100);
                pixel_value = (fraction * pixel_value);
        }

        if(measure === ABSOLUTE_POSITION_VH){
                pixel_value = (pixel_value/100)*browser_height;
        }

        if(measure === ABSOLUTE_POSITION_VW){
                pixel_value = (pixel_value/100)*browser_width;
        }
        /*
        let father_value = 0;
        if(name === ABSOLUTE_POSITION_LEFT || name === ABSOLUTE_POSITION_TOP){
                father_value = father_rect[name];
        }*/


        //get the width of the brother
        if(operator === ABSOLUTE_POSITION_OPERATOR_PLUS ){
                pixel_value += (previews_size + previews_margin);
        }

        if(operator === ABSOLUTE_POSITION_OPERATOR_MIN){
           let current_size = element.getBoundingClientRect();


           if(name === ABSOLUTE_POSITION_LEFT){
               pixel_value =  previews_margin  - current_size[ABSOLUTE_POSITION_WIDTH] - pixel_value;
           }
           if(name === ABSOLUTE_POSITION_TOP){
               pixel_value =  previews_margin  - current_size[ABSOLUTE_POSITION_TOP] - pixel_value;
           }


        }

        element.style[name] = pixel_value + ABSOLUTE_POSITION_PX ;



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


                let dimensions = closest.dimensions;
                let previews_element = element.previousElementSibling;
                element.style.position = ABSOLUTE_POSITION_ABSOLUTE;

                absolute_position_generate_measures(element,dimensions,ABSOLUTE_POSITION_WIDTH,previews_element,browser_width,browser_height);
                absolute_position_generate_measures(element,dimensions,ABSOLUTE_POSITION_HEIGHT,previews_element,browser_width,browser_height);
                absolute_position_generate_measures(element, dimensions,ABSOLUTE_POSITION_LEFT,previews_element,browser_width,browser_height);
                absolute_position_generate_measures(element,dimensions,ABSOLUTE_POSITION_TOP,previews_element,browser_width,browser_height);

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