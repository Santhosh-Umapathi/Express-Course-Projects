const express = require("express");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
require("dotenv").config();
//DB
require("./database").connect();
//Model
const { User } = require("./model");
//Middleware
const { auth } = require("./middleware");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res, next) => {
  res.send("Starter");
});

app.post("/register", async (req, res, next) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (
      firstName !== "" &&
      lastName !== "" &&
      email !== "" &&
      password !== ""
    ) {
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        return res.status(401).send("User already exists");
      }

      const encryptedPassword = await bcryptjs.hash(password, 10);

      const user = await User.create({
        firstName,
        lastName,
        email: email.toLowerCase(),
        password: encryptedPassword,
      });

      const token = jwt.sign(
        {
          user_id: user._id,
          email,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: 3600,
        }
      );

      user.token = token;
      user.password = undefined;

      res.status(201).json(user);
    } else {
      res.status(400).send("All fields required");
    }
  } catch (error) {
    console.log("🚀 --- app.post --- error", error);
    res.status(400).send("Error Occured");
  }
});

app.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (email !== "" && password !== "") {
      const existingUser = await User.findOne({ email });

      if (!existingUser) {
        res.status(401).send("Not registered");
      }

      const isPasswordValid = await bcryptjs.compare(
        password,
        existingUser.password
      );

      if (!isPasswordValid) {
        res.status(401).send("Incorrect Password");
      }

      const token = jwt.sign(
        {
          user_id: existingUser._id,
          email,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: 3600,
        }
      );

      existingUser.token = token;
      existingUser.password = undefined;

      //Cookies options
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), //3 days
        httpOnly: true,
      };

      //Sending Cookies for token
      res
        .status(200)
        .cookie("token", token, options)
        .send("Cookies set for token");

      // res.status(200).json(existingUser);
    } else {
      res.status(400).send("All fields required");
    }
  } catch (error) {
    console.log("🚀 --- app.post --- error", error);
    res.status(400).send("Error Occured");
  }
});

app.get("/dashboard", auth, async (req, res, next) => {
  res.send("Success to see dashboard");
});

module.exports = app;
