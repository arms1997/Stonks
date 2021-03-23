const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
console.log(accountSid);
const client = require("twilio")(accountSid, authToken);

module.exports = (message) => {
  client.messages
    .create({
      body: message,
      from: "+12136993615",
      to: process.env.PHONE_NUMBER,
    })
    .then((messages) => console.log(messages))
    .catch((err) => console.error(err));
};
