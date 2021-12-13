import aws from 'aws-sdk';
import {getSession} from 'next-auth/react';

const handler = async (req, res) => {
  const session = await getSession({req});

  if (!session) {
    res.writeHead(302, {
      Location: '/',
    });
    // return res.status(401).json({
    //   message: 'You are not authorized',
    // });
  }

  console.log('Trying to download file', 'Wydruk.pdf');
  aws.config.update({
    accessKeyId: process.env.AWS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    region: process.env.AWS_REGION,
  });
  const s3 = new aws.S3();
  const options = {
    Bucket: process.env.AWS_BUCKET,
    Key: 'test/Wydruk.pdf',
  };

  res.setHeader('Content-Disposition', 'attachment');
  const fileStream = s3.getObject(options).createReadStream();
  fileStream.pipe(res);
};

export default handler;
