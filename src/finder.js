/**
 * @typedef {object} SantosDummontAspectRatio
 * @property {number} width
 * @param {number} height
 * */
/**
 * @param {number} width
 * @param {height} height
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
    let closest_distance = Math.abs(browser_ratio.width - closest.horizontal_ratio) + Math.abs(browser_ratio.height - closest.vertical_ratio);
    
    for (let measure of measures) {
        let measure_ratio = SantosDummont_convert_aspect_ratio(measure.dimensions.width, measure.dimensions.height);
        let distance = Math.abs(browser_ratio.width - measure_ratio.width) + Math.abs(browser_ratio.height - measure_ratio.height);

        
        if (distance < closest_distance) {
            closest = measure;
            closest_distance = distance;
        }
    }
    
    return closest;
}