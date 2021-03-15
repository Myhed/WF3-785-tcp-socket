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