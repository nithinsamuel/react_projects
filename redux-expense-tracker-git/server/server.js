const path=require('path');
const express=require('express');
const app=express();
// __dirname - current directory
// .. - we go up a folder
// public is the file name with prod build
const publicPath=path.join(__dirname,'..','public');
app.use(express.static(publicPath));
//app.get runs whenever a get request is made to our server
//we can use * to match all unmatched routes
//we send back the index.html, using res we can manipulate the response
app.get("*",(req,res)=>{
    res.sendFile(path.join(publicPath,'index.html'))
});
app.listen(3000,()=>{
    console.log("publicPath",publicPath)
    console.log('server is up')
});