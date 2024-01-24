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

/**
 * @param {HTMLElement} element
 * */
function absolute_position_find_father(element){
    /**@type {HTMLElement}*/
    let father = element.parentElement;

    while(father){

        if(father === document.body){
            break;
        }

        if(father.hasAttribute(ABSOLUTE_POSITION_ATTRIBUTE)){
            if(father.style.display !== 'none'){
                break;
            }
        }


        father = father.parentElement;

    }

    return father;
}

/**
 * @param {HTMLElement} element
 * */
function  absolute_position_retrive_element_or_child_if_is_aposition(element){

    if(element.style.display === 'none'){
        return undefined;
    }

    if(element.hasAttribute(ABSOLUTE_POSITION_ATTRIBUTE)){
        return  element;
    }

    for(let i = 0; i < element.children.length;i++){
      let current =  element.children[i];

      let result =absolute_position_retrive_element_or_child_if_is_aposition(current);
      if(result){
          return  result;
      }
    }
}

/**
 * @param {HTMLElement} element
 * @return {HTMLElement || undefined}
 * */
function absolute_position_find_previews_element(element){
    /**@type {HTMLElement}*/
    let previews =element;
    let father = absolute_position_find_father(element);
    while(previews){

        if(previews === document.body){
            return  undefined;
        }

        if(previews === father){
            return  undefined;
        }


        let possible_previews = previews.previousElementSibling;

        if(!possible_previews){
            previews = previews.parentElement;
            continue;
        }

        previews = possible_previews;
        let possible = absolute_position_retrive_element_or_child_if_is_aposition(
            previews
        );
        if(possible){
            return  possible;
        }

    }

}