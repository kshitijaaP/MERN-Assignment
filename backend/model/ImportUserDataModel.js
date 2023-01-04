const mongoose=require("mongoose")

const ImportUserDataModel=new mongoose.Schema({
    fullName:{
        type:String
    },
    email:{
        type:String
    },
    mobile_number:{
        type:String
    },
    address:{
        type:String
    }
    

})
module.exports=mongoose.model("ImportUserDataModel",ImportUserDataModel)