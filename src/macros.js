
let absolute_position_macros = {

}

/**
 * @param {string} name
 * @param {string} value
 * */
function  APosition_define_macro(name,value){
    absolute_position_macros[name] = value;
}
/**
 * @param {string} attribute
 * @return {string}
 * */
function  Absolute_position_replace_macros(attribute){
    let result = attribute;
    for(let key in absolute_position_macros){
        let value = absolute_position_macros[key];
        result = attribute.replaceAll(key,value);
    }
    return  result;
}