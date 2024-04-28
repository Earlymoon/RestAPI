const mongoose = require("mongoose");
const connectDb = (uri) => {
  return mongoose
    .connect(uri, {
      // useCreateIndex: true,
      useNewUrlParser: true, // Corrected typo
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connection successful");
    })
    .catch((error) => {
      console.error("Connection failed:", error);
    });
};
module.exports = connectDb;

// "mongodb://localhost:27017/shopingdata"
