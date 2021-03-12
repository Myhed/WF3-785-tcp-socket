const chalk =  require('chalk');
const {sendMessageUser, detectCommand, filterCommandUsedByUser} =  require('./functionSocket')
const command  = {
    privateMessage: {
        name:'privateMessage',
        cmd: '/r',
        regex: /^\/r ([A-Z]+[a-zA-Z0-9]{4,}) ([\W\w]+)/,
        execCommand: (usersName, allUsers, detailsCommand, currentUser) => {
            const [cmdString, nameUser, message] = detailsCommand;
            const indexOfNameUserTarget = usersName.indexOf(nameUser);
            const indexOfNameUserSender = allUsers.indexOf(currentUser);
            const nameUserSender = usersName[indexOfNameUserSender];
            const userTarget = allUsers[indexOfNameUserTarget];
            userTarget.write(chalk.magentaBright(`\n\r${nameUserSender} send you private message: ${message}\n\r`))
            userTarget.write('ecrivez un message: ');
            currentUser.write('ecrivez un message: ')
        }
    },

    kickUser: {
        name: 'kickUser',
        cmd: '/kick',
        regex: /^\/kick ([A-Z]+[a-zA-Z0-9]{4,})/,
        execCommand: (usersName, allUsers, detailsCommand, currentUser) => {
            const [cmdString, nameUser] = detailsCommand;
            const indexOfNameUserTarget = usersName.indexOf(nameUser);
            if(nameUser === usersName[allUsers.indexOf(currentUser)]){
                currentUser.write(chalk.red("\n\ryou should kick someone else \n\r"));
            }else{
                const userTarget = allUsers[indexOfNameUserTarget];
                console.log('indexOfNameUserTarget: ', indexOfNameUserTarget);
                currentUser.write('ecrivez un message: ')
                userTarget.emit('end');
            }
        }
    }

}

function execCommandUser(data, currentUser, nameUsers, allUsers, usersConnected){
    let commandUser;
    let detailsCommand;
    if(commandUser = detectCommand(data)){
        nameCommandUsed = filterCommandUsedByUser(commandUser, command);
        if(typeof nameCommandUsed !== "undefined"){
            detailsCommand = data.match(command[nameCommandUsed].regex);
            if(detailsCommand !== null){
                command[nameCommandUsed].execCommand(nameUsers, allUsers, detailsCommand, currentUser);
            }else{
                currentUser.write(chalk.redBright('incomplete command... \n\r'));
            }
        }else{
            currentUser.write(chalk.redBright('Command not found :(\n\r'));
        }
    }else{
        sendMessageUser(usersConnected, data);
        currentUser.write('ecrivez un message: ');
    }
}

module.exports = {
    command,
    execCommandUser,
}