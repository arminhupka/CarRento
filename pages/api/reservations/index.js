import nc from 'next-connect';
import {getSession} from 'next-auth/react';
import {nanoid} from 'nanoid';

// Utils
import dbConnect from '../../../utils/dbConnect';

// Schemas
import Reservation from '../../../schemas/ReservationSchema';
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
    const session = await getSession({req});

    if (!session) {
      return res.json({message: 'No authorization'});
    }

    await dbConnect();

    const reservations = await Reservation.find().populate({
      path: 'car',
      populate: {
        path: 'brand',
        select: {
          name: 1,
        },
      },
    });

    return res.json(reservations);
  })
  .post(async (req, res) => {
    const {
      user: {firstName, lastName, email, phone, address, city, postalCode},
      car,
      insurance,
      pickupPlace,
      pickupDate,
      returnPlace,
      returnDate,
    } = req.body;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !address ||
      !city ||
      !postalCode ||
      !car ||
      !insurance ||
      !pickupPlace ||
      !pickupDate ||
      !returnPlace ||
      !returnDate
    ) {
      return res.status(400).json({
        message: 'You must provide all data',
      });
    }

    const shortId = nanoid(8).toUpperCase();

    await Reservation.create({
      shortId,
      user: {
        firstName,
        lastName,
        email,
        phone,
        address,
        city,
        postalCode,
      },
      car,
      insurance,
      pickupPlace,
      pickupDate,
      returnPlace,
      returnDate,
      status: 'new',
    });

    return res.status(201).json({
      shortId,
      message: 'Reservation created',
    });
  });

export default handler;
