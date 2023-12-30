/**
 * @typedef {object} SantosDummontAspectRatio
 * @property {number} width
 * @property {number} height
 * @property {boolean} is_horizontal
 * @property {boolean} is_vertical
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
 * @param {number} elemenet1
 * @param {number} element2
 * @return {number}
 */
function SantosDummont_returns_diference(elemenet1,element2){
   if(elemenet1 >= element2) {
       return elemenet1 - element2;
   }
   return  element2 - elemenet1;
}

/**
 * @param {Array<SantosDummontProp>} measures
 * @param {number}browser_width
 * @param {number}browser_height
 * @return {SantosDummontProp}
 * **/
function SantosDummont_find_closest_measure(measures, browser_width, browser_height) {
    let closest = undefined;
    let closest_dif = undefined;
    let browser_ratio = SantosDummont_convert_aspect_ratio(browser_width, browser_height);
    for(let measure of measures){
        let measure_ratio = SantosDummont_convert_aspect_ratio(measure.horizontal_ratio, measure.vertical_ratio);
        let width_dif = SantosDummont_returns_diference(measure_ratio.width,browser_ratio.width);
        let heighest_dif = SantosDummont_returns_diference(measure_ratio.height,browser_ratio.height);
        let dif = width_dif+heighest_dif;
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
