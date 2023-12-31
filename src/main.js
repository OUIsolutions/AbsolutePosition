
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
function absolute_position_processElements() {
        let elementosRefer = document.querySelectorAll('[stantosDummont]');

        elementosRefer.forEach(element => {


                let attribute = element.getAttribute('stantosDummont');
                let browser_width = window.innerWidth;
                let browser_height = window.innerHeight;
        
                
                let measures  = absolute_position_parser(attribute);
                let closest = absolute_position_find_closest_measure(measures,browser_width,browser_height);

                let dimensions = closest.dimensions;
                let previews_element = element.previousElementSibling;
                element.style.position = 'absolute';

                absolute_position_generate_measures(element, dimensions,"left",previews_element,browser_width,browser_height);
                absolute_position_generate_measures(element,dimensions,"top",previews_element,browser_width,browser_height);
                absolute_position_generate_measures(element,dimensions,"width",previews_element,browser_width,browser_height);
                absolute_position_generate_measures(element,dimensions,"height",previews_element,browser_width,browser_height);

        });

}


function  absolute_position_start(){
        absolute_position_processElements();
        function handleMutation() {
                absolute_position_processElements();
        }
        //set an  listener for change dimensions
        window.addEventListener('resize', function(){
                absolute_position_processElements();
        });
        
        const observer = new MutationObserver(handleMutation);
        const config = { childList: true, subtree: true };
        observer.observe(document.body, config);
}

window.onload = absolute_position_start;