const multer = require("multer");
const mongoose = require("mongoose");
const router = require("express").Router();
const crypto = require("crypto");
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
        console.log(filename);
        const fileInfo = {
          filename: filename,
          bucketName: "uploads",
        };
        resolve(fileInfo);
      });
    });
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1 * 1024 * 1024,
  },
});

// router.get("/doubt-img/:filename", (req, res) => {
//   const filename = req.params.filename;
//   gfs.files.findOne({ filename }, (err, file) => {
//     //if image exists
//     if (!file || file.length === 0) {
//       res.status(404).send({ err: "file not found!" });
//     }
//     //  if file is really an image
//     if (file.contentType === "image/jpeg" || file.contentType === "image/png") {
//       const readStream = gfs.createReadStream(file.filename);
//       readStream.pipe(res);
//     } else {
//       res.status(404).send({ err: "Not an image" });
//     }
//   });
// });

router.post("/doubt-img/images", upload.array("img", 5), (req, res) => {
  console.log("files", req.files);

  res.status(201).send(req.files);
});

module.exports = router;
