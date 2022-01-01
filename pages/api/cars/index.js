import nc from 'next-connect';
import {getSession} from 'next-auth/react';
import slugify from 'slugify';
import mongoose from 'mongoose';

// Utils
import dbConnect from '../../../utils/dbConnect';

// Schemas
import Car from '../../../schemas/CarSchema';
import Brand from '../../../schemas/BrandSchema';
import upload from '../../../utils/upload';

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = nc({
  onError: (err, req, res) => {
    console.error(err.stack);
    res.status(500).end('Something broke!');
  },
  onNoMatch: (req, res) => {
    res.status(404).end('Page is not found');
  },
})
  .use(upload.single('file'))
  .get(async (req, res) => {
    const {limit} = req.query;

    await dbConnect();

    const cars = await Car.find({})
      .populate({
        path: 'brand',
        select: {
          name: 1,
        },
      })
      .limit(Number(limit) || 0)
      .sort({date: 1});

    await mongoose.disconnect();

    res.json(cars);
  })
  .post(async (req, res) => {
    const session = await getSession({req});

    if (!session) {
      return res.status(401).json({
        message: 'You are not authorized',
      });
    }

    if (session.user.role !== 'admin') {
      return res.status(401).json({
        message: "You can't do that",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        message: 'You must provide image',
      });
    }

    const imageUri = req.file.location;
    const {model, brand, description, type, fuel, hp, engine, transmission, productionYear, seats, price} = req.body;
    console.log(price);

    if (
      !model ||
      !brand ||
      !description ||
      !type ||
      !fuel ||
      !hp ||
      !engine ||
      !transmission ||
      !productionYear ||
      !seats ||
      !price
    ) {
      return res.status(200).json({
        message: 'You must provide all data',
      });
    }

    const selectedBrand = await Brand.findById(brand);

    await mongoose.disconnect();

    if (!selectedBrand) {
      return res.status(401).json({
        message: 'You provided wrong brand',
      });
    }

    const newCar = await Car.create({
      model,
      image: imageUri,
      description,
      slug: slugify(`${selectedBrand.name} ${model}`.toLowerCase()),
      type,
      brand: selectedBrand._id,
      featured: false,
      specification: {
        fuel,
        hp,
        engine,
        transmission,
        productionYear,
        seats,
      },
      equipment: [],
      price,
    });

    await mongoose.disconnect();

    return res.status(201).json(newCar);
  });

export default handler;
