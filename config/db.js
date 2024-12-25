const mongoose = require("mongoose");

async function connect() {
  try {
    // await mongoose.connect(process.env.MONGO_STRING, {
    //   // useNewUrlParser: true,
    //   // useUnifiedTopology: true,
    //   authSource: "admin",
    //   // dbName: "eshop", // process.env.DBNAME,
    // });
    await mongoose.connect(`mongodb+srv://quyet14102001:14102001@cluster0.spcgx.mongodb.net/locnuoc`)
    console.log("Database connected");
  } catch (error) {
    console.log("Fail to connect to database");
  }
}

module.exports = { connect };
