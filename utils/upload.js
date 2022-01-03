import aws from 'aws-sdk';
import multer from 'multer';
import multerS3 from 'multer-s3';

aws.config.update({
  accessKeyId: process.env.AWS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRETKEY,
  region: process.env.AWS_REGION_NAME,
});

const s3 = new aws.S3({});

const upload = multer({
  storage: multerS3({
    s3,
    bucket: process.env.AWS_BUCKET,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata(req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key(req, file, cb) {
      cb(null, `${Date.now().toString()}_${file.originalname}`);
    },
  }),
});

export default upload;
