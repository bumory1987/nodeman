//console.log(process.argv)

const os = require('os')
const fs = require('fs')


const {spawn} = require('child_process');
const ls = spawn('ls', ['-lh', '/usr'])








const fileman = fs.promises.readFile('./src/Games.txt', 'utf-8')

async function doWork(){
    const value = await fileman
    console.log(fileman)
} 

 


doWork()

// console.log(
//     ['arch', os.arch()],
//     ['platform', os.platform()],
//     ['cups', os.cpus()]
// 