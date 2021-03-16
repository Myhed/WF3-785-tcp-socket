const fs = require('fs')
const querystring = require('querystring');
const { URLSearchParams } = require('url');
const filmsInMemory = []
const musiqueInMemory = []

function verifyDataTypeJson(data){
    const jsonParams = data.toString().substr(1, data.toString().length - 2).split(',');
    const validateParams = jsonParams.map(param => {
        console.log(param.trim());
        return param.trim().match(/^\"[\w]+\":\"[\w]+\"/ig)
    });
    if(validateParams.indexOf(null) !== -1){
        return false;
    }
    return true;
}
const router = {
    'GET': {
        routes: [
            {
                nameRoute: '/',
                '/': (request, response)   => {
                    response.writeHead(200, {
                        'content-type': 'text/plain'
                    })
                    response.end('home directory')
                }
            },
            {
                nameRoute: '/films',
                '/films': (request, response) => {
                    response.writeHead(200, {
                        'content-type': 'application/json'
                    })
                    response.end('films...');
                }
            }
        ]
    },
    'POST':{
        routes: [
            {
                nameRoute: '/films',
                '/films': (request, response) => {
                    response.writeHead(200, {
                        'content-type': 'application/json'
                    })
                    request.on('data', (data) => {
                        console.log(JSON.parse(data.toString()))
                        filmsInMemory.push(JSON.parse(data.toString()))
                        console.log("FILMS IN MEMORY : ", filmsInMemory)
                    })
                    
                    response.end('films...');
                }
            },
            {
                nameRoute: '/musique',
                '/musique': (request, response) => {
                    response.writeHead(200, {
                        'content-type': 'application/json'
                    })
                    request.on('data', (data)=>{
                        console.log(JSON.parse(data.toString()))
                        musiqueInMemory.push(JSON.parse(data.toString()))
                        console.log("MUSIQUE IN MEMORY : ", musiqueInMemory)
                    })
                    
                    response.end('musique...');
                }
            }
        ]
    },
    'PUT':{
        routes: [
            {
                nameRoute: '/films',
                '/films': (request, response, urlParams) => {
                    response.writeHead(200, {
                        'content-type': 'application/json'
                    })
                    const params = querystring.parse(urlParams);
                    // console.log('queryString parse: ',querytring.parse(new URL(request.url).search));
                    response.end('films...');
                }
            }
        ]
    },
    'DELETE':{
        routes: [
            {
                nameRoute: '/films',
                '/films': (request, response) => {
                    response.writeHead(200, {
                        'content-type': 'application/json'
                    })
                    response.end('films...');
                }
            }
        ]
    }
}

module.exports = router;