/**
 * @typedef ABsolutePositionMacro
 * @property {string} name
 * @property {string} value
 * */
/**@type {Array<ABsolutePositionMacro>}*/
let absolute_position_macros = [

]

/**
 * @param {string} name
 * @param {string} value
 * */
function  APosition_define_macro(name,value){

    if(absolute_position_macros.find(macro => macro.name === name)){
        return;
    }

    absolute_position_macros.push({name:name,value:value});

    // Sort the list in descending order of length of 'name'
    absolute_position_macros.sort((a, b) => b.name.length - a.name.length);
}

/**
 * @param {string} attribute
 * @return {string}
 * */
function  Absolute_position_replace_macros(attribute){
    let result = attribute;

    absolute_position_macros.forEach(macro =>{
        result = result.replaceAll(macro.name,macro.value);
    })


    return  result;
}