import nc from 'next-connect';
import {getSession} from 'next-auth/react';

// Utils
import dbConnect from '../../../utils/dbConnect';

// Schema
import Insurance from '../../../schemas/InsuranceSchema';

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

    const insurances = await Insurance.find();

    return res.json(insurances);
  })
  .post(async (req, res) => {
    const session = await getSession({req});

    if (!session) {
      return res.status(401).json({
        message: 'You are not authorized',
      });
    }

    const {
      name,
      price,
      oc,
      participationInTheDamage,
      assistance,
      windowsDamage,
      wheelsDamage,
      totalDamage,
      steal,
      replacementCar,
    } = req.body;

    console.log(req.body);

    if (
      !name ||
      !price ||
      !oc ||
      !participationInTheDamage ||
      !assistance ||
      !windowsDamage ||
      !wheelsDamage ||
      !totalDamage ||
      !steal ||
      !replacementCar
    ) {
      return res.status(400).json({
        message: 'You must provide all data',
      });
    }

    await dbConnect();

    await Insurance.create({
      name,
      price,
      oc,
      participationInTheDamage,
      assistance,
      windowsDamage,
      wheelsDamage,
      totalDamage,
      steal,
      replacementCar,
    });

    return res.status(201).json({
      message: 'Insurance created',
    });
  });

export default handler;
