import nc from 'next-connect';
import {getSession} from 'next-auth/react';

// Utils
import dbConnect from '../../../../utils/dbConnect';

// Schema
import Insurance from '../../../../schemas/InsuranceSchema';

const handler = nc({
  onError: (err, req, res) => {
    console.error(err.stack);
    res.status(500).end('Something broke!');
  },
  onNoMatch: (req, res) => {
    res.status(404).end('Page is not found');
  },
}).delete(async (req, res) => {
  const session = await getSession({req});

  if (!session) {
    return res.status(401).json({
      message: 'You are not authorized',
    });
  }

  const {insId} = req.query;

  if (!insId) {
    return res.status(401).json({
      message: 'You must provide insurance id',
    });
  }

  await dbConnect();

  await Insurance.findByIdAndDelete(insId);

  res.json(200).json({
    message: 'Insurance removed',
  });
});

export default handler;
