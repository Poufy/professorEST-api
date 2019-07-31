const mongoose = require("mongoose");

const universitySchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  notes: { type: String, required: true },
  periodStudy: { type: String, required: true },
  price: { type: Number, required: true },
  language: String,
  educationalLevel: String,
  branchName: String,
  collegeName: String,
  universityName: String
});

module.exports = mongoose.model("University", universitySchema);
