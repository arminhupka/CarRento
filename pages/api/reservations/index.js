import nc from 'next-connect';
import {getSession} from 'next-auth/react';

// Utils
import dbConnect from '../../../utils/dbConnect';

// Schema
import Reservation from '../../../schemas/ReservationSchema';

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
      return res.status(401).json({
        message: 'You are not authorized',
      });
    }

    await dbConnect();

    const reservations = await Reservation.find();

    res.json(reservations);
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

    await Reservation.create({
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
    });

    res.status(201).json({
      message: 'Reservation created',
    });
  });

export default handler;
