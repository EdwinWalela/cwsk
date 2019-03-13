const multer = require("multer")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, __dirname+'/public')
    },
    filename: function (req, file, cb) {
      cb(null,'file-name')
    }
  })

module.exports = multer({storage});