module.exports = {
  reactStrictMode: true,
  images: {
    domains: [
      `${process.env.AWS_BUCKET}.s3.amazonaws.com`,
      `${process.env.AWS_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com`,
    ],
  },
};
