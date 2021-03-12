
/**
 * @Description how to use callback first level async
 * @param {bool} printOnConsole 
 * @param {string} name 
 * @param {function} callback 
 */
function hello(printOnConsole,name, callback){
    if(printOnConsole){
        callback('Hello ' + name);
    }
    callback(undefined)
};

hello(false,'Myhed', function(resultat){
    console.log(resultat);
});

/**
 * @Description how to use promise second level async
 * @param {bool} printOnConsole 
 * @param {string} name 
 */

 function hello2(printOnConsole, name){
     return new Promise(function(resolve, reject) {
        if(printOnConsole){
            resolve('hello ' + name)
        }
        reject(new Error('printOnConsole is false'));
     });
 }

 hello2(true, 'Myhed')
    .then(result => {
        console.log('result: ',result)
    })
    .catch(error => {
         console.log('error: ', error);
    });

/**
 * @Description how to use promise third level async 
 * @param {string} name 
 */

async function sayHello(name){
    if(name){
        return 'hello ' + name;
    }
    throw new Error('name cannot be undefined');
}
async function hello3(name){
    try {
        return await sayHello(name);
    }catch(error){
        console.log(error);
    }
}

hello3().then(result => {
    console.log('result async await: ', result);
})