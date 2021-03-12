const { spawn } = require('child_process');

const cmd = spawn('ls', ['/'])

cmd.stdout.on('data', data => {
    console.log('data: ', data.toString());
});

cmd.stderr.on('data', err => {
    console.log(err.toString());
});

cmd.on('close', () => {
    console.log('process exit successfully');
});
