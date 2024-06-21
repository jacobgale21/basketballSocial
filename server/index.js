const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const User = require("./models/userSchema");
const jwt = require("jsonwebtoken");

const secret = "dsfasfdfdfdfsewqsekjnk";

const app = express();
dotenv.config();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

const mongo_url =
  "mongodb+srv://jacobgale2003:2354Jg2003@goal-react.luugqoy.mongodb.net/";

mongoose
  .connect(mongo_url)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(8080, () => {
      console.log("Server is running on port 8080");
    });
  })
  .catch((err) => {
    console.log(err);
  });

//Post request for signup functionality
app.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password || username === "" || password === "") {
      res.status(403).json({ error: "All fields are required" });
    }
    const hashedPass = await bcrypt.hashSync(password, 10);

    const newUser = new User({ username, password: hashedPass });
    await newUser.save();
  } catch (err) {
    res.status(403).json({ error: "Error signing up", err });
  }

  return res.status(200).json({ message: "New account created" });
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  User.findOne({ username: username }).then((userDoc) => {
    if (userDoc) {
      if (bcrypt.compareSync(password, userDoc.password)) {
        res.json("Success");
      } else {
        res.status(403).json({ error: "Incorrect Password" });
      }
    } else {
      res.status(403).json({ error: "Incorrect username and password" });
    }
  });
});
