const {createServer} = require('net');
const chalk = require('chalk');
const server = createServer();
const allUsers = [];
const nameUsers = [];

const suppr = Buffer.from([0x08]);
const enter = Buffer.from([0x0d, 0x0a]);

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
    let message = '';
    let usersConnected;
    let pseudo;
    socket.write('====== Bienvenu sur le Tchat TCP ======\n\n\r');
    allUsers.push(socket);
    nameUsers.push('');
    socket.write("Veuillez saisir un pseudo: ");
    usersConnected = allUsers.filter(user => user !== socket);
    socket.on('data', data => {
        usersConnected = allUsers.filter(user => user !== socket);
          if(data.compare(suppr) === 0){
            const messageArray = message.split('');
            console.log('message suppr:', messageArray);
            messageArray.splice(messageArray.length-1, 1);
            message = messageArray.join('');
            if(nameUsers[allUsers.indexOf(socket)].length === 0){
                socket.write(`\n\r Veuillez saisir un pseudo: ${message}`);
            }else{
                socket.write(`\n\r ecrivez un message ${message}`);
            }
          }
         if(data.compare(enter) === 0){
            console.log("enter is true");
            console.log('message on Windows: ', message);
            const regexPseudo = /^([A-Z]+[a-zA-Z0-9]{4,})/g
            if(nameUsers[allUsers.indexOf(socket)].trim() === ''){
                pseudo = message.match(regexPseudo);
                if(pseudo !== null){
                    nameUsers[allUsers.indexOf(socket)] = pseudo[0];
                    connectionUser(usersConnected, pseudo[0]);
                    socket.write('ecrivez un message: ');
                }else{
                    socket.write("Veuillez saisir un pseudo: ");
                }
            }else{
                sendMessageUser(usersConnected, message);
                socket.write('ecrivez un message: ');
            }
            message = '';
         }else if(data.compare(suppr) !== 0){
            message += data.toString();
         }
    });
})

server.listen(1337, function(){
    console.log('server started...');
})