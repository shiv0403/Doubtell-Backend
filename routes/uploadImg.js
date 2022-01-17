const multer = require("multer");
const mongoose = require("mongoose");
const router = require("express").Router();
const crypto = require("crypto");
const Img = require("../models/imgUpload");
const path = require("path");
const { GridFsStorage } = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");
const methodOverride = require("method-override");
const { db } = require("../db");

let gfs;

db.once("open", () => {
  gfs = Grid(db.db, mongoose.mongo);
  gfs.collection("uploads");
});

//create storage engine
const storage = new GridFsStorage({
  url: process.env.MONGO_URL,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString("hex") + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: "uploads",
        };
        resolve(fileInfo);
      });
    });
  },
});

// const storage = multer.diskStorage({
//   destination: function (request, file, callback) {
//     callback(null, "./public/uploads/images");
//   },
//   filename: function (request, file, callback) {
//     callback(null, Date.now() + "-" + file.originalname);
//   },
// });

const upload = multer({
  storage: storage,
});

router.get("/doubt-img/:filename", (req, res) => {
  const filename = req.params.filename;
  gfs.files.findOne({ filename }, (err, file) => {
    //if image exists
    if (!file || file.length === 0) {
      res.status(404).send({ err: "file not found!" });
    }
    //  if file is really an image
    if (file.contentType === "image/jpeg" || file.contentType === "image/png") {
      const readStream = gfs.createReadStream(file.filename);
      readStream.pipe(res);
    } else {
      res.status(404).send({ err: "Not an image" });
    }
  });
});

router.post("/doubt-img", upload.single("img"), (req, res) => {
  console.log(req.file);
  const url =
    req.protocol +
    "://" +
    req.get("host") +
    "/api/upload-img/doubt-img/" +
    req.file.filename;

  res.status(201).send({ url });
});

// router.post("/doubt-img", upload.single("img"), (req, res) => {
//   const url = req.protocol + "://" + req.get("host");
//   const img = new Img({
//     img: url + "/api/upload-img/doubt-img/" + req.file.filename,
//   });
//   img
//     .save()
//     .then((result) => {
//       res.status(201).send({
//         msg: "image uploaded successfully",
//         url:
//           "http://localhost:8080/api/upload-img/doubt-img/" + req.file.filename,
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).send({ msg: "failed to upload image" });
//     });
// });

module.exports = router;
