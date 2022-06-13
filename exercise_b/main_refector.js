const https = require('https')


const resultsByHouseSlugs = {} 

https.get(`https://game-of-thrones-quotes.herokuapp.com/v1/houses`, (res)=>{
    let jsonStr = ''
    res.setEncoding('utf-8')
    res.on('data', (data)=> {
        jsonStr += data
    })
    res.on('end', () => {
        const houses = JSON.parse(jsonStr)
        // console.log('houses', houses)

        let numMembersDone = 0
        let numTotalMembers = 0 
        houses.forEach( house => {
            numTotalMembers += house.members.length
        });

        houses.forEach(house => {
            const houseSlug = house.houseSlug
            const members = house.members

            members.forEach(member=> {
                const characterSlug = member.slug
                setTimeout(()=>{
                    https.get(`https://game-of-thrones-quotes.herokuapp.com/v1/character/${characterSlug}`,
                    (res) => {
                        let jsonStr = ''
                        res.setEncoding('utf-8')
                        res.on('data', (data)=> {
                            jsonStr += data
                        })
                        res.on('end', () => {
                            // console.log(jsonStr)
                            const json = JSON.parse(jsonStr)
                            const mergedQuotes = json[0].quotes
                                .join(' ')
                                .replace(/[^a-zA-Z0-9 ]/g, '')
                            
                            const body = JSON.stringify({
                                text : mergedQuotes,
                            })

                            console.log(body)
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
                                let jsonStr = ''
                                console.log(body, res.statusCode, res.statusMessage)
                                res.setEncoding('utf-8')
                                res.on('data', (data)=> {
                                    jsonStr += data
                                })
                                res.on('end', () => {
                                    console.log(jsonStr)
                                    const results = JSON.parse(jsonStr)
                                    resultsByHouseSlugs[houseSlug] = resultsByHouseSlugs[houseSlug] || [] 
                                    resultsByHouseSlugs[houseSlug].push({
                                        character: characterSlug,
                                        polarity: results.result.polarity
                                    })
                                    
                                numMembersDone +=1
                                if(numMembersDone == numTotalMembers){
                                    console.log('finished', resultsByHouseSlugs)
                                    const resultSlugs = Object.keys(resultsByHouseSlugs)         
                                    const finalResult = resultSlugs.map((slug) =>{
                                        let sum = 0 
                                        resultsByHouseSlugs[slug].forEach(
                                        (value => sum+= value.polarity))
                                        
                                        return {
                                            slug, 
                                            polarity: sum/resultsByHouseSlugs[slug].length
                                        }
                                
                                    }).sort((a,b)=> a.polarity - b.polarity)
                                
                                    console.log('sorted', finalResult)
                                }
    
            
    
                                })
                            })
                            
    
    
                            postReq.write(body)


                        })


                        
                    })
                }, Math.random() * 5000 )    

            })
        })
        
    })
})