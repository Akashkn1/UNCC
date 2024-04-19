
const {Buffer} = require('buffer');

const memoryContainer = Buffer.alloc(4);



memoryContainer[0]=1111;

console.log(memoryContainer[0]);
console.log(memoryContainer);