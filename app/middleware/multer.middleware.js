/* eslint-disable require-jsdoc */
const multer = require('multer');
const AWS = require('aws-sdk');
const fs = require('fs');
require('dotenv').config();

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/gif': 'gif',
  'image/png': 'png',
  'image/webp': 'webp',
};

if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

console.log(process.env.BUCKET);

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'uploads');
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_').split('.')[0];
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  },
});

const upload = multer({storage: storage}).single('image');

function uploadToS3(file) {
  const fileStream = fs.createReadStream(file.path);

  const uploadParams = {
    Bucket: process.env.BUCKET,
    Body: fileStream,
    Key: file.filename,
  };

  return s3.upload(uploadParams).promise();
}

module.exports = (req, res, next) => {
  upload(req, res, (error) => {
    if (error) {
      return res.status(500).json({error: 'Upload failed'});
    }

    if (!req.file) {
      return res.status(400).json({error: 'No file provided'});
    }

    uploadToS3(req.file)
        .then(() => {
          fs.unlinkSync(req.file.path);
          next();
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).json({error: 'Upload to S3 failed'});
        });
  });
};
