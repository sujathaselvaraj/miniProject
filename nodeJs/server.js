const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dbconnection =require('./dbconnection');
const app = express();
app.disable("x-powered-by");
let helmet = require("helmet");
app.use(helmet.hidePoweredBy());
const port = 8000;


app.use(cors({
origin:'http://localhost:4200'
}));
app.use(bodyParser.json());


app.get('/getdata/:id',(req,res)=>{
      console.log("aadhar",req.params.id);

      const object = {
        selector:{
          "aadhar":req.params.id,
        }
      }
      dbconnection.testdb.find(object).then((data)=>{
        console.log("data Fetch from db", data);
        res.send(data);
      }).catch((err=>{
        this.toastr.error("Data Failed to fetch");
        console.log(err);
      }))
    })
app.post('/postdata',function (req,res) {

  const objectnew= {
    fullName:req.body.fullname,
    aadhar:req.body.aadhar,
    emailId:req.body.email,
    Password:req.body.Password,
    Confirmpassword:req.body.confirmPassword,
    type:"Login"

    
  }
  console.log("data from angular",objectnew);
  console.log(objectnew.aadhar)
 
  dbconnection.testdb.insert(objectnew).then((data)=>{
    console.log("Data inserted successfully ",data);
    res.send(data);

  }).catch((err=>{
    console.log("error",err);
  }))
}
);
app.listen(port, (err) => {
  if (err) {
   return console.log('something bad happened', err);
  }
 
  console.log(`server is listening on http://localhost:${port}`);
 });