const {createServer} = require('net');
const chalk = require('chalk');
const server = createServer();
const allUsers = [];
const nameUsers = [];

function connectionUser(users, nameUser){
    users.forEach(user => {
        user.write(chalk.green(`\n\r${nameUser} is now connected\n\r`));
        if(nameUsers[allUsers.indexOf(user)].length === 0){
            user.write("Veuillez saisir un pseudo: ");
        }else{
            user.write('ecrivez un message: ');
        }
    })
}

function connectedUser(users, currentUser){
    users.forEach(__ => {
        currentUser.write(chalk.green('\n\r name user is connected\n\r'));
    })
}

function sendMessageUser(users, message){
    users.forEach(user => {
        user.write(`\n\r ${nameUsers[allUsers.indexOf(user)]} : ${message}\n\r`);
        user.write('ecrivez un message: ');
    })
}

server.on('connection', function(socket) {
    let usersConnected;
    let pseudo;
    socket.write('====== Bienvenu sur le Tchat TCP ======\n\n\r');
    allUsers.push(socket);
    nameUsers.push('');
    socket.write("Veuillez saisir un pseudo: ");
    usersConnected = allUsers.filter(user => user !== socket);
    socket.on('data', data => {
        data = data.toString();
        usersConnected = allUsers.filter(user => user !== socket);
        const regexPseudo = /^([A-Z]+[a-zA-Z0-9]{4,})/g
        // console.log(nameUsers[allUsers.length-1].trim() === '');
        if(nameUsers[allUsers.indexOf(socket)].trim() === ''){
            pseudo = data.match(regexPseudo);
            if(pseudo !== null){
                nameUsers[allUsers.indexOf(socket)] = pseudo[0];
                connectionUser(usersConnected, pseudo[0]);
                socket.write('ecrivez un message: ');
            }else{
                socket.write("Veuillez saisir un pseudo: ");
            }
        }else{
            sendMessageUser(usersConnected, data);
            socket.write('ecrivez un message: ');
        }
    });
})

server.listen(1337, function(){
    console.log('server started...');
})