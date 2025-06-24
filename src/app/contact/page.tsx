export default function ContactPage() {
  return (
    <main className="bg-[#f9f6ef] text-[#141414] p-8 md:p-16">
      <section className="max-w-6xl mx-auto space-y-8">
        {/* Page Title */}
        <h1 className="text-5xl font-extrabold">Contact</h1>

        {/* News Tips Section */}
        <div className="grid md:grid-cols-2 gap-8 border-b pb-8">
          <h2 className="text-xl font-bold">News Tips</h2>
          <div className="text-gray-700 space-y-4 text-[15px] leading-relaxed">
            <p>
              Condimentum nullam donec et interdum et bibendum et quam magna ut
              at netus neque id lectus neque iaculis sit penatibus amet viverra
              aliquet quisque purus praesent. Please drop us a note at{" "}
              <a href="mailto:tips@example.com" className="text-orange-500">
                tips@example.com
              </a>
              .
            </p>
            <p>
              Arcu commodo, blandit diam condimentum dolor cras penatibus
              viverra egestas.
            </p>
          </div>
        </div>

        {/* Contact Info Grid */}
        <div className="grid md:grid-cols-3 gap-8 border-b pb-8">
          {/* Customer Service */}
          <div>
            <h3 className="font-bold text-lg mb-2">Customer Service</h3>
            <p className="text-orange-500 flex items-center gap-2 text-sm mb-1">
              📧{" "}
              <a href="mailto:customerservice@example.com">
                customerservice@example.com
              </a>
            </p>
            <p className="text-orange-500 flex items-center gap-2 text-sm">
              📞 <a href="tel:+11234567890">+1 123-456-7890</a>
            </p>
          </div>

          {/* Advertising */}
          <div>
            <h3 className="font-bold text-lg mb-2">
              Advertising & Sponsorships
            </h3>
            <p className="text-sm text-gray-700">
              Eget massa scelerisque vulputate egestas sed at quisque in massa
              praesent sit dapibus est integer quis{" "}
              <a href="#" className="text-orange-500 underline">
                complete this form
              </a>
            </p>
          </div>

          {/* Events Related */}
          <div>
            <h3 className="font-bold text-lg mb-2">Events Related Inquiries</h3>
            <p className="text-sm text-gray-700">
              Semper integer aliquam aliquet lobortis orci quam convallis in
              lobortis commodo integer consequat feugiat eleifend{" "}
              <a href="mailto:events@example.com" className="text-orange-500">
                events@example.com
              </a>
            </p>
          </div>
        </div>

        {/* Address + Map */}
        <div className="grid md:grid-cols-2 gap-8 pt-8">
          <div>
            <h3 className="font-bold text-lg mb-2">Businessly</h3>
            <p className="text-sm text-gray-700 flex items-start gap-2">
              📍 123 Demo St, Miami, FL 45678, <br />
              United States.
            </p>
          </div>
          <div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3582.009269267958!2d-80.19255802412324!3d25.761679608425444!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88d9b69c1a9300df%3A0x9c6f60d9c48a0ba4!2sBrickell%20City%20Centre!5e0!3m2!1sen!2sus!4v1719172800000!5m2!1sen!2sus"
              width="100%"
              height="250"
              className="rounded-md border"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>
    </main>
  );
}
