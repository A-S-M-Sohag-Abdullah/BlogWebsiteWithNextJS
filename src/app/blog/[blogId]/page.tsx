import axios from "axios";
import Image from "next/image";
import Link from "next/link";

interface Blog {
  _id: string;
  title: string;
  slug: string;
  coverImage: string;
  content: string;
  categories: string[];
  createdAt: string;
}


export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ blogId: string }>
}) {
  const { blogId } = await params;
  const res = await axios.get<{ success: boolean; blog: Blog }>(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/blogs/${blogId}`
  );
  const blog = res.data.blog;
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
          className="prose max-w-none prose-p:text-gray-700 prose-h2:font-semibold"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </article>

      <section className="max-w-4xl mx-auto mt-12 bg-white p-6 md:p-10 rounded-md">
        <h3 className="text-xl font-bold mb-6">Must Read</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {[
            {
              title: "The Incredible Stock Market Product I Can’t Live Without",
              image:
                "https://images.pexels.com/photos/3943721/pexels-photo-3943721.jpeg",
              categories: ["Must Read", "Stock Market"],
            },
            {
              title: "Fact Check: 12 Common Misconceptions About Stock Market",
              image:
                "https://images.pexels.com/photos/4386372/pexels-photo-4386372.jpeg",
              categories: ["Guests Posts", "Stock Market"],
            },
          ].map((post, idx) => (
            <div key={idx}>
              <Image
                src={post.image}
                alt={post.title}
                width={600}
                height={300}
                className="rounded-md w-full h-48 mb-3"
              />
              <h4 className="font-semibold text-gray-900">{post.title}</h4>
              <div className="text-sm text-orange-600 space-x-1">
                {post.categories.map((cat) => (
                  <Link
                    key={cat}
                    href={`/${cat.toLowerCase().replace(/\s+/g, "-")}`}
                    className="hover:underline"
                  >
                    {cat}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-4xl mx-auto mt-12 bg-white p-6 md:p-10 rounded-md">
        <h3 className="text-xl font-bold mb-2">Leave a Comment</h3>
        <p className="text-sm text-gray-600 mb-6">
          Your email address will not be published. Required fields are marked *
        </p>
        <form className="space-y-4">
          <textarea
            placeholder="Type here..."
            className="w-full h-32 p-3 bg-gray-100 rounded-md"
          ></textarea>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input placeholder="Name*" className="p-3 bg-gray-100 rounded-md" />
            <input
              placeholder="Email*"
              className="p-3 bg-gray-100 rounded-md"
            />
            <input
              placeholder="Website"
              className="p-3 bg-gray-100 rounded-md"
            />
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="saveInfo"
              className="accent-orange-600"
            />
            <label htmlFor="saveInfo" className="text-sm text-gray-700">
              Save my name, email, and website in this browser for the next time
              I comment.
            </label>
          </div>
          <button
            type="submit"
            className="bg-orange-400 px-4 py-3 font-semibold hover:bg-orange-500 cursor-pointer text-white"
          >
            Post Comment »
          </button>
        </form>
      </section>
    </main>
  );
}
