import mongoose, {Schema} from 'mongoose';

const ReservationSchema = new Schema(
  {
    shortId: {
      type: String,
      required: true,
    },
    user: {
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      postalCode: {
        type: String,
        required: true,
      },
    },
    car: {
      type: Schema.Types.ObjectId,
      ref: 'Car',
      required: true,
    },
    insurance: {
      type: Schema.Types.ObjectId,
      ref: 'Insurance',
      required: true,
    },
    pickupPlace: {
      type: String,
      required: true,
    },
    pickupDate: {
      type: Date,
      required: true,
    },
    returnPlace: {
      type: String,
      required: true,
    },
    returnDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const Reservation = mongoose.models.Reservation || mongoose.model('Reservation', ReservationSchema);

export default Reservation;
