var nodemailer = require("nodemailer");
const ical = require('ical-generator');
const moment = require("moment");
const bodyParser = require('body-parser');
var express = require('express');
var app = express();
app.listen(8000,()=>console.log('Started'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const { google, outlook, office365 } = require("calendar-link");

app.post('/Invite',function (req, res) {
    res.json({"status":"initiated"});
    let data1=req.body;
    var sendermail=data1.Aemail;
    var startd=parseInt(data1.Start);
    var end= parseInt(data1.End);
    var location1=data1.Location;
var description1=data1.Description;
var summary1=data1.Summary;
console.log(moment());
// Set event as an object
const event = {
  title: summary1,
  description: description1,
  start: moment(startd).toISOString(),
  duration: moment(end).toISOString(),
  location: location1,
};
var glink="<b>Google</b>: <a href="+google(event)+">Click here to add</a>";
var olink="<b>Outlook</b>: <a href="+outlook(event)+">Click here to add</a>";
var oflink="<b>Microsoft office365</b>: <a href="+office365(event)+">Click here to add</a>";
//Then fetch the link
// console.log(glink); // https://calendar.google.com/calendar/render...
// console.log(olink); // https://outlook.live.com/owa/...
// console.log(oflink); // https://outlook.office.com/owa/...

var smtpTransport = nodemailer.createTransport({
   service: "Gmail",
   auth: {
       user: "Moneybootscap@gmail.com",
       pass: "M0neyboots"
   }
});

    const cal = ical({ domain: "Moneybootscap@gmail.com", name: 'My test calendar event' });
    //cal.domain("mytestwebsite.com");
    cal.createEvent({
            start:  moment(startd).toISOString(),     // eg : moment()
            end: moment(end).toISOString(),           // eg : moment(1,'days')
            summary: summary1,         // 'Summary of your event'
            description: description1, // 'More description'
            location: location1,       // 'location'
            organizer: {              // 'organizer details'
                name: "David Moses",
                email: "Moneybootscap@gmail.com"
            },
        })
    
    var mailOptions = {
        to: sendermail,
        subject: "Calendar Invite Email",
        html: "<head><title>Title of the document</title></head><body><h2>This is a calendar invite email.Please click on the links below to add this to your calendar or download the ics file if you want to add to your iCal.</h2><p>"+glink+"<br><br>"+olink+"<br><br>"+oflink+"<br><br>Download the ics file from the attachment to add it to your <b>ICal</b> :</p></body>"
    
        
    
    }

    if (cal) {
        let alternatives = {
            "Content-Type": "text/calendar",
            "method": "REQUEST",
            "content": new Buffer(cal.toString()),
            "component": "VEVENT",
            "Content-Class": "urn:content-classes:calendarmessage"
        }
mailOptions['alternatives'] = alternatives;
mailOptions['alternatives']['contentType'] = 'text/calendar'
mailOptions['alternatives']['content'] 
    = new Buffer(cal.toString())
}

smtpTransport.sendMail(mailOptions, function (error, response) {
        if (error) {
            console.log(error);
        } else {
            console.log("Message sent: " , response);
        }
    })

});