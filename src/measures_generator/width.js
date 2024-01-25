


/**
 * @param {HTMLElement} element
 * @param {AbsolutePositionDimension} current_measure
 * @param {DOMRect} father_rect
 * @param {DOMRect} previews_rect
 * @param {number} browser_width
 * @param {number} browser_height
 *
 * */
function  absolute_position_generate_width_measures(
    element,
    current_measure,
    father_rect,
    previews_rect,
    browser_width,
    browser_height){

    let value  =current_measure.value;
    let measure = current_measure.measure;
    let operator = current_measure.operator;

    let previews_width = 0;

    if(previews_rect){
        previews_width = previews_rect[ABSOLUTE_POSITION_WIDTH];
    }

    if(current_measure.same){
        element.style[ABSOLUTE_POSITION_WIDTH] = previews_width +ABSOLUTE_POSITION_PX;
        return;
    }


    let pixel_value = absolute_position_convert_pixel_value(
        value,
        measure,
        ABSOLUTE_POSITION_WIDTH,
        father_rect,
        browser_width,
        browser_height
    );

    //get the width of the brother
    if(operator === ABSOLUTE_POSITION_OPERATOR_PLUS ){
        pixel_value +=  previews_width;
    }

    if(operator === ABSOLUTE_POSITION_OPERATOR_MIN){
        pixel_value-=previews_width;
    }

    element.style[ABSOLUTE_POSITION_WIDTH] = pixel_value + ABSOLUTE_POSITION_PX ;

}