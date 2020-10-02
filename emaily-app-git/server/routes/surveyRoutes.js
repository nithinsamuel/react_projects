const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const requireCredits = require("../middlewares/requireCredits");
const Mailer=require('../services/Mailer');
const surveyTemplate=require('../services/emailTemplates/surveyTemplate')
//in mongoose when running tests there is a possibility that mongoose model class will not be called correctly if we use require, so for we require mongoose and call the respective model by assigning a constant
const Survey = mongoose.model("surveys");
module.exports = (app) => {
  // route handler for the email button response click
  app.get('/api/surveys/thanks',(req,res)=>{
    res.send("Thanks for voting!!!");
  })

  // we require the user to be logged in for accessing /api/stripe,
  // so we pass requireLogin middleware as a second argument to route handler
  //Note:we can pass as many middleware as we want but eventually one of them must process the response
  //In mailer.js send() is async, we also need to mark the route handler as async as it also contains some asynchronous code
  app.post("/api/surveys", requireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, recipients } = req.body;
    //this just makes an instance of a survey in memory and has not yet been persisted to our database
    const survey = new Survey({
      title: title,
      subject: subject,
      body: body,
      //this will take the list of email addresses.Split it into an array and then return an object for every e-mail address in there with a property of email and the value of the actual email address.
      recipients: recipients.split(",").map((email) => {
        return { email: email.trim() };
      }),
      //shortened above code as below using es6
      //   recipients:recipients.split(',').map(email=>({email})),
      //_user underscore means it is relationship field and is the owns the particular survey
      // the id property  is automatically generated by mongoose . So we don't have to generate this ourselves so we don't have to define it in the schema or anything
      _user:req.user.id,
      //yes or no fields present in survey model already have a default value so no need to specify here
      dateSent:Date.now()
    });
    // great place to send email
    //we're going to pass in some object that contains a subject property and the recipient's property. So the subject line to use for the e-mail and the people to send it too, and then as a second argument will pass in the content of the actual e-mail like the body of the e-mail that each HTML to show inside the the e-mail itself.
    const mailer=new Mailer(survey,surveyTemplate(survey));
    try{
    //we call mailer.send to make sure mailer attempts to send itself
    //mailer.send() is an async function
    // So we need to not only mark the mailer send function as async but we also need to mark our route handler as well because it's also going to contain some asynchronous code.
    await mailer.send();
    //save to our datatbase; 
    // Again this is an asynchronous function as well and we want to wait for the entire thing to finish before we attempt to do anything else inside the request handler.
    await survey.save()
    req.user.credits-=1;
    // So whenever we do this save this will be eventually resolved with our user and this is going to be user that we use from now on.
    const user=await req.user.save();
    //So then at the very bottom we'll send back the updated user model.We're going to send back the updated user model right here to specifically indicate  here is the new value of credits just in the same way that we handled the credit addition earlier on.
    res.send(user);
    }catch(err){
      res.status(422).send(err);
    }

  });
};
