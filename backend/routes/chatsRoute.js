const express = require("express");
const router = express.Router();
const db = require("../models");
const Chats = db.Chats;
const { sequelize } = db;

router.get("/add", async (req, res) => {
  const SentTo = req.query.SentTo;
  const UserEmail = req.query.UserEmail;
  const data = {
    content: " ",
    SentTo: SentTo,
    UserEmail: UserEmail,
  };
  console.log(data);
  if (!data.SentTo) {
    return;
  }
  try {
    const results = await sequelize.query("SELECT * from Users where email=?", {
      replacements: [data.SentTo],
      type: sequelize.QueryTypes.SELECT,
    });
    console.log(results);
    if (results && results.length > 0) {
      try {
        await Chats.create(data);
      } catch (error) {
        console.log("Could not add user ", error);
      }
      return res.status(200).json({ message: "User found" });
    }
    return res.status(404).json({ message: "User not found" });
  } catch (error) {
    console.log(error);
  }
});

router.post("/:email", async (req, res) => {
  const data = {
    content: req.body.content,
    SentTo: req.params.email,
    UserEmail: req.body.sendersEmail,
  };
  if (!data.content || !data.SentTo || !data.UserEmail) {
    return;
  }
  try {
    await Chats.create(data);
    res.status(201).json({ message: "Sent successfully" });
  } catch (error) {
    console.log(error);
  }
});

router.get("/", async (req, res) => {
  const data = req.query.email;
  console.log(JSON.stringify(data));
  try {
    const results = await sequelize.query(
      "SELECT * from Chats where UserEmail=? OR SentTo=?",
      {
        replacements: [req.query.email, req.query.email],
        type: sequelize.QueryTypes.SELECT,
      }
    );
    const messages = results.map((msg) => ({
      ...msg,
      isReceived: msg.SentTo === req.query.email,
    }));
    res.status(200).json({ message: messages });
  } catch (error) {
    console.log(error);
  }
});

router.post("/:email", async (req, res) => {
  const userEmail = req.params.email;
  const data = {
    content: req.body.content,
    SentTo: userEmail,
    UserEmail: req.body.UserEmail,
  };
  try {
    await Chats.create(data);
    res.status(201).json({ message: data });
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
