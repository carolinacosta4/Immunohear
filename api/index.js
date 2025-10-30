require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;
const host = process.env.HOST || "localhost";

app.use(cors());
app.use(express.json());

app.get("/", function (req, res) {
  res.status(200).json({ message: "home -- Immunohear API" });
});

app.use("/users", require("./routes/users.routes.js"));
app.use("/tips", require("./routes/tips.routes.js"));
app.use("/tipCategory", require("./routes/tipCategories.routes.js"));
app.use("/exams", require("./routes/exam.routes.js"));
app.use("/diseases", require("./routes/disease.routes.js"));
app.use("/diary", require("./routes/diaryEntry.routes.js"));
app.use("/appointments", require("./routes/appointment.routes.js"));
app.use("/feelings", require("./routes/feeling.routes.js"));

app.all("*", function (req, res) {
  res.status(400).json({
    success: false,
    msg: `The API does not recognize the request on ${req.url}`,
  });
});

app.listen(port, () => console.log(`App listening at http://${host}:${port}/`));