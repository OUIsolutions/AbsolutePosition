
/**
 * @param {HTMLElement} element
 * @param {AbsolutePositionDimension} current_measure
 * @param {HTMLElement} father
 * @param {DOMRect} previews_rect
 * @param {number} browser_width
 * @param {number} browser_height
 *
 * */
function  absolute_position_generate_left_measures(
    element,
    current_measure,
    father,
    previews_rect,
    browser_width,
    browser_height){



    let value  =current_measure.value;
    let measure = current_measure.measure;
    let operator = current_measure.operator;

    let previews_width = 0;
    let previews_left = 0;
    let father_rect = father.getBoundingClientRect();


    if(previews_rect){
        previews_width = previews_rect[ABSOLUTE_POSITION_WIDTH];
        previews_left = previews_rect[ABSOLUTE_POSITION_LEFT];

        if(father !== document.body){
            previews_left-=father_rect[ABSOLUTE_POSITION_LEFT];
        }

    }
    if(current_measure.last){

        element.style[ABSOLUTE_POSITION_LEFT] = previews_left +ABSOLUTE_POSITION_PX;
        return;
    }

    let pixel_value = absolute_position_convert_pixel_value(
        value,
        measure,
        ABSOLUTE_POSITION_LEFT,
        father_rect,
        browser_width,
        browser_height
    );

    //get the width of the brother
    if(operator === ABSOLUTE_POSITION_OPERATOR_PLUS ){
        pixel_value += previews_left + previews_width;
    }

    if(operator === ABSOLUTE_POSITION_OPERATOR_MIN){
        let current_size = element.getBoundingClientRect();
        pixel_value = pixel_value - (previews_left -current_size[ABSOLUTE_POSITION_WIDTH]);
        pixel_value = Math.abs(pixel_value);

    }

    element.style[ABSOLUTE_POSITION_LEFT] = pixel_value + ABSOLUTE_POSITION_PX ;

}
