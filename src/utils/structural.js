 /* Função que valida um JSON e retorna o Objeto */
export function jsonValidator(jsonString){

    var jsonObject;
    
    try {
        jsonObject = JSON.parse(jsonString);
    } catch (e) {
        return false;
    }

    return jsonObject;
}

/** Verfica se uma variável é uma Função */
export function isFunction(obj){
    return !!(obj && obj.constructor && obj.call && obj.apply);
}