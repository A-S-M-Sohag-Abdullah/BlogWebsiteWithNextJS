import { Schema, model, models } from "mongoose";

const commentSchema = new Schema({
  name: String,
  email: String,
  message: String,
  createdAt: { type: Date, default: Date.now },
});

const blogSchema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    coverImage: { type: String, required: true }, // Cloudinary image URL
    categories: [{ type: String }],
    read: { type: Number, default: 0 },
    comments: [commentSchema],
    metaDescription: { type: String, required: true },
    keywords: [String],
  },
  { timestamps: true }
);

const Blog = models.Blog || model("Blog", blogSchema);
export default Blog;
