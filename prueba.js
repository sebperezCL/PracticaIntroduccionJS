const fs = require('fs')

let data = fs.readFileSync('input.txt', 'utf-8').split('\r\n')

console.log(data)