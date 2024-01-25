

/**
 * @param {HTMLElement} element
 * @param {AbsolutePositionDimension} current_measure
 * @param {DOMRect} father_rect
 * @param {DOMRect} previews_rect
 * @param {number} browser_width
 * @param {number} browser_height
 *
 * */
function  absolute_position_generate_height_measures(
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

    if(previews_rect){
        previews_height = previews_rect[ABSOLUTE_POSITION_HEIGHT];
    }


    let pixel_value = absolute_position_convert_pixel_value(
        value,
        measure,
        ABSOLUTE_POSITION_HEIGHT,
        father_rect,
        browser_width,
        browser_height
    );

    //get the width of the brother
    if(operator === ABSOLUTE_POSITION_OPERATOR_PLUS ){
        pixel_value += previews_height ;
    }

    if(operator === ABSOLUTE_POSITION_OPERATOR_MIN){
        pixel_value-=previews_height;
    }

    element.style[ABSOLUTE_POSITION_HEIGHT] = pixel_value + ABSOLUTE_POSITION_PX ;

}