import { model, models, Schema } from 'mongoose';

const blogSchema = new Schema(
  // user と category ２つに関係を持つ
  {
    title: { type: 'string', require: true },
    description: { type: 'string', require: true },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    category: { type: Schema.Types.ObjectId, ref: 'Category' },
  },
  {
    timestamps: true,
  },
);

const Blog = models.Blog || model('Blog', blogSchema);

export default Blog;
