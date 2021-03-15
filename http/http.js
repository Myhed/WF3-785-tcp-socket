const http = require('http');
const url = require('url');
const queryString = require('querystring');
const homeResponse = {
    page: 'home'
}

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

const server = http.createServer(function(request, response){
    response.setHeader('content-type', 'application/json');
    switch(request.method){
        case 'GET':
            console.log(queryString.parse(request.url, null, null))
            if(request.url === '/'){
                response.writeHead(200);
                response.end(JSON.stringify(homeResponse));
            }
        break;
        case 'POST':
            if(request.url === '/'){
                request.on('data', data => {
                    if(request.headers['content-type'] === 'application/json'){
                        if(verifyDataTypeJson(data)){
                            response.writeHead(201);
                            response.end('resource created successfully')
                        }else{
                            response.end(JSON.stringify({code: 400, message: 'incorrecte format json'}))
                        }
                    }
                })
                // response.end(JSON.stringify(homeResponse));
            }
        break;
        case 'PUT':
            response.end('REQUEST PUT....');
        break;
        case 'DELETE':
            response.end('REQUEST DELETE....');
        break;
            // response.end('method not found only GET,DELETE,PUT,POST is a good request')
    }
});

server.listen(8080, () => {
    console.log('server started...');
})