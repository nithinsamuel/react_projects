const mongoose=require('mongoose');
const {Schema}=mongoose;
const RecipientSchema=require('./Recipient');

const surveySchema=new Schema({
    title:String,
    body:String,
    subject:String,
    // recipents propery will be an array containing a list of recipientSchema
    //every record must obey the schema we defined in recipientSchema
    recipients:[RecipientSchema],    
    yes:{
        type:Number,
        default:0
    },
    no:{
        type:Number,
        default:0
    },
    //the underscore before text user indicates this field is a reference field
    _user:{type:Schema.Types.ObjectId,ref:'User'},
    dateSent:Date,
    lastResponded:Date
})
mongoose.model('surveys',surveySchema);