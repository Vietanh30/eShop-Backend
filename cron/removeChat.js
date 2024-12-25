const cron = require("node-cron");
const Message = require("../models/messageModel.js");

// Function to delete data
const deleteData = async () => {
  try {
    await Message.deleteMany({});
  } catch (error) {
    console.error("Error deleting data:", error);
  }
};

// Schedule the task to run at the end of the day
cron.schedule("30 22 * * *", () => {
  deleteData();
});

// Run the cron job immediately when the server starts
// deleteData();
