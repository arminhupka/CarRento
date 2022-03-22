module.exports = {
  reactStrictMode: true,
  images: {
    domains: [`${process.env.AWS_BUCKET}.${process.env.AWS_ENDPOINT}`],
  },
};
