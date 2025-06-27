type BlogComments = {
  name: string;
  email: string;
  message: string;
  createdAt: string;
};
export type Blog = {
  _id: string;
  title: string;
  content: string;
  metaDescription: string;
  coverImage: string;
  categories: string[];
  createdAt: string;
  keywords: string[];
  comments: BlogComments[];
};
