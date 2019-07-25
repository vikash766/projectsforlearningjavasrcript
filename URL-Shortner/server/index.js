const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const mongoURI = "mongodb://localhost/url-shortner";
const connectOptions = {
 keepAlive: true,
 reconnectTries: Number.MAX_VALUE
};
//Connect to MongoDB
mongoose.Promise = global.Promise;
mongoose.connect(mongoURI, connectOptions, (err, db) => {
if (err) console.log(`Error`, er); 
 console.log(`Connected to MongoDB`);
});
const app = express();
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-type,Accept,x-access-token,X-Key"
  );
  if (req.method == "OPTIONS") {
    res.status(200).end();
  } else {
    next();
  }
});
app.use(bodyParser.json());
require("./models/UrlShorten");
require("./routes/urlshorten")(app);
const PORT = 7000;
app.listen(PORT, () => {
 console.log(`Server started on port`, PORT);
});