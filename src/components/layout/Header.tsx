import { michroma } from "../googleFonts/fontsProvider";

const Header = () => (
  <header className=" ">
    <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col items-center justify-between space-y-4">
      <h1 className={`text-2xl font-bold ${michroma.className}`}>
        THE BANGLA BARTA 
      </h1>
      <nav className={"space-x-4 [&_a]:text-yellow-400 [&_a:hover]:text-yellow-600 " + michroma.className} >
        <a href="#">Home</a>
        <a href="#">Stock Market</a>
        <a href="#">Technology</a>
        <a href="#">Politics</a>
        <a href="#">Health</a>
        <a href="#">Automobile</a>
        <a href="#">Newsletter</a>
      </nav>
    </div>
  </header>
);

export default Header;
