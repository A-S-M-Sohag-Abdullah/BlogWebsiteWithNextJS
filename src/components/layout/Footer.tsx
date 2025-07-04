import Link from "next/link";
import NewsletterForm from "../SmallForms/NewsLetter";

const Footer = () => (
  <footer className="bg-[#fef9f2]  mt-12 text-sm">
    <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-2 md:grid-cols-5 gap-8">
      <div>
        <h3 className="font-semibold text-lg mb-2">About</h3>
        <p className="text-gray-600 text-xs">© 2025 BUSINESSLY Blog</p>
      </div>
      <div>
        <h3 className="font-semibold text-lg mb-2">Company</h3>
        <ul className="space-y-1 text-gray-600 text-xs">
          <li>
            <Link href="/about">About Us</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
        </ul>
      </div>
      <div>
        <h3 className="font-semibold text-lg mb-2">Legal</h3>
        <ul className="space-y-1 text-gray-600 text-xs">
          <li>
            <a href="#">Privacy</a>
          </li>
          <li>
            <a href="#">Terms</a>
          </li>
        </ul>
      </div>
      <div>
        <h3 className="font-semibold text-lg mb-2">Follow Us</h3>
        <ul className="space-y-1 text-gray-600 text-xs">
          <li>
            <Link href="#">Facebook</Link>
          </li>
          <li>
            <Link href="#">Instagram</Link>
          </li>
        </ul>
      </div>
      <NewsletterForm />
    </div>
  </footer>
);

export default Footer;
