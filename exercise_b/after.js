
/**
 * @typedef character
 * @property {string} slug
 */



/** 
 * @typedef House
 * @property {string} slug
 * @property {} member 
*/




const https = require('https')
const { mainModule } = require('process')
const URL_PREFIX = `https://game-of-thrones-quotes.herokuapp.com/v1`


/**
 * @param {string} url
 * @returns {*} 
 */
async function getHttpJson(url){
    return new Promise(resolve => {
        https.get(url, res => {
            let jsonStr =''
            res.setEncoding('utf-8')
            res.on('data', (data)=> {
                jsonStr += data
            })
            res.on('end', () => {
                try{
                    const parsed = JSON.parse(jsonStr)
                    resolve(parsed)
                }catch{
                    new Error("server response error")
                }
                
            })
        } )
    })
    
}

async function getHouses(){
    return getHttpJson(`${URL_PREFIX}/houses`)
} 



async function getQuote(characterSlug){
    const character = await getHttpJson(`${URL_PREFIX}/character/${characterSlug}`)
    return sanitizeQuote(character[0].quotes.join(' '))
} 

// async function getQuote(characterSlug){
//     return getHttpJson(`${URL_PREFIX}/character/${characterSlug}`)
// } 




// /** @typedef {house[]}  */
// async function getHouses(){
//     return new Promise(resolve => {
//         https.get(`${URL_PREFIX}/houses`, res => {
//             let jsonStr =''
//             res.setEncoding('utf-8')
//             res.on('data', (data)=> {
//                 jsonStr += data
//             })
//             res.on('end', () => {
//                 resolve(JSON.parse(jsonStr))
//             })
//         } )
//     })
// }


/**
 * @param {string} slug
 * @returns {Promise<String>}
 */

// async function getMerged(characterSlug){
//     return new Promise(resovle => {
//         https.get(`${URL_PREFIX}/character/${characterSlug}`, res => {
//             let jsonStr =''
//             res.setEncoding('utf-8')
//             res.on('data', (data)=> {
//                 jsonStr += data
//             })
//             res.on('end', () => {
//                 const json = JSON.parse(jsonStr)
             
//                 const mergedQuotes = json[0].quotes
//                     .join(' ')
//                     .replace(/[^a-zA-Z0-9 ]/g, '')
                
//                 resovle(mergedQuotes)

//             })    

//         })
//     })
// }


function sanitizeQuote(quote){
    return quote.replace(/[^a-zA-Z0-9., ]/g, '')
}


async function getSentimAPIResult(quote){
    return new Promise((resolve, reject)=> {
        const body =  JSON.stringify({
            text: quote
        })
        
        const postReq = https.request( {
            hostname: 'sentim-api.herokuapp.com',
            method: 'POST',
            path: '/api/v1/',
            headers: {
              Accept: 'application/json; encoding=utf-8',
              'Content-Type': 'application/json; encoding=utf-8',
              'Content-Length': body.length,
            },
        }, 
        (res) => {
    
            let jsonStr =''
            res.setEncoding('utf-8')
            res.on('data', (data)=> {
                    jsonStr += data
                })
            res.on('end', () => {
                try{
                    resolve(JSON.parse(jsonStr))
                }catch{
                    reject("data error")
                }
            })
            
            
        })
    
        postReq.write(body);

    })
    const body =  JSON.stringify({
        text: quote
    })
  
     
        
}



function sum(numbers){
    return numbers.reduce((memo, curr) => memo+curr, 0)
}


async function getData(){
    const houses = await getHouses()
    const characters = await Promise.all(
        houses
          .map((house) =>
            house.members.map((member) =>
              getQuote(member.slug).then((quote) => ({
                house: house.slug,
                charater: member.slug,
                quote,
              }))
            )
          )
          .flat()

      )
    
    const characterWithPor = await Promise.all(characters.map(async characters => {
        const results = await getSentimAPIResult(characters.quote)
        return({
            ...characters,
            polarity : results.result.polarity, 
        })
    }))


    //const houseSlugs = house.map(house => house.slug)
    const characterByHouse= {}
    characterWithPor.forEach(character => {
        characterByHouse[character.house] = characterByHouse[character.house] || []
        characterByHouse[character.house].push(character)
    })



    const houseSlugs = Object.keys(characterByHouse)    
    const resulthouse = houseSlugs.map(houseSlugs=> {
        const charactersMan = characterByHouse[houseSlugs]
        if(!charactersMan){
            return undefined
        }
        const sumPolarity = sum(charactersMan.map(character=> character.polarity))
        const average = sumPolarity /charactersMan.length
        return  [  houseSlugs , average]
    }).sort((a,b) => a[1] -b[1])
    
    console.log(resulthouse)

    

}









getData()