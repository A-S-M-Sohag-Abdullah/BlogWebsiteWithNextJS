import BlogCommentBox from "@/components/SmallForms/BlogCommentBox";
import {  roboto } from "@/components/googleFonts/fontsProvider";
import { Blog } from "@/types";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ blogId: string }>;
}) {
  const { blogId } = await params;
  const res = await axios.get<{ success: boolean; blog: Blog }>(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/blogs/${blogId}`
  );
  const blog = res.data.blog;

  const categoryFetches = await Promise.all(
    blog.categories.map((cat) =>
      fetch(
        `${process.env.NEXT_PUBLIC_SITE_URL}/api/blogs/by-category?name=${cat}&limit=5`
      )
    )
  );

  const allResults = await Promise.all(
    categoryFetches.map((res) => res.json())
  );

  const relatedBlogsMap = new Map<string, Blog>();


  allResults.forEach(({ blogs }) => {
    blogs?.forEach((b: Blog) => {
      if (b._id !== blogId && !relatedBlogsMap.has(b._id)) {
        relatedBlogsMap.set(b._id, b); // Avoid duplicates
      }
    });
  });

  const mustReadBlogs = Array.from(relatedBlogsMap.values());

  return (
    <main className="bg-[#fdf7ef] py-10 px-4 md:px-8">
      <article className="max-w-4xl mx-auto bg-white p-6 md:p-10 rounded-md">
        <Image
          src={blog.coverImage}
          alt={blog.title}
          width={800}
          height={400}
          className="rounded-md w-full h-auto mb-6"
        />

        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          {blog.title}
        </h1>

        <div className="text-sm text-gray-600 mb-6">
          <Link href="#" className="text-orange-600 hover:underline">
            Leave a Comment
          </Link>
          <span className="mx-1">/</span>
          {blog.categories.map((cat, idx) => (
            <span key={idx}>
              <Link
                href={`/category/${cat.toLowerCase()}`}
                className="text-orange-600 hover:underline"
              >
                {cat}
              </Link>
              {idx !== blog.categories.length - 1 && (
                <span className="mx-1">/</span>
              )}
            </span>
          ))}
          <span className="mx-1">/</span>
          By <span className="text-black font-medium">admin</span>
        </div>

        <section
          className="prose max-w-none prose-p:text-gray-700 prose-h2:font-semibold flow-root mb-10"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
        <h2 className={`font-bold text-2xl mb-2  ${roboto.className}`}>
          Comments
        </h2>
        {blog.comments.length === 0 ? (
          <p className="text-gray-600">
            No comments yet. Be the first to comment!
          </p>
        ) : (
          <div className="space-y-6">
            {blog.comments.map((comment, idx) => (
              <div key={idx} className="border border-gray-200 rounded-md p-4">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-sm font-semibold text-gray-800">
                    {comment.name}
                  </p>
                  <span className="text-xs text-gray-500">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-gray-700">{comment.message}</p>
              </div>
            ))}
          </div>
        )}
      </article>

      <BlogCommentBox blogId={blog._id}></BlogCommentBox>

      {/*must read section */}
      <section className="max-w-4xl mx-auto mt-12 bg-white p-6 md:p-10 rounded-md">
        <h3 className="text-xl font-bold mb-6">Must Read</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {mustReadBlogs.map((post: Blog) => (
            <div key={post._id}>
              <div>
                <Link href={`/blog/${post._id}`}>
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    width={600}
                    height={300}
                    className="rounded-md w-full h-48 mb-3 object-cover"
                  />
                </Link>

                <Link
                  href={`/blog/${post._id}`}
                  className="font-semibold text-gray-900"
                >
                  {post.title}
                </Link>
                <div className="text-sm text-orange-600 space-x-1">
                  {post.categories.map((cat) => (
                    <Link
                      key={cat}
                      href={`/category/${cat.toLowerCase()}`}
                      className="hover:underline"
                    >
                      {cat}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
