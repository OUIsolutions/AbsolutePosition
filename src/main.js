
/**
 * @param {HTMLElement} element
 * @param {SantosDummontDimensions} measures
 * @param {string} name
 * @param {HTMLElement} brother
 *
 * */
function  SantosDummont_add_brother_props(element,measures,name,brother){
        /**@type {SantosDummontDimension}*/
        let current_measure = measures[name];
        let pixel_value  =current_measure.pixel_value;
        let operator = current_measure.operator;
        if(!brother || !operator){
                element.style[name] = pixel_value + 'px';
                return;
        }
        
        if(operator === '+'){

        }

        element.style[name] = pixel_value + 'px';



}
function processarElementos() {
        let elementosRefer = document.querySelectorAll('[stantosDummont]');

        elementosRefer.forEach(element => {
                let attribute = element.getAttribute('stantosDummont');
                let browser_width = window.innerWidth;
                let browser_height = window.innerHeight;
        
                
                let measures  = SantosDummont_parser(attribute,browser_width,browser_height);
                let closest = SantosDummont_find_closest_measure(measures,browser_width,browser_height);
                let dimensions = closest.dimensions;
                const old_brother = element.nextElementSibling;
                SantosDummont_add_brother_props(element, dimensions,"left",old_brother);
                SantosDummont_add_brother_props(element,dimensions,"top",old_brother);
                SantosDummont_add_brother_props(element,dimensions,"width",old_brother);
                SantosDummont_add_brother_props(element,dimensions,"height",old_brother);

        });

}


function  start(){
        processarElementos();
        function handleMutation(mutations) {
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