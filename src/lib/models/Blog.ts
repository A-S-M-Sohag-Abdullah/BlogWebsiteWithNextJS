import  { Schema, model, models } from 'mongoose';

const blogSchema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    coverImage: { type: String, required: true }, // Cloudinary image URL
  },
  { timestamps: true }
);

const Blog = models.Blog || model('Blog', blogSchema);
export default Blog;