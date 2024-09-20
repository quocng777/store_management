const multer = require('multer');
const fs = require('fs');
const path = require('path');

const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

console.log(uploadDir)

const storage = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, uploadDir);
    },

    filename: function (req, file, cb) {
        const extension = file.originalname.split('.').pop();
        cb(null, `${file.fieldname}${Date.now()}.${extension}`);
    }
});

module.exports = multer({ storage });