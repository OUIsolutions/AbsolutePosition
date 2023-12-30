/**
 * @typedef {object} SantosDummontAspectRatio
 * @property {number} width
 * @param {number} height
 * @param {boolean} is_horizontal
 * @param {boolean} is_vertical
 * */
/**
 * @param {number} width
 * @param {number} height
 * @return {SantosDummontAspectRatio}
 * */
function SantosDummont_convert_aspect_ratio(width,height){
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
 * @param {Array<SantosDummontProp>} measures
 * @param {number}browser_width
 * @param {number}browser_height
 * @return {SantosDummontProp}
 * **/
function SantosDummont_find_closest_measure(measures, browser_width, browser_height) {
    let closest = measures[0];
    let browser_ratio = SantosDummont_convert_aspect_ratio(browser_width, browser_height);
    for(let measure of measures){
        let measure_ratio = SantosDummont_convert_aspect_ratio(measure.horizontal_ratio, measure.vertical_ratio);
        if(browser_ratio.is_horizontal === measure_ratio.is_horizontal){
            closest = measure;
        }


    }
    return closest;
}