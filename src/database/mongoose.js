const mongoose = require("mongoose");

const mongooseConnect = async (url) => {
  try {
    await mongoose.connect(url, {
    });

    console.log(`Database Connected`);
  } catch (error) {
    console.error("Error connecting to database:", error);
    throw error;
  }
};

module.exports = mongooseConnect;
