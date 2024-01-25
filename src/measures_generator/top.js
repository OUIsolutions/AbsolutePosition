



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