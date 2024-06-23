import { model, models, Schema } from 'mongoose';

const userSchema = new Schema(
  {
    email: { type: 'string', require: true, unique: true },
    username: { type: 'string', require: true, unique: true },
    password: { type: 'string', require: true },
  },
  {
    timestamps: true,
  },
);

const User = models.User || model('User', userSchema);

export default User;
