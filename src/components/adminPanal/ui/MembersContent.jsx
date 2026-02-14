const MembersContent = () => (
  <div className="bg-gradient-to-br from-[#0f1729] to-[#1a1f3a] border border-cyan-500/10 rounded-xl p-6">
    <h3 className="text-xl font-semibold mb-4">Team Members</h3>
    <div className="space-y-3">
      {["John Doe", "Jane Smith", "Mike Johnson"].map((name, i) => (
        <div
          key={i}
          className="flex items-center justify-between p-4 bg-[#0a0e27] rounded-lg hover:bg-cyan-500/5 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500"></div>
            <span>{name}</span>
          </div>
          <button className="px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded text-sm hover:bg-cyan-500/30 transition-colors">
            Edit
          </button>
        </div>
      ))}
    </div>
  </div>
);

export default MembersContent;