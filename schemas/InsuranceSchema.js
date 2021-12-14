import mongoose, {Schema} from 'mongoose';

const InsuranceSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    oc: {
      type: Boolean,
      required: true,
    },
    participationInTheDamage: {
      type: Number,
      required: true,
    },
    assistance: {
      type: Boolean,
      required: true,
    },
    windowsDamage: {
      type: Boolean,
      required: true,
    },
    wheelsDamage: {
      type: Boolean,
      required: true,
    },
    totalDamage: {
      type: Number,
      required: true,
    },
    steal: {
      type: Number,
      required: true,
    },
    replacementCar: {
      type: Boolean,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const Insurance = mongoose.models.Insurance || mongoose.model('Insurance', InsuranceSchema);

export default Insurance;
