
/**
 * @param {HTMLElement} element
 * @param {SantosDummontDimensions} measures
 * @param {string} name
 * @param {HTMLElement} previews_element
 *
 * */
function  SantosDummont_add_brother_props(element,measures,name,previews_element){
        /**@type {SantosDummontDimension}*/
        let current_measure = measures[name];
        let pixel_value  =current_measure.pixel_value;
        let operator = current_measure.operator;
        if(!previews_element || !operator){
                element.style[name] = pixel_value + 'px';
                return;
        }
        //get the width of the brother

        let previews_rect = previews_element.getBoundingClientRect();
        let previews_value = previews_rect[name];

        if(operator === '+'){
                pixel_value = previews_value + pixel_value;
        }
        if(operator === '-'){
                pixel_value = previews_value - pixel_value;
        }

        element.style[name] = pixel_value + 'px';



}
function processarElementos() {
        let elementosRefer = document.querySelectorAll('[stantosDummont]');

        elementosRefer.forEach(element => {


                let attribute = element.getAttribute('stantosDummont');
                let browser_width = window.innerWidth;
                let browser_height = window.innerHeight;
        
                
                let measures  = SantosDummont_parser(attribute);
                let closest = SantosDummont_find_closest_measure(measures,browser_width,browser_height);
                console.log(measures);

                let dimensions = closest.dimensions;
                let previews_element = element.previousElementSibling;
                element.style.position = 'absolute';

                SantosDummont_add_brother_props(element, dimensions,"left",previews_element);
                SantosDummont_add_brother_props(element,dimensions,"top",previews_element);
                SantosDummont_add_brother_props(element,dimensions,"width",previews_element);
                SantosDummont_add_brother_props(element,dimensions,"height",previews_element);

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