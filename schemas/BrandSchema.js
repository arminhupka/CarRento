import {model, models, Schema} from 'mongoose';

const BrandSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  cars: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Car',
    },
  ],
});

const Brand = models.Brand || model('Brand', BrandSchema);

export default Brand;
