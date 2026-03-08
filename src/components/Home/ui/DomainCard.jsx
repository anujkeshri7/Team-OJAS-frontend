import { ArrowRight } from "lucide-react";

function DomainCard({ domain, index }) {
  return (
    <div
      className="group relative opacity-0"
      style={{
        animation: `slideUpFade 0.8s ease-out ${0.2 + index * 0.12}s forwards`,
      }}
    >
      {/* Card */}
      <div
        className={`
        relative 
        rounded-2xl 
        border ${domain.borderColor}
        bg-[#0E1424]/80 backdrop-blur
        p-6 sm:p-8
        h-full
        overflow-hidden 
        transition-all duration-300
        hover:-translate-y-2 
        hover:border-opacity-100
        hover:shadow-[0_20px_60px_rgba(0,0,0,0.6)]
        `}
      >
        {/* Soft Gradient Hover */}
        <div
          className={`
          absolute inset-0 
          bg-gradient-to-br ${domain.color}
          opacity-0 
          group-hover:opacity-[0.08] 
          transition-opacity duration-300
          `}
        />

        {/* Icon */}
        <div
          className={`
          relative z-10 
          w-7 h-7 sm:w-14 sm:h-14 
          rounded-xl
          flex items-center justify-center
          ${domain.accentBg} ${domain.textColor}
          border ${domain.borderColor}
          transition-all duration-300
          group-hover:scale-110
          `}
        >
          {domain.icon}
        </div>

        {/* Title */}
        <h3 className="relative z-10 mt-3 sm:mt-4 text-lg sm:text-xl font-semibold text-white">
          {domain.title}
        </h3>

        {/* Description */}
        <p className="relative z-10 mt-3 text-sm sm:text-base text-gray-400 leading-relaxed">
          {domain.desc}
        </p>

        {/* Accent Line */}
        {/* <div
          className={`
          relative z-10 
          mt-5 sm:mt-6 
          h-[3px] w-12 rounded-full
          bg-linear-to-r ${domain.color}
          transition-all duration-500
          group-hover:w-100
          `}
        /> */}

        {/* Corner Glow */}
        <div
          className={`
          absolute -top-10 -right-10 
          w-24 sm:w-32 h-24 sm:h-32
          bg-gradient-to-br ${domain.color}
          opacity-0 group-hover:opacity-20 
          blur-3xl
          transition-all duration-300
          `}
        />
      </div>
    </div>
  );
}

export default DomainCard;