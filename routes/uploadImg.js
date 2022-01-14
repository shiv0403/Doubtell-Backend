const multer = require("multer");
const router = require("express").Router();
const Img = require("../models/imgUpload");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (request, file, callback) {
    callback(null, "./public/uploads/images");
  },
  filename: function (request, file, callback) {
    callback(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({
  storage: storage,
});

router.get("/doubt-img/:imgId", (req, res) => {
  const imgId = req.params.imgId;
  const reqPath = path.join(__dirname, "../");
  console.log(imgId);
  res.sendFile(reqPath + "/public/uploads/images/" + imgId);
});

router.post("/doubt-img", upload.single("img"), (req, res) => {
  const url = req.protocol + "://" + req.get("host");
  const img = new Img({
    img: url + "/api/upload-img/doubt-img/" + req.file.filename,
  });
  img
    .save()
    .then((result) => {
      res.status(201).send({
        msg: "image uploaded successfully",
        url:
          "http://localhost:8080/api/upload-img/doubt-img/" + req.file.filename,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ msg: "failed to upload image" });
    });
});

module.exports = router;
