const http = require('http');
const queryString = require('querystring');
const {promises} = require('fs');
const os = require('os');

const inMemoryDB = [];

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

const server = http.createServer( async function(request, response){
    response.setHeader('content-type', 'application/json');
    response.setHeader('Access-Control-Allow-Origin', '*');
    switch(request.method){
        case 'GET':
            const homeDirectory = os.platform() === 'win32' ? 'C:\\users': '/home' // On récupère l'os sur lequel l'utilisateur est
            if(request.url === '/home'){ // On vérifie si l'url est égale à /home
                try{ // On test qu'il n'y ai pas d'erreur lors du lancement de chaque promesse sinon on part dans le catch si il y'en a
                    const files = await promises.readdir(homeDirectory); // On lit le répertoir dans sa globalité
                    console.log('files', files);
                    const openDirs = await promises.opendir(homeDirectory); // On tente d'ouvrir le répertoire /home ou C:\\users si vous êtes sur windows
                    const dirRead = files.map(__ => openDirs.read()); // On lance une boucle de lecture pour chaque fichier existant dans /home
                    const dirs = await Promise.all(dirRead); // On le stoque dans un promise.all pour faire des lecture parallèle aux serveur
                    // une fois dirs est un tableau contenant tous notre contenu (dossier/fichier)
                    const referenceFilesAndFolders = dirs.reduce((acc, item, index) => { // ici on crée un objet pour référencer le type de donnée reçus donc soit un dossier soit un fichier
                        if(typeof acc['0'] === "undefined"){
                            acc['0'] = {}; // On crée l'objet dans notre accumulateur si on ne l'a pas déjà fait
                        }
                        const isFileOrFolder = item.isFile() ? 'files': 'folders';
                        console.log('isFilesOrFolder: ', isFileOrFolder);
                        if(typeof acc['0'][isFileOrFolder] !== "undefined"){ // on test si isFileOrFolder est un objet et qu'il existe bien
                            acc['0'][isFileOrFolder].push({name: item.name}); // autrement dis on push dessus puisqu'il existe déjà
                        }else{
                            acc['0'][isFileOrFolder] = [{name: item.name}]; // sinon on le crée
                        }
                        return acc;
                    }, {});
                    openDirs.close(); // On ferme le curseur lorsque la lecture est finis
                    // console.log('object',object);
                    response.end(JSON.stringify(referenceFilesAndFolders)); // On envoi les datas à notre client pour qu'il puisse les affichers
                }catch(e){
                    console.log(e);
                }

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