const {createServer} = require('net');
const chalk = require('chalk');

const suppr = Buffer.from([0x08]);
const enter = Buffer.from([0x0d, 0x0a]);
const server = createServer();
const allUsers = [];

function connectionUser(users){
    users.forEach(user => {
        user.write(chalk.green('\n\rone user is now connected\n\r'));
        user.write('ecrivez un message: ');
    })
}

function connectedUser(users, currentUser){
    users.forEach(__ => {
        currentUser.write(chalk.green('\n\r name user is connected\n\r'));
        currentUser.write('ecrivez un message: ');
    })
}

function sendMessageUser(users, message){
    console.log('message sended: ', message);
    console.log(users.length);
    users.forEach(user => {
        user.write(`\n\rone use send you message: ${message}\n\r`);
        user.write('ecrivez un message: ');
    })
}

server.on('connection', function(socket) {
    let usersConnected;
    socket.write('====== Bienvenu sur le Tchat TCP ======\n\n\r');
    allUsers.push(socket);
    socket.write('ecrivez un message: ');
    usersConnected = allUsers.filter(user => user !== socket);
    connectionUser(usersConnected);
    connectedUser(usersConnected, socket);
    socket.on('data', data => {
        usersConnected = allUsers.filter(user => user !== socket);
        sendMessageUser(usersConnected, data.toString());
        socket.write('ecrivez un message: ');
    });
    
})

server.listen(1337, function(){
    console.log('server started...');
})