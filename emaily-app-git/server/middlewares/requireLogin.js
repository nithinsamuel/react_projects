//next is a function we calll when our middleware is complete, it is like the done callback in passport code
//next function is named as such because after the middleware is completed, the request is passed to the next middleware of in the chain it exists
module.exports=(req,res,next)=>{
//check if user is signed in
if(!req.user){
    //this terminates the request because if user is not logged in we must not proceed
    //we are sending a error response immediately
    return res.status(401).send({error:'You must log in!!!'});
}
// if user is logged in, pass request to next middleware
next();
}