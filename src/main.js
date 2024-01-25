


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