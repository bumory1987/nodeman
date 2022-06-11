
const fs = require('fs')



// console.log(__dirname)
// const getText = fs.promises.readFile("./Games.txt", 'utf-8').then((item)=> {
//     //console.log(item)
//     return item
// })


// const receiver = { 
//     item : undefined
// } 
    

const doWork=new Promise((resolve, reject) => {
    const fianl = fs.promises.readFile("./Games.txt", 'utf-8')
    resolve(fianl)
} )



// async function doMan (){
//   const getman = await doWork
//   console.log(getman)
// }


// async function dododo () {
//     const hello =fs.promises.readFile("./Games.txt", 'utf-8')
//     console.log(hello)

// }




// dododo ()