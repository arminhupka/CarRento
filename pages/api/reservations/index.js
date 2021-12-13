import nc from 'next-connect';
import dbConnect from '../../../utils/dbConnect';

// Schema
import Reservation from '../../../schemas/ReservationSchema';
import {getSession} from 'next-auth/react';

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
    const {firstName, lastName, email, phone, address, city, postalCode} = req.body;

    if (!firstName || !lastName || !email || !phone || !address || !city || !postalCode) {
      return res.status(400).json({
        message: 'You must provide all data',
      });
    }

    await Reservation.create({
      firstName,
      lastName,
      email,
      phone,
      address,
      city,
      postalCode,
    });

    res.status(201).json({
      message: 'Reservation created',
    });
  });

export default handler;
