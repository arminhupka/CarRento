import nc from 'next-connect';
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
}).get(async (req, res) => {
  await dbConnect();

  const reservations = await Reservation.find();

  res.json(reservations);
});

export default handler;
