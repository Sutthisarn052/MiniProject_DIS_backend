const express = require("express");
passport = require("passport");
cors = require("cors");
cookie = require("cookie");
const bcrypt = require("bcrypt");
jwt = require("jsonwebtoken");

app = express();
port = process.env.PORT || 80;
const router = require("express").Router();
app.use("/api", router);

require("./passport.js");
const db = require("./database.js");
let users = db.users;

router.use(cors({ origin: "http://localhost:3000", credentials: true }));
router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.get("/test", async (req, res) => {
    console.log("test1");
   
  });

  app.listen(port, () => console.log(`Server is running on port ${port}`));