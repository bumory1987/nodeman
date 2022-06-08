//@ts-check



const http = require('http')
const {routes} = require('./api')
 
 




 const server = http.createServer((req, res)=>{
    async function main(){
        const routeman = routes.find(_route => 
            req.url
            && req.method
            && _route.url.test(req.url) 
            && _route.method === req.method)
            
            
        if(!req.url || !routeman){
               res.statusCode= 404
               res.end('not found')
               return 
        }
       const regexResult = routeman.url.exec(req.url)
       if(!req.url || !routeman){
            res.statusCode= 404
            res.end('not found')
            return 
        }
       

       /**
        * @type { Object.<string, *> | undefined}*/
       const body= req.headers['content-type'] == 'application/json' && await new Promise((resolve, reject) => {
            req.setEncoding('utf-8')
            req.on('data', data => {
               try{
                resolve(JSON.parse(data))
                }catch{
                reject(new Error('not json form'))   
               }                     
            })
        } ) || undefined


       const fResult = await routeman.callback( regexResult,body )

       res.statusCode = fResult.statusCode
       if(typeof fResult.body === "string" ){
            res.end(fResult.body)
       }else{
            res.setHeader('Content-Type', 'application/json; charset=utf-8')
            res.end(JSON.stringify(fResult.body))
       }

    }
    
    main()
     

})


const PORT = 4000
server.listen(PORT, ()=>{
    console.log(`The server is listening at port: ${PORT}`)
})