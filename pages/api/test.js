import {getSession} from 'next-auth/react';

const handler = async (req, res) => {
  const session = await getSession({req});
  console.log(session);
  console.log(session);

  if (!session) {
    return res.status(401).json({
      message: 'error',
    });
  }

  res.send('xd');
};

export default handler;
