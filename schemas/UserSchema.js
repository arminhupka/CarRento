import mongoose, {Schema} from 'mongoose';

const UserSchema = new Schema(
  {
    email: {
      type: 'String',
      required: true,
    },
    password: {
      type: 'String',
      required: true,
    },
    role: {
      type: 'String',
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;
