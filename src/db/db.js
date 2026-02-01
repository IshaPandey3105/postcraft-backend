const mongoose = require("mongoose");

// function to connect to mongodb database
async function connectDB(){
    await mongoose.connect(process.env.MONGODB_URL)

    console.log("Connected to DB");
}
  
module.exports=connectDB