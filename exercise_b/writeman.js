// @ts-check

const fs = require('fs')

const ws = fs.createWriteStream('local/big-file')



const NUM_BLOCKS= 500 

const NUM_BLOCKSPerCharacter = {
    a: 0, 
    b: 0
}


for(let i = 0 ; i < NUM_BLOCKS ; i +=1){
    const blockLength = Math.floor(800+Math.random()*200)
    const character = i % 2 === 0 ? 'a' : 'b'
    ws.write(character.repeat(1024*blockLength))
    NUM_BLOCKSPerCharacter[character] +=1
}

