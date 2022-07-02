require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.get("/", (req, res) => {
  res.send("welcome to walking pal");
});
const userSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true },
  university: { type: String, required: true },
});
const User = new mongoose.model("User", userSchema);
app.post("/walkingpal/api/register", (req, res) => {
  const { firstname, lastname, email, university } = req.body;
  const user = new User({
    firstname,
    lastname,
    email,
    university,
  });
  user
    .save()
    .then(() => {
      console.log("user saved");
      res.json({ message: "user saved successfully", success: true });
    })
    .catch((err) => {
      res.json({ message: "user saving caused error", success: false });
      console.log(err);
    });
});
const port = 8000 || process.env.PORT;
app.listen(port, () => {
  console.log(`listening on http://localhost:${port}`);
  mongoose
    .connect(process.env.MONGO_URI)
    .then(console.log("database connected"));
});
