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
/**
 * @param {HTMLElement} element
 * @return {number}
 * */
function absolute_position_count_previews(element){
    let total = 0;
    let previews = absolute_position_find_previews_element(element);
    while (previews){
        total+=1;
        previews = absolute_position_find_previews_element(previews);
    }
    return  total;
}