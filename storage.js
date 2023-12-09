const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
require("dotenv").config();

const spacesEndpoint = new aws.Endpoint(process.env.AWS_ENDPOINT);

aws.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_ACCESS_KEY_SECRET,
});

const s3 = new aws.S3({
  endpoint: spacesEndpoint,
});

class Storage {
  constructor() {
    this.init() 
  }

  init () {
    this._folder = this._folder ?? "test-uploads";
    this._bucket = process.env.AWS_BUCKET_NAME + "/" + this._folder;
    this.upload = multer({
      storage: multerS3({
        s3: s3,
        bucket: this._bucket,
        acl: "public-read",
        key: function (request, file, cb) {
          console.log(file);
          cb(null, file.originalname);
        },
      }),
    }).array("upload", 1)
  }

  set folder(folder) { 
    this._folder = folder;
    this.init()
  }

}

module.exports = Storage;
