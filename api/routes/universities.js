const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const University = require("../models/university");
const locus = require("locus");

router.get("/", (req, res, next) => {
  if (
    req.query.universityName ||
    req.query.language ||
    req.query.branchName ||
    req.query.price
  ) {
    const universityNameRegex = new RegExp(
      escapeRegex(req.query.universityName),
      "gi"
    );
    const branchNameRegex = new RegExp(escapeRegex(req.query.branchName), "gi");
    const languageRegex = new RegExp(escapeRegex(req.query.language), "gi");
    //Case where price is not specified
    req.query.price = req.query.price || 999999;

    University.find({
      $and: [
        {
          universityName: universityNameRegex,
          branchName: branchNameRegex,
          language: languageRegex
        },
        { price: { $lte: req.query.price } }
      ]
    })
      .exec()
      .then(unis => {
        const response = {
          UniversityCount: unis.length,
          universities: unis.map(uni => {
            return {
              notes: uni.notes,
              periodStudy: uni.periodStudy,
              price: uni.price,
              language: uni.language,
              educationalLevel: uni.educationalLevel,
              branchName: uni.branchName,
              collegeName: uni.collegeName,
              universityName: uni.universityName
            };
          })
        };
        //eval(locus);
        res.render("main", { data: response });
        // res.status(200).json(response);
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
  } else {
    University.find()
      .exec()
      .then(unis => {
        const response = {
          UniversityCount: unis.length,
          universities: unis.map(uni => {
            return {
              notes: uni.notes,
              periodStudy: uni.periodStudy,
              price: uni.price,
              language: uni.language,
              educationalLevel: uni.educationalLevel,
              branchName: uni.branchName,
              collegeName: uni.collegeName,
              universityName: uni.universityName
            };
          })
        };
        res.render("main", {
          data: response
        });
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
  }
});

// router.post("/", (req, res, next) => {
//   const university = new University({
//     _id: new mongoose.Types.ObjectId(),
//     name: req.body.name,
//     location: req.body.location,
//     price: req.body.price,
//     section: req.body.section
//   });
//   university
//     .save()
//     .then(uni => {
//       res.status(201).json({
//         message: "Added University Successfully",
//         createdUni: {
//           _id: uni._id,
//           name: uni.name,
//           location: uni.location,
//           section: uni.section
//         }
//       });
//     })
//     .catch(err => {
//       res.status(500).json({
//         error: err
//       });
//     });
// });

// router.get("/:uniId", (req, res, next) => {
//   University.findById({ _id: req.params.uniId })
//     .exec()
//     .then(uni => {
//       const university = {
//         _id: uni._id,
//         name: uni.name,
//         location: uni.location,
//         price: uni.price,
//         section: uni.section
//       };
//       res.status(200).json(university);
//     })
//     .catch(err => {
//       res.status(500).json({
//         error: err
//       });
//     });
// });

// router.patch("/:uniId", (req, res, next) => {
//   //Replace the matching universities with the body sent on the request
//   University.updateOne({ _id: req.params.uniId }, { $set: req.body })
//     .exec()
//     .then(uni => {
//       const response = {
//         message: "University Updated!",
//         university: {
//           _id: req.body._id,
//           name: req.body.name,
//           location: req.body.location,
//           price: req.body.price,
//           section: req.body.section
//         }
//       };
//       res.status(200).json(response);
//     })
//     .catch(err => {
//       res.status(500).json({
//         error: err
//       });
//     });
// });

// router.delete("/:uniId", (req, res, next) => {
//   //Replace the matching universities with the body sent on the request
//   University.remove({ _id: req.params.uniId })
//     .exec()
//     .then(uni => {
//       const response = {
//         message: "University Deleted!",
//         university: {
//           _id: req.body._id,
//           name: req.body.name,
//           location: req.body.location,
//           price: req.body.price,
//           section: req.body.section
//         }
//       };
//       res.status(200).json(response);
//     })
//     .catch(err => {
//       res.status(500).json({
//         error: err
//       });
//     });
// });

function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

module.exports = router;
