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
 * @param {AbsolutePositionProp} measure
 * @param {AbsolutePositionAspectRatio} browser_ratio
 * @param {number} total_previews
 * */
function absolute_position_create_assignature(measure,browser_ratio,total_previews){
    let measure_ratio = absolute_position_convert_aspect_ratio(measure.horizontal_ratio, measure.vertical_ratio);
    let width_dif = absolute_position_returns_difference(measure_ratio.width,browser_ratio.width);
    let highest_dif = absolute_position_returns_difference(measure_ratio.height,browser_ratio.height);
    let dif = width_dif+highest_dif;



    if(total_previews !==  undefined &&measure.mod){
        let rest = total_previews % measure.mod;
        return `${dif}.${rest}`
    }
    return `${dif}.01`
}

/**
 * @param {Array<AbsolutePositionProp>} measures
 * @param {number}browser_width
 * @param {number}browser_height
 * @param {number || undefined} total_previews
 * @return {AbsolutePositionProp}
 * **/
function absolute_position_find_closest_measure(
    measures,
    browser_width,
    browser_height,
    total_previews
) {



    let browser_ratio = absolute_position_convert_aspect_ratio(browser_width, browser_height);
    measures.forEach(v => v.assignature = absolute_position_create_assignature(v,browser_ratio,total_previews))


    let ordered = measures.sort((a,b)=>{


         if(a.assignature < b.assignature){
             return -1;
         }
         if(a.assignature > b.assignature){
             return  1;
         }
         return 0;
    })

    return  ordered[0];

}

