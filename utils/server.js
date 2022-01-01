const dev = process.env.NODE_ENV !== 'production';

const server = dev ? 'http://localhost:3000' : process.env.HOST;

export default server;
