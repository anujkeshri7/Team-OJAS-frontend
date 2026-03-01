import React from "react";

export default function ContactUs() {
  return (
    <section className="relative bg-[#0B0F1A] py-16 overflow-hidden">



      <div className="max-w-6xl mx-auto px-6 relative z-10">

        {/* Heading */}
        <div className="text-center mb-20">
          <p className="text-cyan-400 uppercase tracking-widest text-sm mb-4">
            Get In Touch
          </p>

          <h2 className="text-5xl md:text-6xl font-black text-white">
            Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
              Us
            </span>
          </h2>

          <div className="w-24 h-[3px] bg-gradient-to-r from-cyan-400 to-blue-400 mx-auto mt-6 rounded-full" />
        </div>

        {/* Content */}
        <div className="grid md:grid-cols-2 gap-16">

          {/* Left Info */}
          <div className="space-y-8 text-gray-400 text-lg">

            <p>
              Have a project idea, collaboration proposal, or just want to connect?
              We'd love to hear from you.
            </p>

            <div className="space-y-4">
              <div>
                <p className="text-white font-semibold">Email</p>
                <p className="text-cyan-400">teamojas@nit.ac.in</p>
              </div>

              <div>
                <p className="text-white font-semibold">Location</p>
                <p>NIT Hamirpur, Himachal Pradesh</p>
              </div>
            </div>

          </div>

          {/* Right Form Card */}
          <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-3xl p-10 backdrop-blur-xl shadow-[0_0_40px_rgba(34,211,238,0.15)]">

            <form className="space-y-6">

              <div>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full bg-[#111827] border border-cyan-500/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400 transition"
                />
              </div>

              <div>
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full bg-[#111827] border border-cyan-500/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400 transition"
                />
              </div>

              <div>
                <textarea
                  rows="4"
                  placeholder="Your Message"
                  className="w-full bg-[#111827] border border-cyan-500/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400 transition resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold py-3 rounded-xl transition-all duration-300 hover:opacity-90 hover:shadow-[0_0_25px_rgba(34,211,238,0.4)]"
              >
                Send Message
              </button>

            </form>

          </div>

        </div>

      </div>
    </section>
  );
}