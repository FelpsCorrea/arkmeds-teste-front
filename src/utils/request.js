import {jsonValidator} from '../utils/structural.js';

/** Função responsável por fazer um request para a API*/
export async function newRequest(config={}, content={}){

    try{
        var client = new XMLHttpRequest();

        var objectResponse = null;

        client.onreadystatechange = function() {
            if (client.readyState === 4) {
                let jsonText = client.responseText;

                objectResponse = jsonValidator(jsonText);
            }
        }


        var completeUrl = "http://127.0.0.1:8000" + config.url;

        if(config.method == 'POST'){
            client.open(config.method, completeUrl, false);
            client.setRequestHeader("Content-Type", "application/json");
            client.send(JSON.stringify(content))
        }

        else if(config.method == 'GET'){
            if(content){
                var concatChar = '?';
                Object.getOwnPropertyNames(content).forEach((value, index) => {
                    completeUrl += concatChar + value + '=' + content[value];
                    if(concatChar === '?'){
                        concatChar = '&';
                    }
                });
            }
            client.open(config.method, completeUrl, false);
            client.send()
        }

        /*JSON Parse exception + Validação reposta com sucesso*/
        if(objectResponse == false){
            return {
                "success" : false,
                "message" : "Ocorreu algum Erro"
            };    
        }

        return {
            "success" : true,
            "response" : objectResponse
        };

    } catch(e){
        return {
            "success": false,
            "message": "Ocorreu algum erro!"
        }
    }
}