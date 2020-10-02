const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("../config/keys");
// require the mongoose library
const mongoose = require("mongoose");
// get access to user model class
//the variable User is our model class, model class gives us a relation to underlying collection in mongodb
//we can use this model class to create a new model instance and save it or persist it to our mongo database
// by passing in single argument we try and fetch data from mongoose
const User = mongoose.model("users");
//we define a function and pass it to serializeUser
//the user argument is whatever we just pulled out of the db, after checking in mongoDB if the user is an existing or new user
passport.serializeUser((user, done) => {
  // user.id is the id assigned to this record by mongo(i.e ObjectId generated for each record instance)
  //user.id automatically references the mongodb record id,
  //profile id is only for logging in
  done(null, user.id);
});
//deserialize the user
//we get whatever we had in cookie (for us it is user id)
//anytime we access our mongoDb it is an asynchronous function and we have to use a promise and resolve the returned user
passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});
// creates new instance of google passport strategy
//passport.use - generic term to make passport use a strategy
// callbackURL is the route our user will be sent to after they grant permission to our app
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log("accessToken:", accessToken);
      console.log("refreshToken", refreshToken);
      console.log("profile", profile);
      console.log("done", done);
      // attempt to find one record inside user collection
      //query returns promise, we are using advanced feature of promises in future courses
      const existingUser = await User.findOne({ googleId: profile.id });
      // existingUser represents a model instance that was found
      if (existingUser) {
        //we already have a record with the given profile ID
        // if we use return keyword in front of done, the else condition can be removed, but the else logic should simply just be present
        done(null, existingUser);
      } else {
        //we don't have a user record with this ID, make a new user
        //creating a model instance
        const user=await new User({
          googleId: profile.id,
        }).save()
        done(null, user);
      }
    }
  )
);
