import Image from "next/image";

export default function AboutPage() {
  return (
    <main className="bg-[#f9f6ef] text-[#141414] p-8 md:p-16">
      {/* Heading Section */}
      <section className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-extrabold mb-6">About Us</h1>
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-xl font-bold mb-4">
              Independent business channel dedicated to providing <br />
              <span className="text-black">
                comprehensive news and updates.
              </span>
            </h2>
          </div>
          <div className="text-gray-700 space-y-4 text-[15px] leading-relaxed">
            <p>
              Suspendisse ac tellus diam ut faucibus feugiat sit consectetur
              morbi mattis mattis nunc, urna et non sagittis.
            </p>
            <p>
              Ultrices aliquam sociis diam, tempus pulvinar egestas senectus
              fermentum neque gravida condimentum nullam...
            </p>

            {/* Quote */}
            <div className="border-l-4 pl-4 italic text-gray-900">
              <p>
                “Risus id maecenas tempus, laoreet ac convallis quis porttitor
                pulvinar dolor leo ac eget nec imperdiet egestas nunc...”
              </p>
              <p className="mt-2 not-italic text-sm font-semibold text-gray-600">
                Matt Robinson
                <br />
                <span className="text-xs font-normal">CEO/Publisher</span>
              </p>
            </div>

            <p>
              Condimentum nullam donec et interdum et bibendum et quam magna ut
              at netus neque...
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-8 mt-12 text-center">
          <div>
            <div className="text-orange-500 text-3xl mb-2">📡</div>
            <p className="font-bold text-lg">1 million +</p>
            <p className="text-sm text-gray-600">active subscribers</p>
          </div>
          <div>
            <div className="text-orange-500 text-3xl mb-2">🧍‍♂️</div>
            <p className="font-bold text-lg">4 million</p>
            <p className="text-sm text-gray-600">monthly unique</p>
          </div>
          <div>
            <div className="text-orange-500 text-3xl mb-2">📰</div>
            <p className="font-bold text-lg">8 million</p>
            <p className="text-sm text-gray-600">monthly page views</p>
          </div>
        </div>
      </section>

      {/* Editorial Section */}
      <section className="max-w-6xl mx-auto mt-16 border-t pt-12">
        <h2 className="text-2xl font-extrabold mb-2">Editorial</h2>
        <p className="text-gray-600 mb-8 text-sm">
          Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
        </p>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {[
            {
              name: "Matt Robinson",
              role: "Editor-in-Chief",
              img: "/avatar1.jpg",
            },
            {
              name: "Jessica Heim",
              role: "Managing Editor",
              img: "/avatar2.jpg",
            },
            { name: "Anna Miles", role: "Senior Editor", img: "/avatar3.jpg" },
            { name: "John Hendrick", role: "Writer", img: "/avatar4.jpg" },
            { name: "Christine Hills", role: "Writer", img: "/avatar5.jpg" },
          ].map((member, i) => (
            <div key={i} className="flex items-center gap-4">
              <Image
                src={member.img}
                alt={member.name}
                width={56} // Tailwind w-14 = 14 * 4 = 56px
                height={56} // Tailwind h-14 = 56px
                className="rounded-full object-cover"
              />
              <div>
                <p className="font-bold">{member.name}</p>
                <p className="text-sm text-gray-600">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Events Section */}
      <section className="max-w-6xl mx-auto mt-16 border-t pt-12">
        <h2 className="text-2xl font-extrabold mb-2">Events</h2>
        <p className="text-gray-600 mb-8 text-sm">
          Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
        </p>
        <div className="grid sm:grid-cols-2 gap-8">
          {[
            {
              name: "Mary Ellen",
              role: "Director of Events",
              img: "/avatar6.jpg",
            },
            { name: "Tom Benson", role: "Event Manager", img: "/avatar7.jpg" },
          ].map((eventPerson, i) => (
            <div key={i} className="flex items-center gap-4">
              <Image
                src={eventPerson.img}
                alt={eventPerson.name}
                width={56} // w-14 = 14 * 4 = 56px
                height={56} // h-14 = 56px
                className="rounded-full object-cover"
              />
              <div>
                <p className="font-bold">{eventPerson.name}</p>
                <p className="text-sm text-gray-600">{eventPerson.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
