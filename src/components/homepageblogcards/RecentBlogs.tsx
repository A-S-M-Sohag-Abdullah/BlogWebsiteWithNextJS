import { montserrat } from "../googleFonts/fontsProvider";
import axios from "axios";

interface Blog {
  _id: string;
  title: string;
  slug?: string;
  coverImage: string;
  excerpt?: string;
  categories: string[];
  createdAt: string;
}

interface GetBlogsByCategoryResponse {
  success: boolean;
  blogs: Blog[];
  page: number;
  totalPages: number;
}

export async function getBlogs(page = 1, limit = 6): Promise<Blog[]> {
  try {
    const isServer = typeof window === "undefined";

    const baseURL = isServer
      ? process.env.NEXT_PUBLIC_SITE_URL ||
        "https://your-vercel-site.vercel.app"
      : "";
    const res = await axios.get<GetBlogsByCategoryResponse>(
      `${baseURL}/api/blogs`,
      {
        params: { page, limit },
      }
    );

    if (res.data.success) {
      return res.data.blogs;
    }

    throw new Error("Failed to fetch blogs by category");
  } catch (error) {
    console.error("getBlogs error RecentBlogs:", error);
    return [];
  }
}

export default async function RecentBlogs() {
  const recentBlogs = await getBlogs();

  return (
    <section className="grid grid-cols-1 md:grid-cols-6 gap-6 mb-12">
      {recentBlogs.map((item) => (
        <div key={item._id} className="col-span-1 flex space-y-3">
          <div className="p-3">
            {item.categories.map((category, index) => (
              <h5
                key={index}
                className="text-xs bg-gray-600 rounded text-white py-1 px-4 w-fit mb-1"
              >
                {category}
              </h5>
            ))}

            <h2
              className={
                "text-sm text-justify font-bold mb-2  leading-5 " +
                montserrat.className
              }
            >
              {item.title}
            </h2>
          </div>
        </div>
      ))}
    </section>
  );
}
