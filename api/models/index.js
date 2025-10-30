const mongoose = require("mongoose");
const dbConfig = require("../config/db.config.js");

const db = {};
db.mongoose = mongoose;

(async () => {
  try {
    console.log(dbConfig.URL);
    await db.mongoose.connect(dbConfig.URL);
    console.log("Connected to the database!");
  } catch (error) {
    console.log("Cannot connect to the database!", error);
    process.exit();
  }
})();

db.User = require("./users.model.js")(mongoose);
db.Tip = require("./tips.model.js")(mongoose);
db.TipCategory = require("./tipcategories.model.js")(mongoose);
db.UserExam = require("./userExam.model.js")(mongoose);
db.UserDisease = require("./userDisease.model.js")(mongoose);
db.Feeling = require("./feeling.model.js")(mongoose);
db.Exam = require("./exam.model.js")(mongoose);
db.Disease = require("./disease.model.js")(mongoose);
db.DiaryEntry = require("./diaryEntry.model.js")(mongoose);
db.Appointment = require("./appointment.model.js")(mongoose);

module.exports = db;
