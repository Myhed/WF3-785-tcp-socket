const { scryptSync, createCipheriv, createDecipheriv } = require('crypto');
module.exports = {
    /**
    * @name hashData  
    * @Description hash some data with @CipherIv function
    * @param {password String, algorithm String, dataToHash} 
    */

    hashData: (password, algorithm, dataToHash) => {
        const key = scryptSync(password, 'salt', 24);
        const iv = Buffer.alloc(16, 0);

        const cipher = createCipheriv(algorithm, key, iv);

        let encrypted = '';
        cipher.on('readable', () => {
            let chunk = cipher.read();
            while(chunk !== null){
                encrypted += chunk.toString('hex');
                chunk = cipher.read();
            }
        });

        cipher.on('end', () => {
            console.log('writed on buffer finish');
            console.log('encrypted: ', encrypted);
        });

        cipher.write(dataToHash, error => {
            console.log('error :', error);
        });

        cipher.end();
        return encrypted;
    },
     /**
    * @name reverseHash  
    * @Description reverse hash and read data with @DecipherIv function
    * @param {password String, algorithm String hashToReverse String} 
    */
   
    reverseHash: (password, algorithm, hashToReverse) => {
        const key = scryptSync(password, 'salt', 24);
        const iv = Buffer.alloc(16, 0);
        let dataWithNoHash = '';
        const decipher = createDecipheriv(algorithm, key, iv);

        decipher.on('readable', () => {
            let chunk = decipher.read();
            while(chunk !== null){
                dataWithNoHash += chunk.toString();
                chunk = decipher.read();
            }
        });

        decipher.on('end', () => {
            console.log('reverseHash data: ', dataWithNoHash);
        })

        decipher.write(hashToReverse, 'hex');
        decipher.end();
        return dataWithNoHash;
    }
}