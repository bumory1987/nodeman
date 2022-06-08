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
 * @property {*} body
 */

/**
 * @typedef Route
 * @property {RegExp} url
 * @property {string} method
 * @property {() => Promise<APIResponse>} callback
 */


/** @type {Route[]} */
const routes = [
    {
        url: /^\/posts$/,
        method: "GET", 
        callback : async () => {
            return {
                statusCode: 200, 
                body: {}
            }
        } 
    },
    {
        url: /^\/posts\/([a-zA-Z0-9-_]+)$/,
        method: "GET", 
        callback : async () => {
            return {
                statusCode: 200, 
                body: {}
            }
        } 
    },
    {
        url: /^\/posts$/,
        method: "POST", 
        callback : async () => {
            return {
                statusCode: 200, 
                body: {}
            }
        } 
    }
] 




module.exports= {
    routes
}