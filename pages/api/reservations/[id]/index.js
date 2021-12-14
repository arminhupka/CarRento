import nc from 'next-connect';
import {getSession} from 'next-auth/react';
import {nanoid} from 'nanoid';

// Utils
import dbConnect from '../../../../utils/dbConnect';

// Schemas
import Reservation from '../../../../schemas/ReservationSchema';
import Car from '../../../../schemas/CarSchema';
import Brand from '../../../../schemas/BrandSchema';
import reservations from '../index';

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
    const session = await getSession({req});

    if (!session) {
      return res.json({message: 'No authorization'});
    }

    const {id} = req.query;

    await dbConnect();

    const reservation = await Reservation.findById(id).populate({
      path: 'car',
      populate: {
        path: 'brand',
        select: {
          name: 1,
        },
      },
    });

    return res.json(reservation);
  })
  .patch(async (req, res) => {
    const session = await getSession({req});

    if (!session) {
      return res.json({message: 'No authorization'});
    }

    const {id} = req.query;
    const {status} = req.body;

    if (!id) {
      return res.status(400).json({
        message: 'You must provide reservation id',
      });
    }

    if (!status) {
      return res.status(400).json({
        message: 'You must provide new status',
      });
    }

    await Reservation.findByIdAndUpdate(id, {$set: {status}});

    return res.json({
      message: 'Reservation updated',
    });
  });

export default handler;
