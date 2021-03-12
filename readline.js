const readline = require('readline');

const answer = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

answer.question('votre age ?', (response) => {
    console.log(response);
    answer.close();
});