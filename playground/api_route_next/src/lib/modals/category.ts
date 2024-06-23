import { model, models, Schema } from 'mongoose';

const categorySchema = new Schema(
  {
    title: { type: 'string', require: true },
    // User modelを参照する
    user: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true },
);

const Category = models.Category || model('Category', categorySchema);

export default Category;
