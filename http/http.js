const http = require('http');
const url = require('url');
const queryString = require('querystring');
const fs = require('fs');
const router = require('./router');

// const readFileFilm = fs.readFileSync('./films.json').toString()

const isExistingRoute = (methodUsed, url) => router[methodUsed].routes.filter(route => route.nameRoute === url);

// const readFileIfExists = (path) => {
//     if(fs.access(`./${path}.json`)){
//         return fs.readFileSync(`./${path}.json`).toString()
//     }else{
//         return "sa marche pas frère"
//     }
// }

// console.log("FILMS RESPONSE : ", readFileFilm)

const server = http.createServer(function(request, response){
    let urlWithParams
    response.writeHead(200, {'content-type' : 'application/json'})
    if(request.url.match(/\/[\w]+(\?[\w&=]+)/i) !== null){
        urlWithParams = request.url.split('?');
    }
    const url = typeof urlWithParams !== "undefined" ? urlWithParams[0] : request.url;
    console.log("urlWithParams : ",urlWithParams)
    const urlExist = isExistingRoute(request.method, url);
    if(urlExist.length > 0){
        const urlParams = typeof urlWithParams !== "undefined" ? urlWithParams[1]: null;
        urlExist[0][url](request, response, urlParams);
    }else{
        response.end(JSON.stringify({code: 404, message: 'NOT FOUND'}));
    }
});

server.listen(8080, () => {
    console.log('server started...');
})