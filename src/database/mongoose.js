const mongoose = require("mongoose");

const mongooseConnect = async(url)=>{
    try {

        await mongoose.connect(url, {
        });

        console.log(`Database Connected`);


        
    } catch (error) {
        console.log(error);
    }
}



module.exports = mongooseConnect;