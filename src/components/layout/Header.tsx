import Link from "next/link";
import { michroma } from "../googleFonts/fontsProvider";
import NavSearchBar from "./NavSearchBar";
import { Category } from "@/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

const Header = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/categoriesblogcount`,
    {
      cache: "no-store", // ensure SSR fresh data
    }
  );

  const data = await res.json();
  const categories: Category[] = data.categories || [];
  return (
    <header className="flex justify-center items-center px-5 relative">
      <NavSearchBar></NavSearchBar>

      <div className="w-fit mx-auto py-4  space-y-4">
        <h1
          className={`text-2xl font-bold ${michroma.className} flex w-full text-center items-center`}
        >
          <div className="w-fit mx-auto text-center">THE BANGLA BARTA</div>
        </h1>
        <nav
          className={
            "space-x-4 [&_a]:text-yellow-400 [&_a:hover]:text-yellow-600 flex justify-center " +
            michroma.className
          }
        >
          <Link href="/">Home</Link>
          <Link href="/Entertainment">Entertainment</Link>
          <Link href="/Technology">Technology</Link>
          <Link href="/Politics">Politics</Link>
          <Link href="/Health">Health</Link>
          <Link href="/Automobile">Automobile</Link>
          <div className="relative group">
            <button className="text-yellow-400  hover:text-yellow-600 transition rounded">
              All Categories{" "}
              <FontAwesomeIcon icon={faAngleDown} className="w-5" />
            </button>
            <div className="absolute hidden group-hover:block bg-[#fef9f2]  shadow-md mt-2  z-50 w-max right-0 top-[15px]">
              <ul className="grid grid-cols-4 w-auto">
                {categories.map((cat) => (
                  <li key={cat._id}>
                    <Link
                      href={`/${cat.name}`}
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      {cat.name}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href={`/All`}
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    See All Blogs
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>

      <Link
        href={"/subscribe"}
        className="px-5 py-3 w-40 bg-white text-yellow-400 text-sm border border-black text-center"
      >
        Subscribe
      </Link>
    </header>
  );
};

export default Header;
