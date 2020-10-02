//next is a function we calll when our middleware is complete, it is like the done callback in passport code
//next function is named as such because after the middleware is completed, the request is passed to the next middleware of in the chain it exists
module.exports=(req,res,next)=>{
    //check if user has enough credits
    // So we'll say if the current user does not have greater than zero credits in the words
    // if you have zero or negative for some reason credits inside of our application we want to kick you out early.
    if(req.user.credits<1){
        //this terminates the request if user does not have enough credits we must not proceed       
        //we are sending a error response immediately
        return res.status(403).send({error:'Not enough credits!!!'});
    }
    // if user is logged in, pass request to next middleware
    next();
    }

