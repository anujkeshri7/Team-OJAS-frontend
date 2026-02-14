import { Users, Zap, Folders, Images, ArrowUpRight } from "lucide-react";

const DashboardContent = () => {
  const stats = [
    {
      label: "Total Members",
      value: "24",
      icon: Users,
      color: "from-cyan-500 to-blue-400",
      bgColor: "bg-cyan-500/10",
      trend: "+2 this month",
    },
    {
      label: "Active Events",
      value: "8",
      icon: Zap,
      color: "from-blue-500 to-cyan-400",
      bgColor: "bg-blue-500/10",
      trend: "+1 upcoming",
    },
    {
      label: "Projects",
      value: "12",
      icon: Folders,
      color: "from-purple-500 to-pink-400",
      bgColor: "bg-purple-500/10",
      trend: "+3 this quarter",
    },
    {
      label: "Gallery Images",
      value: "156",
      icon: Images,
      color: "from-pink-500 to-orange-400",
      bgColor: "bg-pink-500/10",
      trend: "+24 recently",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, i) => {
        const Icon = stat.icon;
        return (
          <div
            key={i}
            className="group bg-gradient-to-br from-[#0f1729] to-[#1a1f3a] border border-cyan-500/10 hover:border-cyan-500/30 rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10"
          >
            {/* Icon */}
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.bgColor} p-3 rounded-lg`}>
                <Icon size={24} className="text-cyan-400" />
              </div>
            </div>

            {/* Label */}
            <p className="text-slate-400 text-sm font-medium mb-2">{stat.label}</p>

            {/* Value */}
            <h3 className={`text-4xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-3`}>
              {stat.value}
            </h3>

            {/* Trend */}
            <div className="flex items-center gap-1 text-green-400 text-sm">
              <ArrowUpRight size={16} />
              <span>{stat.trend}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DashboardContent;