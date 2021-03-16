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
    }
}

module.exports = router;