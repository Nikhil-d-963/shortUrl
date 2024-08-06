const mongoose = require("mongoose");

const mongooseConnect = async(url)=>{
    try {

        await mongoose.connect(url, {
            serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
            bufferCommands: false, // Disable mongoose buffering
        });

        console.log(`Database Connected`);


        
    } catch (error) {
        console.log(error);
    }
}



module.exports = mongooseConnect;