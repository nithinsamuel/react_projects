const { constructor } = require('sendgrid');
const sendgrid=require('sendgrid');
// We are really just taking a property off of the send grid object and assigning it to a variable called
//helper.
const helper=sendgrid.mail;
const keys=require('../config/keys');
// We want to take that mailer class and We want to provide some additional customization to it. This is something we are creating and we are extending the mail class provided inside of the sendgrid library.
// So now our mailer object right here, our class of Mailer it now contains a bunch of functionality and a bunch of code and  a bunch of setup that is closely tied or inherited from this mail object right here.
//constructor is automatically called when we use the new keyword
class Mailer extends helper.Mail{
    // the first argument to the constructor function will receive subject,recipients with some destructuring, the recipients property is from our survey instance, it is an array of objects
    // the second argument to a constructor function will be the the body of the email, we are not destructuring it so no curly braces
    constructor({subject,recipients},content){
    // We are extending the male class so we're going to make sure that any constructor that is defined on the mail class gets executed by calling the super function.
    super();
    //signature for sendgrid
    //So we take the sendgrid function the sendgrid library we pass in our API key that returns an object that we can use to communicate with the send grid API. And so that's why we assign this property to S-G API or send grid API.
    this.sgApi=sendgrid(keys.sendGridKey);
    // give the from address created in sendgrid
    // So helper.Email helper.content are two helper functions from the sendgrid library that properly format both the from e-mail and the body of the e-mail to work correctly inside of an actual e-mail that is being processed by sendgrid.
    this.from_email=new helper.Email('nithinsam77@gmail.com');
    this.subject=subject;
    this.body=new helper.Content('text/html',content);
    // we're going to make a helper function called this.formatAddresses, And we're going to pass in the list of recipients that was passed into the mailer itself. 
    //recipients will be an array of helper.email, each of which wraps an entire email
    this.recipients=this.formatAddresses(recipients);
    //We have to actually register this.body with the mailer itself.
    //this.addContent is a built in function extended from helper.Mail
    this.addContent(this.body); 
    //enable click tracking inside our email
    this.addClickTracking();
    //take and process this list of recipients.
    //this.recipients is an array of helper objects returned from this.formatAddresses 
    this.addRecipients();
    }
    // So format addresses that will receive our list of recipients and then inside of the function we're going to iterate through the list of recipients. And for every recipient we will extract just the email and then return it. We will then return that overall array that we have created.
    formatAddresses(recipients){
        //And for every recipient we will extract just the email and then return it.
        // /we have to actually add them to the mailer as well.
        return recipients.map(({email})=>{
            return new helper.Email(email);
        })
    }
    //click tracking helper function
    addClickTracking(){
        const trackingSettings=new helper.TrackingSettings();
        const clickTracking=new helper.ClickTracking(true,true);

        trackingSettings.setClickTracking(clickTracking);
        this.addTrackingSettings(trackingSettings);
    }
    //add recipients helper function
    //So essentially what we did here was we defined this personalized variable we then iterated over the list of recipients that we had defined in (this.recipients=this.formatAddresses(recipients);). And then for each recipient and remember each recipient at this point is not a recipient model. It is the helper e-mail ( return new helper.Email(email);) that we setup in formatAddresses helper function. So for each one of those take them and add them to the personalized object. And then after they've all been added to the personalized object call this.addPersonalization which is that function that is defined by the mail base class and add the entire personalized object.Yes this stuff is just nasty
    addRecipients(){
        const personalize=new helper.Personalization();
        this.recipients.forEach(recipient=>{
            personalize.addTo(recipient);
        });
        this.addPersonalization(personalize);
    }
    // 
    async send(){
        //we set all these different properties on the mailer called toJSON() to take all those different properties and convert them to JSON data and then take that entire thing and send it off to send grid.
        //we need to make emptyRequest for sendgrid api
        const request =this.sgApi.emptyRequest({
            method:'POST',
            path:'/v3/mail/send',
            body:this.toJSON()
        })
        const response=await this.sgApi.API(request);
        return response;
    }
}
module.exports=Mailer;