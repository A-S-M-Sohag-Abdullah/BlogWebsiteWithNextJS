const Footer = () => (
  <footer className="bg-[#fef9f2]  mt-12 text-sm">
    <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-2 md:grid-cols-5 gap-8">
      <div>
        <h3 className="font-semibold mb-2">About</h3>
        <p className="text-gray-600 text-xs">© 2025 BUSINESSLY Blog</p>
      </div>
      <div>
        <h3 className="font-semibold mb-2">Company</h3>
        <ul className="space-y-1 text-gray-600 text-xs">
          <li>
            <a href="#">About Us</a>
          </li>
          <li>
            <a href="#">Team</a>
          </li>
        </ul>
      </div>
      <div>
        <h3 className="font-semibold mb-2">Legal</h3>
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
        <h3 className="font-semibold mb-2">Follow Us</h3>
        <ul className="space-y-1 text-gray-600 text-xs">
          <li>
            <a href="#">Facebook</a>
          </li>
          <li>
            <a href="#">Instagram</a>
          </li>
        </ul>
      </div>
      <div>
        <h3 className="font-semibold mb-2">Newsletter</h3>
        <input
          className="border px-2 py-1 text-xs w-full"
          placeholder="Enter email"
        />
        <button className="mt-2 text-xs px-2 py-1 bg-black text-white">
          Subscribe
        </button>
      </div>
    </div>
  </footer>
);

export default Footer;
