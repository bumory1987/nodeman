// console.log('_dirname', __dirname)
// console.log('_filename', __filename)



process.stdin.setEncoding('utf-8')

process.stdin.on('data', data => {
    console.log('start')
})

process.stdin.pipe(process.stdout)