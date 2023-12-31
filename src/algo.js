/**
 * @typedef {object} AbsolutePositionAspectRatio
 * @property {number} width
 * @property {number} height
 * @property {boolean} is_horizontal
 * @property {boolean} is_vertical
 * */
/**
 * @param {number} width
 * @param {number} height
 * @return {AbsolutePositionAspectRatio}
 * */
function absolute_position_convert_aspect_ratio(width, height){
    //convert 1920x1080 to 16x9
    let aspect_ratio = width/height;
    let width_ratio = 1;
    let height_ratio = 1;
    if(aspect_ratio > 1){
        width_ratio = aspect_ratio;
    }
    if(aspect_ratio < 1){
        height_ratio = 1/aspect_ratio;
    }
    return {
        is_horizontal:aspect_ratio >= 1,
        is_vertical:aspect_ratio < 1,
        width:width_ratio,
        height:height_ratio
    };
}

/**
 * @param {number} element1
 * @param {number} element2
 * @return {number}
 */
function absolute_position_returns_difference(element1, element2){
   if(element1 >= element2) {
       return element1 - element2;
   }
   return  element2 - element1;
}

/**
 * @param {Array<AbsolutePositionProp>} measures
 * @param {number}browser_width
 * @param {number}browser_height
 * @return {AbsolutePositionProp}
 * **/
function absolute_position_find_closest_measure(measures, browser_width, browser_height) {
    let closest = undefined;
    let closest_dif = undefined;
    let browser_ratio = absolute_position_convert_aspect_ratio(browser_width, browser_height);
    for(let measure of measures){
        let measure_ratio = absolute_position_convert_aspect_ratio(measure.horizontal_ratio, measure.vertical_ratio);
        let width_dif = absolute_position_returns_difference(measure_ratio.width,browser_ratio.width);
        let highest_dif = absolute_position_returns_difference(measure_ratio.height,browser_ratio.height);
        let dif = width_dif+highest_dif;
        if(closest_dif=== undefined){
            closest = measure;
            closest_dif = dif;
        }

        if(dif <= closest_dif){
            closest = measure;
            closest_dif = dif;
        }

    }

    return closest;
}
