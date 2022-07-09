const express = require("express");
const Stat = require("../models/stat");
const router = new express.Router();

router.get("/stats", async (req, res) => {
  const from = new Date(req.query.from);
  const to = req.query.to ? new Date(req.query.to) : new Date();
  const stats = await Stat.find({
    createdAt: { $gte: from, $lte: to },
  }).sort({ createdAt: 1 });
  res.send(stats);
});

router.get("/stats/:tag", async (req, res) => {
  const tag = req.params.tag;
  const from = new Date(req.query.from);
  const to = req.query.to ? new Date(req.query.to) : new Date();
  const stats = await Stat.find({
    tag,
    createdAt: { $gte: from, $lte: to },
  }).sort({ createdAt: 1 });
  res.send(stats);
});

module.exports = router;
