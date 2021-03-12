const os = require('os');

console.log("arch: ",os.arch());
console.log('cpus: ', os.cpus());
console.log(os.hostname());
console.log(os.homedir());
console.log(os.networkInterfaces());
console.log(os.platform());
console.log(os.userInfo());
console.log(os.version());
console.log(os.getPriority());
console.log(os.freemem());
console.log(os.endianness());
console.log(os.loadavg());

