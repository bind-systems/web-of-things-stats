const express = require("express");
const Stat = require("../models/stat");
const router = new express.Router();

router.get("/stats/:tag", async (req, res) => {
  const tag = req.params.tag;
  const stats = await Stat.find({ tag });
  res.send(stats);
});

router.get("/stats/date/:date", async (req, res) => {
  const date = new Date(req.params.date);
  const stats = await Stat.find({
    createdAt: { $gte: date, $lte: new Date() },
  });
  res.send(stats);
});

router.get("/stats/:tag/:date", async (req, res) => {
  const tag = req.params.tag;
  const date = new Date(req.params.date);
  const stats = await Stat.find({
    createdAt: { $gte: date, $lte: new Date() },
    tag,
  });
  res.send(stats);
});

module.exports = router;
