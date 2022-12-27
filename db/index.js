// ℹ️ package responsible to make the connection with mongodb
// https://www.npmjs.com/package/mongoose
const mongoose = require("mongoose");
mongoose.set('strictQuery', true);

// ℹ️ Sets the MongoDB URI for our app to have access to it.
// If no env has been set, we dynamically set it to whatever the folder name was upon the creation of the app
const {MONGODB_URI , MONGODB_URI_TEST, NODE_ENV} = process.env
const connectionString = NODE_ENV === 'test'
? MONGODB_URI_TEST
: MONGODB_URI
  
// "mongodb://127.0.0.1:27017/factoria-server";

mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    const dbName = x.connections[0].name;
    console.log(`Connected to Mongo! Database name: "${dbName}"`);
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });
