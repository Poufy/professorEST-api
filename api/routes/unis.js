const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Uni = require("../models/uni");

router.get("/", (req, res, next) => {});

router.post("/", (req, res, next) => {
  const uni = new Uni({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    location: req.body.location,
    tuition: req.body.tuition,
    section: req.body.section
  });
  uni
    .save()
    .then(result => {
      res.status(201).json({
        message: "Added University Successfully",
        createdUni: result
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

router.get("/:uniId", (req, res, next) => {});

module.exports = router;
