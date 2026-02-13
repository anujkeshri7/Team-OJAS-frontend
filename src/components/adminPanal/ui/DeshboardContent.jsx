const DashboardContent = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
    {[
      { label: "Total Members", value: "24", color: "from-cyan-500" },
      { label: "Active Events", value: "8", color: "from-blue-500" },
      { label: "Projects", value: "12", color: "from-purple-500" },
      { label: "Gallery Images", value: "156", color: "from-pink-500" },
    ].map((stat, i) => (
      <div
        key={i}
        className="bg-gradient-to-br from-[#0f1729] to-[#1a1f3a] border border-cyan-500/10 rounded-xl p-6 hover:border-cyan-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10"
      >
        <p className="text-gray-400 text-sm mb-2">{stat.label}</p>
        <h3 className={`text-3xl font-bold bg-gradient-to-r ${stat.color} to-blue-400 bg-clip-text text-transparent`}>
          {stat.value}
        </h3>
      </div>
    ))}
  </div>
);

export default DashboardContent;