// app/stock-market/page.tsx (or pages/stock-market.tsx for older versions)

import Image from "next/image";
import Link from "next/link";

const blogs = [
  {
    id: "1",
    title: "15 Shocking Elon Musk Tweets About Stock Market",
    image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg",
    categories: ["Stock Market"],
    excerpt:
      "Cursus iaculis etiam in In nullam donec sem sed consequat scelerisque nibh amet, massa egestas risus, gravida vel amet...",
  },
  {
    id: "2",
    title: "The Ultimate Guide to Stock Market",
    image:
      "https://res.cloudinary.com/dwa5e34mm/image/upload/v1750658437/gyfetfjqriwmkg2kzidc.jpg",
    categories: ["Editors Pick", "Stock Market"],
    excerpt:
      "Nunc volutpat tortor libero at augue mattis neque, suspendisse aenean praesent sit habitant laoreet felis lorem...",
  },
  {
    id: "3",
    title: "15 Unbelievable Things You Never Knew About Stock Market",
    image: "https://images.pexels.com/photos/7567444/pexels-photo-7567444.jpeg",
    categories: ["Stock Market"],
    excerpt:
      "Nunc volutpat tortor libero at augue mattis neque, suspendisse aenean praesent sit habitant laoreet felis lorem...",
  },
];

export default function StockMarketPage() {
  return (
    <main className="bg-gray-50 py-10 px-4 md:px-16">
      <h1 className="text-3xl font-bold text-blue-800 mb-6">Stock Market</h1>
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-10">
        {/* Main Content */}
        <div className="lg:col-span-3 space-y-12">
          {blogs.map((blog) => (
            <article key={blog.id} className="border-b pb-10">
              <Image
                src={blog.image}
                alt={blog.title}
                width={600}
                height={350}
                className="w-full h-96"
              />
              <h2 className="text-xl font-semibold text-gray-800 mb-1">
                {blog.title}
              </h2>
              <div className="text-sm text-blue-600 font-medium mb-2 space-x-2">
                {blog.categories.map((cat) => (
                  <span key={cat}>{cat}</span>
                ))}
              </div>
              <p className="text-gray-600 text-sm mb-2">{blog.excerpt}</p>
              <a
                href="#"
                className="text-sm font-medium text-blue-600 hover:underline"
              >
                Read More →
              </a>
            </article>
          ))}
        </div>

        {/* Sidebar */}
        <aside className="space-y-10">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Recent blogs
            </h3>
            <ul className="space-y-2 text-sm text-blue-700">
              <li>
                <a href="#" className="hover:underline">
                  15 Shocking Elon Musk Tweets About Stock Market
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Want a Career in Technology? Make This Your Secret Weapon
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  The Health Industry Is Changing Fast
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Everything You Ever Wanted to Know About Technology
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  The Frightening Affect of Climate Change on Government
                </a>
              </li>
            </ul>
          </div>

          <div>
            <Image
              src="https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg"
              alt="Sidebar Ad"
              width={500}
              height={700}
              className="w-full "
            />
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Categories
            </h3>

            <ul className="space-y-2 text-sm text-gray-700">
              {[
                { name: "Automobile", count: 4 },
                { name: "Editors Pick", count: 6 },
                { name: "Guests blogs", count: 2 },
                { name: "Health", count: 6 },
                { name: "Must Read", count: 3 },
                { name: "Politics", count: 5 },
                { name: "Stock Market", count: 8 },
                { name: "Technology", count: 6 },
              ].map((cat) => (
                <li key={cat.name}>
                  <Link
                    href={`/${cat.name.toLowerCase().replace(/\s+/g, "-")}`}
                    className="hover:underline"
                  >
                    {cat.name} ({cat.count})
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </main>
  );
}
