// require is using commonn js modules
const express=require('express');
const mongoose=require('mongoose');
const cookieSession=require('cookie-session');
const passport=require('passport');
// bodyParser is an express middleware and middleware is wired up in app.use call
const bodyParser=require('body-parser');
//order of require statements is important, we need to specify models before calling them in passport
require('./models/User');
require('./models/Survey');
// const passportConfig=require('./services/passport');
//since no value is returned from passportConfig we can condense it like below
require('./services/passport');
const keys=require('./config/keys');
const authRoutes=require('./routes/authRoutes');

mongoose.connect(keys.mongoURI);
// app object listens for requests
const app=express();
//tell express to use body-parser middleware
app.use(bodyParser.json());
//tell express to make use of cookies
app.use(
// 30 days, 24 hours in a day, 60 minutes in an hour, 60 seconds in a minute, 1000 milliseconds to 1 second  
//cookieSession allows us to specify multiple key whcih will be randomly picked
    cookieSession({
        maxAge:30*24*60*60*1000,
        keys:[keys.cookieKey]
    })
)
//tell passport to make use of cookies for authentication
app.use(passport.initialize());
app.use(passport.session());
authRoutes(app);
//an alternate to calling authRoutes without declaring a variable
// require('./routes/authRoutes')(app);
//calling billingRoutes - we pass in the app with a second set of parenthesis
//both billingRoutes and authRoutes return/export a function
//the require statement will turn into a function which we immediately call with the express app object
require('./routes/billingRoutes')(app);
require("./routes/surveyRoutes")(app);

//code to run in heroku environment, for serving server routes or client routes
if(process.env.NODE_ENV==='production'){
    //Both checks are done based on the order of operation, if specifically a request is made for main.js the main.js will be provided in check-1, for all other catch all cases will be handled by check-2
    //
    //Check-1
    //express will serve up production assets, like our main.js file, or main.css file
    //if any get request comes for some route or some file or anything to our application and we do not know what it is looking for, then look into the client/build directory and try to see if some file matches with what the request is looking for
    //eg:if someone looks for client/build/static/js/main; look into client/build and see if there is a file at static/js/main and respond with that
    app.use(express.static('client/build'));
    //
    //Check-2
    //express will serve up the index.html file, if it doesn't recognize the route
    const path=require('path');
    //if we get a request for a route we do not understand, just serve it up the index.html
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'));
    })
}

const PORT=process.env.PORT||5000
app.listen(PORT);