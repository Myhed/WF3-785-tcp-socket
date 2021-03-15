const {mkdir, stat, writeFile, write, rmdir, rm, open, access, constants, readdir, opendir} = require('fs');
const path = require('path');

console.log(__dirname);
console.log(__filename);

const nameFolder = 'toto/titi.txt';

console.log(path.join(__dirname, nameFolder));
// console.log(path.resolve('', nameFolder));
// mkdir(path.join(__dirname, nameFolder), {recursive: true}, function(error){
//     console.log(error);
// });

// stat(path.join(__dirname, nameFolder), false, function(error, stats){
//     if(error) return error
//     console.log(stats);
// });

// writeFile(path.join(__dirname, nameFolder), 'toto', {
//     mode: 0o6
// }, function(error) {
//     console.log(error);
// });


// rm(path.join(__dirname, nameFolder), function(err) {
//     console.log(err);
// })

// rmdir(path.join(__dirname, 'toto'), function(err) {
//     console.log(err)
// })

open(path.join(__dirname),'r', function(error) {
    if(error){
        console.log('file or folder doesnt exist')
        return
    }
    writeFile(path.join(__dirname, nameFolder), 'toto', function(error) {
        console.log(error);
    });
});

readdir(path.join(__dirname), {}, function(error, files){
    opendir(path.join(__dirname), async function(error, dir) {
        const fileTest = files.map(file => {
            const read = dir.read();
            return read;
        });
        Promise.all(fileTest)
        .then(result => {
            result.forEach(dirent => {
                console.log(dirent.isFile());
            });
        });
    });
});

module.exports = {readdir, open}
