import Image from "next/image";

const events = [
  {
    id: 1,
    category: "Hackathon",
    title: "Global AI Hackathon 2024",
    organizer: "TechCorp",
    date: "Feb 15-17, 2024",
    price: "Free",
    match: "95% Match",
    image: "/events/hackathon.jpg",
  },
  {
    id: 2,
    category: "Webinar",
    title: "Web3 Development Workshop",
    organizer: "BlockchainHub",
    date: "Feb 20, 2024",
    price: "$49",
    match: "88% Match",
    image: "/events/web3.jpg",
  },
  {
    id: 3,
    category: "Career Fair",
    title: "Tech Career Fair Spring 2024",
    organizer: "CareerBoost",
    date: "Mar 1, 2024",
    price: "Free",
    match: "92% Match",
    image: "/events/career-fair.jpg",
  },
  {
    id: 4,
    category: "Workshop",
    title: "UX Design Masterclass",
    organizer: "DesignLab",
    date: "Mar 5, 2024",
    price: "$79",
    match: "85% Match",
    image: "/events/ux-design.jpg",
  },
  {
    id: 5,
    category: "Conference",
    title: "AI & ML Summit 2024",
    organizer: "AI Global",
    date: "Apr 10, 2024",
    price: "$99",
    match: "90% Match",
    image: "/events/ai-ml-summit.jpg",
  },
  {
    id: 6,
    category: "Seminar",
    title: "Future of Blockchain",
    organizer: "CryptoWorld",
    date: "Apr 15, 2024",
    price: "$59",
    match: "87% Match",
    image: "/events/blockchain.jpg",
  }
];

export default function Events() {
  return (
    <div className="bg-gray-900 text-white min-h-screen p-6">
      <h2 className="text-2xl font-bold mb-4">Upcoming Events</h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {events.map((event) => (
          <div key={event.id} className="bg-gray-800 rounded-lg overflow-hidden text-sm">
            <Image src={event.image} alt={event.title} width={300} height={200} className="w-full" />
            <div className="p-3">
              <span className="bg-blue-600 text-xs uppercase px-2 py-1 rounded-md">{event.category}</span>
              <h3 className="text-md font-semibold mt-2">{event.title}</h3>
              <p className="text-xs text-gray-400">{event.organizer}</p>
              <p className="text-xs text-gray-400 mt-1">📅 {event.date}</p>
              <div className="flex justify-between items-center mt-2">
                <span className="text-yellow-400">⭐ {event.match}</span>
                <span className="text-white font-semibold">{event.price}</span>
              </div>
              <button className="mt-3 w-full bg-purple-600 hover:bg-purple-700 text-white py-1 rounded-md text-xs">Register Now</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
