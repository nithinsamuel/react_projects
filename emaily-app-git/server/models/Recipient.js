const mongoose=require('mongoose');
const {Schema}=mongoose;

const recipientSchema=new Schema({
    email:String,
    responded:{type:Boolean,default:false}
})
// rather than registering the schema with mongoose we are going to export the schema
module.exports=recipientSchema;