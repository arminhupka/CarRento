import {model, models, Schema} from 'mongoose';

const CarSchema = new Schema(
  {
    model: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    brand: {
      type: Schema.Types.ObjectId,
      ref: 'Brand',
    },
    price: {
      type: Number,
      required: true,
    },
    featured: {
      type: Boolean,
      required: true,
    },
    specification: {
      fuel: {
        type: String,
        required: true,
      },
      hp: {
        type: Number,
        required: true,
      },
      engine: {
        type: String,
        required: true,
      },
      transmission: {
        type: String,
        required: true,
      },
      productionYear: {
        type: Number,
        required: true,
      },
      seats: {
        type: Number,
        required: true,
      },
    },
    equipment: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const Car = models.Car || model('Car', CarSchema);

export default Car;
