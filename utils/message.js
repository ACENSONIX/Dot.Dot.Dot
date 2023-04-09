// Download the helper library from https://www.twilio.com/docs/node/install
// Set environment variables for your credentials
// Read more at http://twil.io/secure
const accountSid = "ACfced1d92a270dd628973c925480cd470";
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

exports.sendSMS = async(body,to) => {

    console.log(to , body);
client.messages
  .create({ body: body, from: "+15077283368", to: to })
  .then(message => console.log(message.sid));
    
};