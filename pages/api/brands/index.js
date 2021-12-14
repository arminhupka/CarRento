import nc from 'next-connect';
import {getSession} from 'next-auth/react';
import slugify from 'slugify';

// Utils
import dbConnect from '../../../utils/dbConnect';

// Schemas
import Car from '../../../schemas/CarSchema';
import Brand from '../../../schemas/BrandSchema';

const handler = nc({
  onError: (err, req, res) => {
    console.error(err.stack);
    res.status(500).end('Something broke!');
  },
  onNoMatch: (req, res) => {
    res.status(404).end('Page is not found');
  },
})
  .get(async (req, res) => {
    await dbConnect();

    const brands = await Brand.find({}).sort({name: 1});

    res.json(brands);
  })
  .post(async (req, res) => {
    const session = await getSession({req});

    if (!session) {
      return res.status(401).end('You are not authorized');
    }

    const {name} = req.body;

    await dbConnect();

    await Brand.create({
      name,
      slug: slugify(name.toLowerCase()),
    });

    res.json({
      message: `Brand ${name} created`,
    });
  });

export default handler;
