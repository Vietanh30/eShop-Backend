const mongoose = require("mongoose");

async function connect() {
  try {
    await mongoose.connect(
      `mongodb+srv://quyet14102001:14102001@cluster0.spcgx.mongodb.net/locnuoc`
    );
    console.log("Database connected");
  } catch (error) {
    console.log("Fail to connect to database");
  }
}

module.exports = { connect };
