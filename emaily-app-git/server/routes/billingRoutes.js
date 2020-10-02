const keys=require('../config/keys');
//we need to pass the stripe secret key when we require the stripe library
const stripe=require("stripe")(keys.stripeSecretKey);
//import the requireLogin middleware
const requireLogin=require('../middlewares/requireLogin');
module.exports=app=>{
// watch for post requests to api/stripe route
// we require the user to be logged in for accessing /api/stripe,
// so we pass requireLogin middleware as a second argument to route handler
//request handling function will be the third argument
//Note:we can pass as any middleware as we want but eventually one of them must process the response
app.post('/api/stripe', requireLogin, async (req,res)=>{
    //this block of code is the place where we handle the following
    //-logic to handle the token, reach out to stripe api and finalize the charge
    //-and update the user's credits
    //Making sure the user is logged in, if user is not signed in end the request early and send error message
    //this below code is not necessary we are using requireLogin middleware
    // if(!req.user){
    //   //401 is unauthorized/forbidden, we send a response object with error status
    //   return res.status(401).send({error:'You must log in!'})
    // }
    //console.log("billingRoutes--req.body",req.body);
    // create call returns a promise, stripe library creates a promise anytime we return a charge
    //to handle the returned promise we use the async/await syntax
    const charge=await stripe.charges.create({
        description: 'Learning Node -- Grider Course',
        shipping: {
            name: 'Nithin Samuel',
            address: {
              line1: '510 Townsend St',
              postal_code: '98140',
              city: 'San Francisco',
              state: 'CA',
              country: 'US',
            },
          },
        amount:500,
        currency:'usd',
        description:'$5 for 5 credits',
        source:req.body.id
    });
    // console.log("billingRoutes--charge",charge);
    // after we succesfully apply a charge to the user's credit card take the user model and add 5 credits to them and send the user model back to them , esssentially we respond to the requst with the newly updated user model
    //whenever the user is signed in through passport, we can access the current user model using req.user,
    //this is setupautomatically by passport  
    req.user.credits += 5;
    //we persist the user by using .save(), it is async request so we use await
    //when save process is completed it will send back the updated user model
    const user=await req.user.save();   
    //after we get the user back we have to repond to the request
    //we communicate the response back to the browser
    res.send(user);
})
}