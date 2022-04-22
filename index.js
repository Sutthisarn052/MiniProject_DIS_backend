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

router.post("/login", (req, res, next) => {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    console.log("Login: ", req.body, user, err, info);
    if (err) return next(err);
    if (user) {
      if (req.body.remember == true) {
        time_exp = "7d";
      } else time_exp = "1d";
      const token = jwt.sign(user, db.SECRET, {
        expiresIn: time_exp,
      });
      var decoded = jwt.decode(token);
      let time = new Date(decoded.exp * 1000);
      console.log(new Date(decoded.exp * 1000));
      res.setHeader(
        "Set-Cookie",
        cookie.serialize("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== "development",
          maxAge: 60 * 60,
          sameSite: "strict",
          path: "/",
        })
      );
      res.statusCode = 200;
      return res.json({ user, token });
    } else return res.status(422).json(info);
  })(req, res, next);
});

router.post("/register", async (req, res) => {
  try {
    const SALT_ROUND = 10;
    const { username, email, password } = req.body;
    if (!username || !email || !password)
      return res.json({ message: "Cannot register with empty string" });
    if (db.checkExistingUser(username) !== db.NOT_FOUND)
      return res.json({ message: "Duplicated user" });

    let id = users.users.length
      ? users.users[users.users.length - 1].id + 1
      : 1;
    hash = await bcrypt.hash(password, SALT_ROUND);
    users.users.push({ id, username, password: hash, email });
    res.status(200).json({ message: "Register success" });
  } catch {
    res.status(422).json({ message: "Cannot register" });
  }
});

router.get("/logout", (req, res) => {
  res.setHeader(
    "Set-Cookie",
    cookie.serialize("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      maxAge: -1,
      sameSite: "strict",
      path: "/",
    })
  );
  res.statusCode = 200;
  return res.json({ message: "Logout successful" });
});

router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    res.send(req.user);
  }
);

router.get("/history/:username", async (req, res) => {
  console.log(req.params.username);
  let result = await db.findTransactionsByID(req.params.username);
  return res.json(result);
});

router.get("/history", async (req, res) => {
  let result = await db.findTransactions();
  return res.json(result);
});

router.post(
  "/add",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    if (!req.user) {
      console.log(req.user);
    } else {
      let result = await db.addTransaction(req.body, req.user.username);
      return res.send(result);
    }
  }
);

router.delete("/delete/:transactionID", async (req, res) => {
  let found = await db.deleteTransaction(req.params.transactionID);
  if (found) {
    return res.status(200).send(found);
  }
  return res
    .status(500)
    .send({ message: `Not found transactionID ${req.params.transactionID}` });
});

router.put("/edit", async (req, res) => {
  let found = await db.editTransaction(req.body);
  if (found) {
    return res.status(200).send(found);
  }
  return res
    .status(500)
    .send({ message: `Not found transactionID ${req.params.transactionID}` });
});

router.get("/guest", async (req, res, next) => {
  try {
    const SALT_ROUND = 10;
    let username = Math.random().toString(36).substring(2);
    let emailText = "@guest.mail";
    let email = username.concat(emailText);
    let password = "123456";
    if (!username || !email || !password)
      return res.json({ message: "Cannot register with empty string" });
    if (db.checkExistingUser(username) !== db.NOT_FOUND)
      return res.json({ message: "Duplicated user" });

    let id = users.users.length
      ? users.users[users.users.length - 1].id + 1
      : 1;
    hash = await bcrypt.hash(password, SALT_ROUND);
    users.users.push({ id, username, password: hash, email });
    res.status(200).json({ message: "Register success" , username: username});
  } catch {
    res.status(422).json({ message: "Cannot register" });
  }
});

  app.listen(port, () => console.log(`Server is running on port ${port}`));