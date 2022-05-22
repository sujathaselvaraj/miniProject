const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dbconnection =require('./dbconnection');
const app = express();
const port = 8000;

// app.get('/getdata/:id', function (request, response) {
//   response.json({"name":"jeni"});
//  });
 app.use(cors({
origin:'http://localhost:4200'
}));
app.use(bodyParser.json());

// var id = "5f08789d8d18732fd84d4f0857fe7821";
// app.get('/getdata',(req,res)=>{
//   dbconnection.finance.get(id).then((data)=>{
//     console.log("data fetch from db",data);
//   })
// })


app.post('/postdata',function (req,res) {
    console.log("--------");
  var loginnew= {
    loginUsername:req.body.username,
    loginPassword:req.body.password
  }
  var objectnew= {
    fullName:req.body.firstname,
    Username:req.body.username,
    emailId:req.body.email,
    Password:req.body.password,
    Confirmpassword:req.body.confirmPassword,
    

  }
  console.log("Login from angular",loginnew);
  console.log("data from angular",objectnew);
  dbconnection.testdb.insert(loginnew).then((data)=>{
    console.log("data inserted successfully ",data);
  });
  dbconnection.testdb.insert(objectnew).then((data)=>{
    console.log("data inserted successfully ",data);
  });
}
);
app.listen(port, (err) => {
  if (err) {
   return console.log('something bad happened', err);
  }
 
  console.log(`server is listening on http://localhost:${port}`);
 });// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// // const dbconnection =require('./nanodb');
// const app = express();
// var nano = require('nano')
// const url ='https://apikey-v2-1xzbb618xtgfg14nm7uasm9coajsc9dzzpg8p57atbtg:f56766c5716a7b37a531aaa7bdb53315@8ca8138b-1aac-430a-8325-3a686242a515-bluemix.cloudant.com/'
// const nanodb = nano(process.env.COUCHDB_URL || url);
// const db = nanodb.use('fresher-sample');
// const port = 8000;

// // app.get('/getdata/:id', function (request, response) {
// //     response.json({"name":"suja"});
// //   });
//   app.use(cors({
//     origin:'http://localhost:4200'
// }));
// app.use(bodyParser.json());

// // var id = "5f08789d8d18732fd84d4f0857fe7821";
// // app.get('/getdata',(req,res)=>{
// //     dbconnection.db.get(id).then((data)=>{
// //         console.log("data fetch from db",data);
// //     })
// // })


// app.post('/postdata',function (req,res) {
//     var name = req.body.firstName;
//     console.log(name);
//     var objectnew= {
//         userName:req.body.userName,
//         password:req.body.password,

//     }
//     console.log("data from angular",objectnew);
//     nanodb.db.insert(objectnew).then((data)=>{
//         console.log("data inserted successfully ",data);
//     })
// }
// );
// app.listen(port, (err) => {
//     if (err) {
//       return console.log('something bad happened', err);
//     }
  
//     console.log(`server is listening on http://localhost:${port}`);
//   });
//   // const express = require('express');
// // const bodyParser = require('body-parser');
// // const cors = require('cors');
// // const { request } = require('http');
// // var urlParser = bodyParser.urlencoded({ extended: false });

// // // const dbconnection =require('./nanodb');
// // const app = express();
// // app.use(express.static('public'));

// // const port = 4200;

// // // app.get('/', function (request, response) {
// // //     // response.json({"name":"suja"});
// // //     response.sendFile(`${__dirname}/postQuery.html`);

// // //   });
// // app.get('/getdata/:id', function (request, response) {
// //   response.json({"name":"suja"});
// // });
// //   app.use(cors({
// //     origin:'http://localhost:4200'
// // }));
// // app.use(bodyParser.json());

// // // var id = "5f08789d8d18732fd84d4f0857fe7821";
// // // app.get('/getdata',(req,res)=>{
// // //     dbconnection.finance.get(id).then((data)=>{
// // //         console.log("data fetch from db",data);
// // //     })
// // //})
// // app.post('/postquery', urlParser, function (request, response) {
// //   var fname = request.body.fname;
// //   var lname = request.body.lname;
// //   console.log(`${fname}   ${lname}`);
// //   var data = {
// //     first_name: fname,
// //     last_name: lname,
// //   };
// //   response.end(JSON.stringify(data));
// // });


// // // app.post('/postdata',urlParser,function (request,response) {
// // //     var name = request.body.firstName;
// // //     console.log(name.value);
// //     // var objectnew= {
// //     //     firstname:req.body.firstName,
// //     //     lastName:req.body.lastName,
// //     //     email:req.body.email,
// //     //     password:req.body.password,

// //     // }
// //     // console.log("data from angular",objectnew);
// //     // dbconnection.finance.insert(objectnew).then((data)=>{
// //     //     console.log("data inserted successfully ",data);
// //     //})
// // // }
// // // );
// // app.listen(port, (err) => {
// //     if (err) {
// //       return console.log('something bad happened', err);
// //     }
  
// //     console.log(`server is listening on http://localhost:${port}`);
// //   });
  

// // const express = require('express');
// // const bodyParser = require('body-parser');
// // const cors = require('cors');
// // const dbconnection =require('nano');
// // const app = express();
// // const port = 8000;

// // app.get('/getdata/:id', function (request, response) {
// //     response.json({"name":"hema"});
// //   });
// //   app.use(cors({
// //     origin:'http://localhost:4200'
// // }));
// // app.use(bodyParser.json());

// // // var id = "5f08789d8d18732fd84d4f0857fe7821";
// // // app.get('/getdata',(req,res)=>{
// // //     dbconnection.finance.get(id).then((data)=>{
// // //         console.log("data fetch from db",data);
// // //     })
// // // })


// // app.post('/postdata',function (req,res) {
// //     var name = req.body.firstName;
// //     console.log(name);
// //     var objectnew= {
// //         firstname:req.body.firstName,
// //         lastName:req.body.lastName,
// //         email:req.body.email,
// //         password:req.body.password,

// //     }
// //     console.log("data from angular",objectnew);
// //     dbconnection.finance.insert(objectnew).then((data)=>{
// //         console.log("data inserted successfully ",data);
// //     })
// // }
// // );
// // app.listen(port, (err) => {
// //     if (err) {
// //       return console.log('something bad happened', err);
// //     }
  
// //     console.log(`server is listening on http://localhost:${port}`);
// //   });
  