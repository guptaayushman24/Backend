// These file is responsible for creating the Node.js and mongo db database
const mongoose = require("mongoose")
// Define the mongodb connect URL
const mongoURL='mongodb://localhost:27017/hotels' // hotels is the name of the database
// Now we are establishing the connection
mongoose.connect(mongoURL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

const db = mongoose.connection

// Using the event listner
db.on("connected",()=>{
    console.log("Connected to the Mongodb server");
})

db.on('error',(err)=>{
    console.error("Mongodb connection error",err);
})

// Export the database connection
module.exports=db