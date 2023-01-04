const mongoose=require("mongoose")

const UserDataSchema=new mongoose.Schema({
    fullName:{
        type:String
    },
    email:{
        type:String
    },
    dob:{
        type:String
    },
    address:{
        type:String
    },
    country:{
        type:String
    }

})
module.exports=mongoose.model("UserDataSchema",UserDataSchema)