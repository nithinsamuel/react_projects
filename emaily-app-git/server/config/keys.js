// keys.js - figure out what set of credentials to returnwhether we are in production or development environment
//when we deploy our app to production server, there is existing environment variable NODE_ENV, that informs us the environment which we are in
if(process.env.NODE_ENV==='production'){
    // we are in production - return the prod set of keys
    module.exports=require('./prod');
}else{
    // we are in development - return the dev keys
    module.exports=require('./dev');
}
