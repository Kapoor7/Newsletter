//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static("public"));

app.get("/" , (req,res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", (req,res) => {
var email = req.body.inputEmail;
var fName = req.body.inputFName;
var lName = req.body.inputLName;

var data = {
  members: [
    {
      email_address : email,
      status : "subscribed",
      merge_fields : {
        FNAME : fName,
        LNAME : lName
      }
    }
  ]
};

var JSONData = JSON.stringify(data);

var options = {
  url : "https://us20.api.mailchimp.com/3.0/lists/3e0e748820",
  method: "POST",
  headers : {
    "Authorization" : "kapoor7 f9e6bf03d5808bb8887ba28ace016258-us20"
  },
  body : JSONData
};

request(options, (err, response, body ) => {
  if(err){
    res.sendFile(__dirname + "/failure.html")
  }else{
    if(response.statusCode == 200){
      res.sendFile(__dirname + "/success.html")
    }else{
      res.sendFile(__dirname + "/failure.html")
    }
  }

});
});

app.listen(process.env.PORT || 3000, function(){
  console.log(`Server started on port`);
});
