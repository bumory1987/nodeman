
const {spawn} = require('child_process');
const fs = require('fs')


const opts = {
    stdio: [process.stdin, process.stdout, process.stderr, 'pipe', 'pipe']
};
let child = spawn('node', ['./src/child.js'] , opts);
child.stdio[3].write('first message\n', 'utf-8', ()=>{
    child.stdio[3].write('second message\n', 'utf-8', ()=>{})
})

child.stdio[4].pipe(process.stdout)

// process.stdin.pipe(child.stdin);



// async function dowork(){
//     const returnVal = await fs.promises.readFile("./src/Games.txt", 'utf-8')
//     console.log(returnVal)
//     process.stdout.pipe(child[0].on('data', (returnVal) => {
//         console.log(returnVal)
//     }))

// }


// dowork()






// mySource.pipe(child.stdio[3]);

// //read data
// child.stdio[3].pipe(myHandler);