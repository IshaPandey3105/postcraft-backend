require ("dotenv").config();  // this line should be at top
const app = require ("./src/app");
const connectDB = require("./src/db/db")

connectDB();

// this file is created to run the server

app.listen(process.env.PORT ,() =>{
    console.log("Server is running")
})