const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const sauceRoutes = require("./routes/sauce");
const userRoutes = require("./routes/user");

const app = express();

mongoose.connect(process.env.CONNECTION_URL)
  .then(() => {
    console.log("Successfully connected to MongoDB Atlas!");
  })
  .catch((error) => {
    console.log("Unable to connect to MongoDB Atlas!");
    console.error(error);
  });

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use("/images", express.static(path.join(__dirname, "images")));
app.use(express.static("images"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/sauces", sauceRoutes);
app.use("/api/auth", userRoutes);

module.exports = app;
