import nc from 'next-connect';
import {getSession} from 'next-auth/react';

// Utils
import dbConnect from '../../../../utils/dbConnect';

// Schemas
import Car from '../../../../schemas/CarSchema';
import Brand from '../../../../schemas/BrandSchema';

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
    const {slug} = req.query;

    await dbConnect();

    const car = await Car.findOne({slug}).populate({
      path: 'brand',
      select: {
        name: 1,
      },
    });

    if (!car) {
      return res.status(404).json({
        message: 'Car not found',
      });
    }

    return res.json(car);
  })
  .delete(async (req, res) => {
    const session = await getSession({req});

    if (!session) {
      return res.status(401).json({
        message: 'You are not authorized',
      });
    }

    const {slug: id} = req.query;

    if (!id) {
      return res.status(400).json({
        message: 'You must provide car id',
      });
    }

    const carExist = await Car.findById(id);

    if (!carExist) {
      return res.status(404).json({
        message: 'Car with provided ID not exist',
      });
    }

    await Car.findByIdAndRemove(id);

    res.json({
      message: 'Car removed successfully',
    });
  });

export default handler;
