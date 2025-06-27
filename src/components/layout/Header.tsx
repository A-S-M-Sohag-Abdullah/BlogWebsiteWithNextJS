import { michroma } from "../googleFonts/fontsProvider";
import NavSearchBar from "./NavSearchBar";

const Header = () => (
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
        <a href="#">Home</a>
        <a href="#">Stock Market</a>
        <a href="#">Technology</a>
        <a href="#">Politics</a>
        <a href="#">Health</a>
        <a href="#">Automobile</a>
        <a href="#">Newsletter</a>
      </nav>
    </div>

    <button className="px-5 py-3 w-40 bg-white text-yellow-400 text-sm border border-black">Subscribe</button>
  </header>
);

export default Header;
