// Usage with Node.js
const { google, outlook, office365, yahoo, ics } = require("calendar-link");

// Set event as an object
const event = {
  title: "My birthday party",
  description: "Be there!",
  start: "2019-12-29 18:00:00 +0100",
  duration: [3, "hour"],
};

//Then fetch the link
console.log(google(event)); // https://calendar.google.com/calendar/render...
console.log(outlook(event)); // https://outlook.live.com/owa/...
console.log(office365(event)); // https://outlook.office.com/owa/...
console.log(yahoo(event)); // https://calendar.yahoo.com/?v=60&title=...
console.log(ics(event)); // standard ICS file based on https://icalendar.org//