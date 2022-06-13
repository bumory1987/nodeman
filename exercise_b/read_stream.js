
const {log} = console 

const fs = require('fs')

const rs = fs.createReadStream('local/big-file', {encoding : 'utf-8'})


let chunck = 0

/** @type {Object.<string, number>} */
const NUM_BLOCKSPerCharacter = {
    a :0 , 
    b :0 
}


/** @type { string | undefined} */
let preCharacter


rs.on('data', (data)=>{
    if(typeof data !== 'string'){
        return 
    }

    chunck +=1
    for (let i = 0 ; i < data.length ; i += 1){
        if(data[i] !== preCharacter){
            const newCharacter =  data[i]
            
            if(!newCharacter){
                continue
            }
        
            preCharacter = newCharacter
            NUM_BLOCKSPerCharacter[newCharacter] +=1 
        }
    }

    // log('Event: data', data[0])
})




rs.on('end', ()=>{
    log('Event: count', NUM_BLOCKSPerCharacter)
    log('Event: blockcount', chunck)
    log('Event: end')
})