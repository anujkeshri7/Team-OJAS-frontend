import { Images, Calendar, MapPin, Users } from "lucide-react";
import { useState } from "react";

const events = [
  {
    id: 1,
    name: "Project Launch 2024",
    date: "Feb 10, 2024",
    location: "Tech Hub, Delhi",
    photos: 12,
    color: "from-cyan-500/20 to-blue-500/20",
    images: Array(12).fill(0).map((_, i) => `https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=400&h=400&crop=faces&fit=crop&dpr=1&random=${i}`),
  },
  {
    id: 2,
    name: "Team Outing",
    date: "Jan 25, 2024",
    location: "Manali, HP",
    photos: 18,
    color: "from-purple-500/20 to-pink-500/20",
    images: Array(18).fill(0).map((_, i) => `https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=400&h=400&crop=faces&fit=crop&dpr=1&random=${i}`),
  },
  {
    id: 3,
    name: "Conference 2024",
    date: "Jan 15, 2024",
    location: "Mumbai, MH",
    photos: 24,
    color: "from-orange-500/20 to-red-500/20",
    images: Array(24).fill(0).map((_, i) => `https://images.unsplash.com/photo-1540575467063-178f50002cbc?q=80&w=400&h=400&crop=faces&fit=crop&dpr=1&random=${i}`),
  },
  {
    id: 4,
    name: "Workshop Series",
    date: "Dec 20, 2023",
    location: "Bangalore, KA",
    photos: 15,
    color: "from-green-500/20 to-emerald-500/20",
    images: Array(15).fill(0).map((_, i) => `https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=400&h=400&crop=faces&fit=crop&dpr=1&random=${i}`),
  },
];

const GalleryContent = () => {
  const [selectedEvent, setSelectedEvent] = useState(events[0]);
  const [viewMode, setViewMode] = useState("grid"); // grid or list

  return (
    <div className="space-y-6">
      {/* Event Tabs */}
      <div className="bg-gradient-to-br from-[#0f1729] to-[#1a1f3a] border border-cyan-500/10 rounded-xl p-4">
        <h3 className="text-lg font-semibold text-white mb-4">Select Event</h3>
        <div className="flex flex-wrap gap-3 overflow-x-auto pb-2">
          {events.map((event) => (
            <button
              key={event.id}
              onClick={() => setSelectedEvent(event)}
              className={`px-4 py-2 rounded-lg whitespace-nowrap font-medium transition-all duration-300 ${
                selectedEvent.id === event.id
                  ? 'bg-cyan-500/30 border border-cyan-500/50 text-cyan-300'
                  : 'bg-slate-800/30 border border-slate-700/50 text-slate-300 hover:border-slate-600/50'
              }`}
            >
              {event.name}
            </button>
          ))}
        </div>
      </div>

      {/* Event Details */}
      <div className="bg-gradient-to-br from-[#0f1729] to-[#1a1f3a] border border-cyan-500/10 rounded-xl p-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
          <div className="space-y-3">
            <h2 className="text-3xl font-bold text-white">{selectedEvent.name}</h2>
            <div className="flex flex-col gap-2 text-slate-300">
              <div className="flex items-center gap-2">
                <Calendar size={18} className="text-cyan-400" />
                <span className="text-sm">{selectedEvent.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={18} className="text-cyan-400" />
                <span className="text-sm">{selectedEvent.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Images size={18} className="text-cyan-400" />
                <span className="text-sm">{selectedEvent.photos} Photos</span>
              </div>
            </div>
          </div>

          {/* View Mode Toggle */}
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode("grid")}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                viewMode === "grid"
                  ? 'bg-cyan-500/30 border border-cyan-500/50 text-cyan-300'
                  : 'bg-slate-800/30 border border-slate-700/50 text-slate-300 hover:border-slate-600/50'
              }`}
            >
              Grid
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                viewMode === "list"
                  ? 'bg-cyan-500/30 border border-cyan-500/50 text-cyan-300'
                  : 'bg-slate-800/30 border border-slate-700/50 text-slate-300 hover:border-slate-600/50'
              }`}
            >
              List
            </button>
          </div>
        </div>

        {/* Gallery Grid View */}
        {viewMode === "grid" && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {selectedEvent.images.map((img, i) => (
              <div
                key={i}
                className="group relative aspect-square rounded-lg overflow-hidden border border-cyan-500/10 hover:border-cyan-500/30 transition-all cursor-pointer"
              >
                <img
                  src={img}
                  alt={`${selectedEvent.name} ${i + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="bg-black/60 rounded-lg p-2">
                    <Images className="text-cyan-400" size={20} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Gallery List View */}
        {viewMode === "list" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {selectedEvent.images.map((img, i) => (
              <div
                key={i}
                className="group cursor-pointer rounded-lg overflow-hidden border border-cyan-500/10 hover:border-cyan-500/30 transition-all"
              >
                <div className="relative aspect-video bg-slate-800/30 overflow-hidden">
                  <img
                    src={img}
                    alt={`${selectedEvent.name} ${i + 1}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="bg-black/60 rounded-lg p-2">
                      <Images className="text-cyan-400" size={20} />
                    </div>
                  </div>
                </div>
                <div className="p-3 bg-slate-800/20">
                  <p className="text-sm text-slate-300">Photo #{i + 1}</p>
                  <p className="text-xs text-slate-500">{selectedEvent.date}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Event Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { icon: Images, label: "Total Photos", value: selectedEvent.photos },
          { icon: Calendar, label: "Event Date", value: selectedEvent.date.split(",")[0] },
          { icon: MapPin, label: "Location", value: selectedEvent.location.split(",")[0] },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-gradient-to-br from-[#0f1729] to-[#1a1f3a] border border-cyan-500/10 rounded-lg p-4"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-cyan-500/20 rounded-lg">
                <stat.icon size={20} className="text-cyan-400" />
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase">{stat.label}</p>
                <p className="text-lg font-semibold text-white">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GalleryContent;