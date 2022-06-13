const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dbconnection =require('./dbconnection');
const app = express();
app.disable("x-powered-by");
const port = 8000;

// enable cross-origin HTTP requests
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
      },err=>{
        console.log(err);
      });
    })
app.post('/postdata',function (req,res) {

  const objectnew= {
    fullName:req.body.fullName,
    aadhar:req.body.aadhar,
    emailId:req.body.emailId,
    Password:req.body.Password,
    ConfirmPassword:req.body.ConfirmPassword,
    type:"Login"

    
  }
  console.log("data from angular",objectnew);
  console.log(objectnew.aadhar)
 
  dbconnection.testdb.insert(objectnew).then((data)=>{
    console.log("Data inserted successfully ",data);
    res.send(data);

  },err=>{
    console.log("error",err);
  });
}
);
app.listen(port, (err) => {
  if (err) {
   return console.log('something bad happened', err);
  }
 
  console.log(`server is listening on http://localhost:${port}`);
 });