const AnnouncementsContent = () => (
  <div className="bg-gradient-to-br from-[#0f1729] to-[#1a1f3a] border border-cyan-500/10 rounded-xl p-6">
    <h3 className="text-xl font-semibold mb-4">Latest Announcements</h3>
    <div className="space-y-3">
      {[
        "New workshop announced for next month",
        "Club meeting rescheduled to Friday",
        "Gallery updated with new photos",
      ].map((announcement, i) => (
        <div
          key={i}
          className="p-4 bg-[#0a0e27] rounded-lg border-l-4 border-cyan-500 hover:bg-cyan-500/5 transition-colors"
        >
          <p className="text-sm">{announcement}</p>
          <p className="text-xs text-gray-500 mt-2">2 hours ago</p>
        </div>
      ))}
    </div>
  </div>
);


export default AnnouncementsContent;