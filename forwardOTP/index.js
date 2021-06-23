const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API);
var express = require('express')
var bodyParser = require('body-parser')
var app = express()

var urlparser=bodyParser.urlencoded({ extended: false });
var bodyjson=bodyParser.json();
var expressurlparser=express.json();
var expressbodyjson=express.urlencoded({extended: true});


exports.handler = async (event, context, callback) => {
//   console.log(event);
// return event;

  var authorization_header = await event.params.header.Authorization;
  if (authorization_header) 
  {
    authorization_header =await  authorization_header.replace(/(Bearer)\W/, "");
  }
  if (authorization_header === process.env.ACCESS_TOKEN) 
  {
    let otp = event.body.otp;
  
    const message = 
    {
      
      from: {
      email: process.env.FROM_EMAIL,
      name: process.env.FROM_NAME
  },
       
        to: event.body.to_email, // List of recipients
        subject: `Putlocker Access Code: ${otp}`, // Subject line
        html:
          '<h1 style="font:32px/36px Helvetica,Arial,sans-serif;color:#371989;letter-spacing:0.5px;padding:0 0 36px;margin:0">Welcome!</h1>' +
          '<p style="font:16px/24px Helvetica,Arial,sans-serif;color:#757575;padding:0 0 22px;margin:0">Use the code below to login to Putlocker Photo Vault.</p>' +
          '<h4 style="font:24px/36px Arial,Helvetica,sans-serif;color:#757575;text-align:center;margin:0">Enter the code:</h4>' +
          `<h3 style="font:700 24px/36px Arial,Helvetica,sans-serif;color:#00aeef;text-transform:uppercase;text-decoration:underline;margin:0;text-align:center;padding-bottom:36px">${otp}</h3>` +
          '<p style="font:16px/24px Helvetica,Arial,sans-serif;color:#757575;padding:0 0 22px;margin:0">Didn’t request an access code? Then you can ignore this email.</p>' +
          '<p style="font:16px/24px Helvetica,Arial,sans-serif;color:#757575;padding:0 0 22px;margin:0">Your Friends, <br><strong style="color:#371989">The Putlocker Team</strong></p>',
    };
      var a;
      var response;
      await sgMail.send(message, function (err, info) 
      {
        if (err) 
        {
          console.log(err);
          response={success: false,reason: "SERVER_ERROR"};
              
        }
        else 
        {
          response={success: true,user: {email: event.body.to_email,status: 200,}}
        }
      });
      
      return response;
      
  } 
  else {
   return {
      success: false,
      reason: "UNAUTHORIZED",
    };
  }
}
