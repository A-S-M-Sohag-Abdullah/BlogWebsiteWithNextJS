// components/BlogSection.tsx
import Image from "next/image";
import Link from "next/link";
import { montserrat } from "./googleFonts/fontsProvider";
import { Fragment } from "react";


interface Blog {
  _id: string;
  title: string;
  slug?: string;
  coverImage: string;
  excerpt?: string;
  categories: string[];
  createdAt: string;
}

interface GetBlogsResponse {
  blogs: Blog[];
  page: number;
  totalPages: number;
  success: boolean;
}

export async function getBlogs(): Promise<Blog[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/blogs?page=1&limit=4`, {
      next: { revalidate: 60 },
    });
    /*  const res = await axios.get<GetBlogsResponse>(`${baseURL}/api/blogs`, {
      params: { page, limit },
    }); */

    if (res.ok) {
      const data: GetBlogsResponse = await res.json();
      return data.blogs;
    }

    throw new Error("Failed to fetch blogs");
  } catch (error) {
    console.error("getBlogs error: BlogSection", error);
    return [];
  }
}

export default async function BlogSection() {
  const featuredBlogs = await getBlogs();

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
      {featuredBlogs.length > 0 ? (
        <>
          {" "}
          <div
            key={featuredBlogs[0]._id}
            className="rounded 
                 col-span-2  overflow-hidden"
          >
            <Link href={`/blog/${featuredBlogs[0]._id}`}>
              <Image
                src={featuredBlogs[0].coverImage}
                alt={featuredBlogs[0].title}
                width={500}
                height={400}
                className="w-full h-96 object-cover bg-gray-300"
              />
              <div className="p-4">
                {featuredBlogs[0].categories.map((category) => (
                  <h5
                    key={category}
                    className="text-xs bg-gray-600 rounded text-white py-1 px-4 w-fit mb-1"
                  >
                    {category}
                  </h5>
                ))}

                <h2
                  className={"text-lg font-medium mb-2 " + montserrat.className}
                >
                  {featuredBlogs[0].title}
                </h2>
              </div>
            </Link>
          </div>
          <div className="col-span-1 flex flex-col space-y-3">
            {featuredBlogs.map((item, index) => (
              <Fragment key={item._id}>
                {index !== 0 && (
                  <div className=" rounded">
                    <Link
                      href={`/blog/${item._id}`}
                      className="flex  space-x-2 rounded items-center"
                    >
                      <Image
                        src={item.coverImage}
                        alt={item.title}
                        width={500}
                        height={400}
                        className="w-48 h-36 object-cover bg-gray-300 rounded"
                      />
                      <div className="p-3">
                        {item.categories.map((category) => (
                          <h5
                            key={category}
                            className="text-xs bg-gray-600 rounded text-white py-1 px-4 w-fit mb-1"
                          >
                            {category}
                          </h5>
                        ))}
                        <h2
                          className={
                            "text-sm font-medium mb-2 " + montserrat.className
                          }
                        >
                          {item.title}
                        </h2>
                      </div>
                    </Link>
                  </div>
                )}
              </Fragment>
            ))}
          </div>
        </>
      ) : (
        <div>no blogs to show</div>
      )}
    </section>
  );
}
