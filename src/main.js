

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
                element.style.posit
                if(!old_brother){
                        element.style.left = dimensions.left.pixel_value + 'px';
                        element.style.top = dimensions.top.pixel_value + 'px';
                        element.style.width = dimensions.width.pixel_value + 'px';
                        element.style.height = dimensions.height.pixel_value + 'px';
                        return;
                }


                
                if (old_brother) {
                        console.log(closest);
                        element.style.left = dimensions.left.pixel_value + 'px';
                        element.style.top = dimensions.top.pixel_value + 'px';
                        element.style.width = dimensions.width.pixel_value + 'px';
                        element.style.height = dimensions.height.pixel_value + 'px';
                
                }

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