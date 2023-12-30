

function processarElementos() {
        let elementosRefer = document.querySelectorAll('[stantosDummont]');


        elementosRefer.forEach(elemento => {
                let attribute = elemento.getAttribute('stantosDummont');
                let browser_width = window.innerWidth;
                let browser_height = window.innerHeight;
                let parsed  = SantosDummont_parser(attribute,browser_width,browser_height);
                console.log(parsed);
                const irmaoMaisNovo = elemento.nextElementSibling;
                if (irmaoMaisNovo) {
                        irmaoMaisNovo.classList.add('alguma-classe');
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