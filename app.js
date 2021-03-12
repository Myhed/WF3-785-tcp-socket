
const { hashData, reverseHash } =  require('./cipher');

// Cipher and Decipher

const password = "toto";
const algorithm = 'aes-192-cbc';

const dataHashed = hashData(password, algorithm, 'some data to hash');

console.log('dataHashed: ',dataHashed);

const hashDataReversed = reverseHash(password, algorithm, dataHashed);

console.log('hashDataReversed: ', hashDataReversed);
