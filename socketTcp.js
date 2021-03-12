const {createServer} = require('net');
const os = require('os');
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
    let message = '';
    let usersConnected;
    socket.write('====== Bienvenu sur le Tchat TCP ======\n\n\r');
    allUsers.push(socket);
    socket.write('ecrivez un message: ');
    usersConnected = allUsers.filter(user => user !== socket);
    connectionUser(usersConnected);
    connectedUser(usersConnected, socket);
    socket.on('data', data => {
        usersConnected = allUsers.filter(user => user !== socket);
        if(os.platform() === 'win32'){
          if(data.compare(suppr) === 0){
            const messageArray = message.split('');
            console.log('message suppr:', messageArray);
            messageArray.splice(messageArray.length-1, 1);
            message = messageArray.join('');
            socket.write(`\n\r${message}`);
          }
         if(data.compare(enter) === 0){
            console.log("enter is true");
            console.log('message on Windows: ', message);
            sendMessageUser(usersConnected, message);
            message = '';
            socket.write('\n\recrivez un message: ');
         }else if(data.compare(suppr) !== 0){
            message += data.toString();
         }
        } else {
            sendMessageUser(usersConnected, data.toString());
            socket.write('ecrivez un message: ');
        }
    });
    
})

server.listen(1337, function(){
    console.log('server started...');
})