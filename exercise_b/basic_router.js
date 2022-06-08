// @ts-check

//Without FrameWork try to create backend 

/**
 * 
 */





const { resolveSoa } = require('dns')
const http  = require('http')


/**
 * @typedef Post
 * @property {string} id
 * @property {string} title
 * @property {string} content
 */


/**@type {Post[]} */
const posts = [
    {
        id: "my_first_post",
        title: "My fisrt project",
        content: "Hello!"
    },
    {
        id: "my_second_post",
        title: "My second project",
        content: "GOOD!"
    }
] 

const sever = http.createServer((req, res)=>{
    const POST_ID_REGEX = /^\/posts\/([a-zA-Z0-9-_]+)$/
    const postIdResult = req.url && POST_ID_REGEX.exec(req.url) || undefined

    
    if(req.url === '/posts' && req.method == 'GET'){
        const resultpos = posts.map(post => 
              ({
                  id : post.id,
                  title: post.title,
                  content: post.content
              })
            
        )
        
        // let resultCheck = [...resultpos, { id : 'helloman', title: 'onMyWay'}]

        const otherResult = {
            posts: resultpos,
            totalCount : posts.length
        }

        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json; charset=utf-8')
        res.end(JSON.stringify(otherResult))
    }else if(postIdResult && req.method === 'GET'){
        const postId = postIdResult[1]
        console.log(`post id: ${postId}`)
        const findResult = posts.find(_post => _post.id == postId)
        
        if(findResult){
            res.statusCode = 200
            res.setHeader('Content-Type', 'application/json; charset=utf-8')
            res.end(JSON.stringify(findResult))
        }else{
            res.statusCode = 404
            res.end("Post not found")
        }
        


    }else if(req.url === '/posts' && req.method == 'POST'){ 
        req.setEncoding('utf-8')
        req.on('data', (data) => {
            const reqBody = JSON.parse(data)
            //console.log(reqBody)
            posts.push({
                id :reqBody.title.toLowerCase().replace(/\s/g, '_') ,
                ...reqBody
            })
        })

        res.statusCode = 200
        res.end('Creating post')

    }else{
        res.statusCode =404
        res.end("not found")
    }

})

const PORT = 4000 

sever.listen(PORT, ()=>{
    console.log(`The server is listening at port: ${PORT}`)
})


/**
 * Post
 * 
 * GET /posts
 * GET /posts/:id
 * POST /posts
 * 
 * 
 */









