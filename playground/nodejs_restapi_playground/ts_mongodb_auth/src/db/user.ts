import mongoose from 'mongoose';

// schema
const UserSchema = new mongoose.Schema({
  username: { type: String, require: true },
  email: { type: String, require: true },
  authentication: {
    password: { type: String, require: true, select: false }, // クエリの結果に含めないようにする
    salt: { type: String, require: true, select: false },
    sessionToken: { type: String, require: true, select: false },
  },
});

export const UserModel = mongoose.model('User', UserSchema);

// mongoose
export const getUsers = () => UserModel.find();
export const getUserByEmail = (email: string) => UserModel.findOne({ email });
export const getUserBySessionToken = (sessionToken: string) =>
  UserModel.findOne({ 'authentication.sessionToken': sessionToken }); // find login user
export const getUserById = (id: string) => UserModel.findById(id);
export const createUser = (values: Record<string, any>) =>
  // 保存に成功した場合は、valuesをJSのオブジェクトにして返す
  new UserModel(values).save().then((user) => user.toObject());
export const deleteUserById = (id: string) =>
  UserModel.findByIdAndDelete({ _id: id });
export const updateUserById = (id: string, values: Record<string, any>) =>
  UserModel.findByIdAndUpdate(id, values);
