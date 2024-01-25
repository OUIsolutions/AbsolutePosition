/**
 * @param {string} measure
 * @param {string} name
 * @return {string}
 * */
function  absolute_position_convert_percent(measure,name){
    if(measure === ABSOLUTE_POSITION_WIDTH_PERCENT){
        return  ABSOLUTE_POSITION_WIDTH;
    }
    if(measure ===ABSOLUTE_POSITION_HEIGHT_PERCENT){
        return  ABSOLUTE_POSITION_HEIGHT;
    }
    if(ABSOLUTE_POSITION_HORIZONTAL_DIRECTIONS.includes(name)){
        return  ABSOLUTE_POSITION_WIDTH;
    }

    if(ABSOLUTE_POSITION_VERTICAL_DIRECTIONS.includes(name)){
        return  ABSOLUTE_POSITION_HEIGHT;
    }

}

/**
 *@param {number} pixel_value
 *@param {string} measure
 *@param {string} name
 *@param {DOMRect} father_rect
 *@param {number} browser_width
 *@param {number} browser_height
 **/
function absolute_position_convert_pixel_value(pixel_value,measure,name,father_rect,browser_width,browser_height){

    if(ABSOLUTE_POSITION_PERCENTS.includes(measure)){
        let formatted_name   = absolute_position_convert_percent(measure,name);
        let father_size = father_rect[formatted_name];
        let fraction =(father_size/100);
        return fraction * pixel_value;
    }

    if(measure === ABSOLUTE_POSITION_VH){
        return (pixel_value/100)*browser_height;
    }

    if(measure === ABSOLUTE_POSITION_VW){
        return (pixel_value/100)*browser_width;
    }
    return  pixel_value;
}