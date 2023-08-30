const mongoose = require("mongoose");
//to get packages and assign into variables.
require('dotenv').config();


const connectDB = async () => {
    await mongoose.connect(process.env.URI);
    console.log("Database Connected");

}


module.exports = connectDB;