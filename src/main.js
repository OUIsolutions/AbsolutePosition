

function processarElementos() {
        let elementosRefer = document.querySelectorAll('[stantosDummont]');

        elementosRefer.forEach(elemento => {
                let attribute = elemento.getAttribute('stantosDummont');
                let browser_width = window.innerWidth;
                let browser_height = window.innerHeight;
        
                
                let measures  = SantosDummont_parser(attribute,browser_width,browser_height);
                let closest = SantosDummont_find_closest_measure(measures,browser_width,browser_height);
                
                const old_brother = elemento.nextElementSibling;
                if (old_brother) {
                       
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