const EventsContent = () => (
  <div className="bg-gradient-to-br from-[#0f1729] to-[#1a1f3a] border border-cyan-500/10 rounded-xl p-6">
    <h3 className="text-xl font-semibold mb-4">Upcoming Events</h3>
    <div className="space-y-3">
      {["Tech Meetup - Feb 20", "Workshop - Mar 5", "Conference - Mar 15"].map(
        (event, i) => (
          <div
            key={i}
            className="p-4 bg-[#0a0e27] rounded-lg border border-cyan-500/5 hover:border-cyan-500/20 transition-all"
          >
            <p className="font-medium">{event}</p>
            <p className="text-xs text-gray-400 mt-1">Click to edit</p>
          </div>
        )
      )}
    </div>
  </div>
);

export default EventsContent;