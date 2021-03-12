const {createServer} = require('net');
const chalk = require('chalk');
const server = createServer();
const {execCommandUser} = require('./command');
const {
    allUsers,
    nameUsers,
    sendMessageUser,
    pseudoUserIsDefined} = require('./functionSocket');

server.on('connection', function(socket) {
    // init variable
    let usersConnected;
    socket.write('====== Bienvenu sur le Tchat TCP ======\n\n\r');
    allUsers.push(socket);
    nameUsers.push('');
    socket.write("Veuillez saisir un pseudo: ");
    usersConnected = allUsers.filter(user => user !== socket);
    socket.on('data', data => {
        data = data.toString();
        usersConnected = allUsers.filter(user => user !== socket);
        if(pseudoUserIsDefined(socket, allUsers, usersConnected ,nameUsers, data)){
            execCommandUser(data, socket, nameUsers, allUsers, usersConnected);
        }
    });

    socket.on('end', () => {
        const indexUserToDelete = allUsers.indexOf(socket);
        console.log('indexUserToDelete:',indexUserToDelete)
        allUsers.splice(indexUserToDelete, 1);
        nameUsers.splice(indexUserToDelete, 1);
        socket.destroy();
        socket.end();
        console.log('end:', allUsers.length)
        console.log('end: ', nameUsers);
    });
})

server.listen(1337, function(){
    console.log('server started...');
})