const http = require('http');
const url = require('url');
const queryString = require('querystring');
const fs = require('fs');
const router = require('./router');

// const readFileFilm = fs.readFileSync('./films.json').toString()

const isExistingRoute = (methodUsed, url) => router[methodUsed].routes.filter(route => route.nameRoute === url);// On filtre la route qui correspond à la requête 

const server = http.createServer(function(request, response){
    let urlWithParams
    response.writeHead(200, {'content-type' : 'application/json'})
    if(request.url.match(/\/[\w]+(\?[\w&=]+)/i) !== null){// si l'url est séparable par '?'
        urlWithParams = request.url.split('?'); // On sépare l'url en deux: ce qu'il y a avant '?' et les paramètres qu'il y a après
    }
    const url = typeof urlWithParams !== "undefined" ? urlWithParams[0] : request.url;// On récupère l'url
    console.log("urlWithParams : ",urlWithParams)
    const urlExist = isExistingRoute(request.method, url);// On crée un tableau des routes qui correspondent à la requête
    if(urlExist.length > 0){// S'il y a une route dans le tableau
        const urlParams = typeof urlWithParams !== "undefined" ? urlWithParams[1]: null;//On récupère les paramètre s'il y en a, sinon null
        urlExist[0][url](request, response, urlParams);
    }else{
        response.end(JSON.stringify({code: 404, message: 'NOT FOUND'}));
    }
});

server.listen(8080, () => {
    console.log('server started...');
})