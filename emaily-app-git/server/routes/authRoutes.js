// this passport refernce is the npm passport module
const passport = require("passport");
// the app object is defined in index.js, to access it we use the arrow function notation
//we export a function from the file, we add the app object as a function argument
module.exports = (app) => {
  // routehandler that makes sure user is kicked to the passport flow
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"],
    })
  );
  //google will have the code so the initial authentication process will not be repeated
  //after user comes from oauth flow,(/auth/google/callback), passport middleware takes control 
  //passport.authenticate is a middleware for google authentication
  //after passport authenticate, request is passed to next handler in the chain, which tells the browser that the response has to be redirected
  app.get(
    "/auth/google/callback", 
    passport.authenticate("google"),
    (req,res)=>{
      res.redirect('/surveys');
    }
    );
// req - represent incoming request, res - represent the outgoing response
//we send back thr req.user (ie)someone who has gone through the oauth flow and in theory logged in to our app can get access to our user
  app.get("/api/current_user",(req,res)=>{
    res.send(req.user)
  })
  // logout the user
   // req.logout is a function that is automatically attached to the request object by passport
    // takes cookie that contains the id and kills the cookie
     //send acknowledgemnt that user is no longer signed in
    // res.send(req.user);
    // redirect app to the root of our application
  app.get('/api/logout',(req,res)=>{
    req.logout();   
    res.redirect('/');
  })
};