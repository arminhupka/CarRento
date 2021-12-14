import nc from 'next-connect';
import {getSession} from 'next-auth/react';

// Utils
import dbConnect from '../../../../utils/dbConnect';

// Schemas
import Brand from '../../../../schemas/BrandSchema';
// eslint-disable-next-line no-unused-vars
import Car from '../../../../schemas/CarSchema';

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
    const {id} = req.query;

    await dbConnect();

    const brand = await Brand.findById(id);

    return res.json(brand);
  })
  .delete(async (req, res) => {
    const session = await getSession({req});

    if (!session) {
      return res.status(401).json({
        message: 'Unauthorized',
      });
    }

    const {id} = req.query;

    await dbConnect();

    const brand = await Brand.findById(id);

    if (!brand) {
      return res.status(404).json({
        message: 'Brand not found',
      });
    }

    await Brand.findByIdAndDelete(id);

    return res.json({
      message: `Brand ${brand.name} removed`,
    });
  });
export default handler;
