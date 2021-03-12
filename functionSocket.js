const chalk = require('chalk');

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

function detectCommand(data){
    const regexCommand = /^(\/[a-zA-Z0-9]+)/g
    if(data.match(regexCommand)){
        return data.match(regexCommand)[0];
    }
    return false;
}

function filterCommandUsedByUser(commandUser, commandApp){
    return Object.keys(commandApp).filter(nameCommand => commandApp[nameCommand].cmd === commandUser)[0];
}

function pseudoUserIsDefined(currentUser, allUsers, usersConnected, nameUsers, data){
    const regexPseudo = /^([A-Z]+[a-zA-Z0-9]{4,})/g
    let pseudo;
    if(nameUsers[allUsers.indexOf(currentUser)].trim() === ''){
        pseudo = data.match(regexPseudo);
        if(pseudo !== null){
            nameUsers[allUsers.indexOf(currentUser)] = pseudo[0];
            connectionUser(usersConnected, pseudo[0]);
            currentUser.write('ecrivez un message: ');
        }else{
            currentUser.write("Veuillez saisir un pseudo: ");
        }
        return false;
    }else{
        return true;
    }
}

module.exports = {
    allUsers,
    nameUsers,
    connectionUser,
    connectedUser,
    sendMessageUser,
    detectCommand,
    filterCommandUsedByUser,
    pseudoUserIsDefined
}