// @ts-check
// new Promise((resovle, reject) => {
//   try{
//       resovle()
//   }catch{
//       reject()
//   }  
// })

/**
 * @typedef APIResponse
 * @property {number} statusCode
 * @property {string | object } body
 */

/**
 * @typedef Route
 * @property {RegExp} url
 * @property {string} method
 * @property {(matches: string[], body: Object | undefined ) => Promise<APIResponse>} callback
 */



/**
 * @typedef Post
 * @property {string} id
 * @property {string} title
 * @property {string} content
 */




// /**@type {Post[]} */
// const posts = [
//     {
//         id: "my_first_post",
//         title: "My fisrt project",
//         content: "Hello!"
//     },
//     {
//         id: "my_second_post",
//         title: "My second project",
//         content: "GOOD!"
//     }
// ]



const fs = require('fs')

const FILESAVE = 'database.json'

/** @returns {Promise<Post[]>} */
async function getPosts(){
    const jsonman = await fs.promises.readFile('database.json', 'utf-8')
    return JSON.parse(jsonman).posts
}


/** @param {Post[]} posts */
async function savePosts(posts){
    const content = {
        posts,

    }
  
    return fs.promises.writeFile(FILESAVE, JSON.stringify(content) , 'utf-8')
}





/** @type {Route[]} */
const routes = [
    {
        url: /^\/posts$/,
        method: "GET", 
        callback : async (matches) => {
            return {
                statusCode: 200, 
                body: await getPosts()
            }
        } 
    },
    {
        url: /^\/posts\/([a-zA-Z0-9-_]+)$/,
        method: "GET", 
        callback : async (matches) => {

            const postId = matches[1]
            if(!postId){
                return{
                    statusCode: 404, 
                    body: 'not found'
                } 
            }
            const finalGetPost = await getPosts()
            const getPost = finalGetPost.find(_post => _post.id === postId)
            if(!getPost){
                return{
                    statusCode: 404, 
                    body: 'not found'
                } 
            }


            return {
                statusCode: 200, 
                body: getPost
            }
        } 
    },
    {
        url: /^\/posts$/,
        method: "POST", 
        callback : async (_, body) => {
            if(!body){
                return {
                    statusCode: 404, 
                    body: 'no body'
                }
            }

            /** @type {string} */
            /* eslint-disable-next-line prefer-destructuring */
            const saveID = body.title.replace(/\s/g, "_")
            const newStructure= {
                id : saveID, 
                ...body
            }

            const postsFrom = await getPosts()
            postsFrom.push(newStructure)
            savePosts(postsFrom)
            return {
                statusCode: 200, 
                body: newStructure
            }
        } 
    }
] 




module.exports= {
    routes
}