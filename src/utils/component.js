import {isFunction} from "./structural.js";

/** Bind em todos os métodos do componente */
export function bindAllMethods(component){

    const prototype = Object.getPrototypeOf(component);
    const properties = Object.getOwnPropertyNames(prototype);

    for(var property of properties){
        if(isFunction(component[property])){
            component[property] = component[property].bind(component);
        }
    }
}