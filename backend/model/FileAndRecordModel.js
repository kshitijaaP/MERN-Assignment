const mongoose=require("mongoose")

const FileRecordDataSchema=new mongoose.Schema({
    fileName:{
        type:String
    },
    recordCount:{
        type:String
    }

})
module.exports=mongoose.model("FileRecordDataSchema",FileRecordDataSchema)