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
function convert_aspect_ratio(width,height){
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
