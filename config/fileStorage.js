const multer = require("multer")
const path = require("path")
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, __dirname+'./public/images')
    },
    filename: function (req, file, cb) {
      cb(null,req.body.name+path.extname(file.originalname))
    }
  })

module.exports = multer({storage});