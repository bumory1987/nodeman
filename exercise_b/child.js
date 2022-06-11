const fs = require('fs')


let readable = fs.createReadStream(null, {fd: 3});

readable.pipe(process.stdout)
fs.createWriteStream(null, {fd: 4}).write('sending message back\n')
// console.log(readable)

// console.log('start')


// process.stdin.setEncoding('utf-8')
// process.stdin.on('data', (data)=>{
//     console.log(data);
// })

// process.stderr.on('uncaughtException', err => {
//     process.stderr.write(`Caught Exception. Err: ${err}`)
//     process.exit(1)
//   })



