const mongoose=require('mongoose');
//const Schema=mongoose.Schema;
//the below line is destructured, the mongoose object has a property called schema take that property and assign it to the variable called schema 
const {Schema}=mongoose;
// to use mongoose we need to specify a schema
const userSchema=new Schema({
    googleId:String,
    //we specify the credits mongoose property as a type number and default value zero
    //we specify pieces of configuration as an object
    credits:{
        type:Number,
        default:0
    }
})
// create a new collection called users, if this collection already exists existing collection will not be overwritten
//this loads a schema into mongoose
//passing in two arguments means we try and load some data into mongoose
mongoose.model('users',userSchema);