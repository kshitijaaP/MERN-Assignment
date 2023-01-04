const express = require("express")
const mongoose = require("mongoose")
const bodyparser = require("body-parser")
const cors = require("cors");
const app = express()
const UserDataSchema = require("./model/UserDataModel")
const ImportUserDataModel=require("./model/ImportUserDataModel")
const FileRecordDataSchema=require("./model/FileAndRecordModel")
const fs = require("fs")
// var parse = require('parse');
app.use(cors())
app.use(express.json())
app.use(bodyparser.urlencoded({ extended: true }))
const { parse } = require('csv-parse');
mongoose.set("strictQuery", true);
mongoose.connect("mongodb+srv://root:root1234@cluster0.addwgxz.mongodb.net/test").then(() => {
  
})
app.post("/saveUserData", (req, res) => {

    const { fullName, email, dob, address, country } = req.body
    if(req.body._id)
    {
        UserDataSchema.findOneAndUpdate({_id:req.body._id},req.body,{new:true},(err,data)=>{
            if (err) throw err
            else{
                res.send({data})
            }
        })
        
    }
    else{
        const user = new UserDataSchema({
            fullName, email, dob, address, country
        })
        user.save((err, data) => {
            if (err) throw err
            else {
                res.send({ data })
            }
        })
       
    }

    
})
app.get("/saveUserData", (req, res) => {
   
    UserDataSchema.find((err, data) => {
        if (err) throw err;
        else {
            res.send(data)
        }
    })
})
app.post("/deleteUserData",(req,res)=>{
 let Id=req.body._id
  const {_id,fullName,email,dob,address,country}=req.body
  
    console.log(Id)
     UserDataSchema.findOneAndDelete({_id:Id}).then(
        () => {
            
         
            res.status(200).json({
                message: 'Deleted!'
              });
        }
      ).catch(
        
        (error) => {
           
            res.status(400).json({
                error: error
              });
         
        }
        
        
      );
})
app.post("/postImportUserData",(req,res)=>{
    req.body.forEach(element => {
        const {fullName,email,mobile_number,address}=element
        const exportUser=new ImportUserDataModel({
            fullName,email,mobile_number,address
        })
        exportUser.save((err,data)=>{
            if (err) throw err;
            
        })
    });
})
app.post("/saveDataFileAndRecord",(req,res)=>{

    const {fileName,recordCount}=req.body[0]
    const fileRecordData=new FileRecordDataSchema({
        fileName,recordCount
    })
    fileRecordData.save((err,data)=>{
        if (err) throw err
        else{
            res.send({message:'Success'})
        }
    })
})
app.get("/gettImportUserData",(req,res)=>{
        FileRecordDataSchema.find((err,data)=>{
            if(err) throw err
            else{
                res.send({data})
            }
        })
})
app.listen(5000)   