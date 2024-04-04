const express = require('express')
const app = express()

app.get('/',(req,res)=>{
    res.send('server deployed')
})

app.listen(3000,()=>{
    console.log('success')
})

module.exports = app