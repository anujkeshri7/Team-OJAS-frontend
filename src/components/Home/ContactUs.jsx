import React, { useEffect } from "react";
import emailjs from "@emailjs/browser";
import { useState } from "react";
export default function ContactUs() {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs.send(
      "team-ojas-service",
      "template_qz6m5ap",
      {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        to_email: "24bee014@nith.ac.in"
      },
      "-fXFIIIhFw6Br0kDw"
    )
      .then(() => {
        alert("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      })
      .catch(() => {
        alert("Failed to send message");
      });
  };


  return (
    <section className="relative bg-[#0B0F1A] py-20 overflow-hidden min-h-screen">

      {/* Background Glow */}
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl opacity-20 animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: "1s" }} />

      <div className="max-w-6xl mx-auto px-6 relative z-10">

        {/* Heading */}
        <div
          className="text-center mb-20"
          style={{ animation: "slideUpFade 0.8s ease-out" }}
        >
          <p className="text-cyan-400 uppercase tracking-widest text-sm mb-4 font-semibold">
            Get In Touch
          </p>

          <h2 className="text-5xl md:text-6xl font-black text-white">
            Contact{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-400">
              Us
            </span>
          </h2>

          <p className="mt-6 text-gray-400 max-w-2xl mx-auto text-lg">
            Whether you're a student at NIT Hamirpur with a project idea,
            looking to collaborate, or just curious about OJAS —
            we’d love to connect.
          </p>

          <div className="w-24 h-0.75 bg-linear-to-r from-cyan-400 to-blue-400 mx-auto mt-6 rounded-full" />
        </div>

        {/* Content */}
        <div
          className="grid md:grid-cols-2 gap-16 items-start"
          style={{ animation: "slideUpFade 0.8s ease-out 0.15s both" }}
        >

          {/* Left Info */}
          <div className="space-y-10 text-gray-400 text-lg"
          >

            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-white">
                Let's Build Something Together 
              </h3>

              <p>
                Have a project idea, collaboration proposal, or want to join
                our technical initiatives? Drop us a message — our team will
                get back to you soon.
              </p>
            </div>

            <div className="space-y-6">

              <div className="bg-[#111827] border border-cyan-500/20 p-6 rounded-2xl ">
                <p className="text-white font-semibold mb-1">Email</p>
                <p className="text-cyan-400">ojas.nimbus@nith.ac.in</p>
              </div>

              <div className="bg-[#111827] border md:border-blue-500/20 p-6 rounded-2xl ">
                <p className="text-white font-semibold mb-1">Location</p>
                <p>NIT Hamirpur, Himachal Pradesh</p>
              </div>

            </div>

          </div>

          {/* Right Form Card */}
          <div className="bg-linear-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-3xl p-10 backdrop-blur-xl shadow-[0_0_40px_rgba(34,211,238,0.15)]">

            <form className="space-y-6" onSubmit={handleSubmit}>

              <div>
                <input

                  type="text"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-[#111827] border border-cyan-500/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 transition"
                />
              </div>

              <div>
                <input

                  type="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-[#111827] border border-cyan-500/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 transition"
                />
              </div>

              <div>
                <textarea
                  rows="4"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-[#111827] border border-cyan-500/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 transition resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full   group relative px-10 py-4 rounded-xl bg-cyan-500 text-black font-bold 
            text-lg hover:bg-cyan-400 transition-all duration-300
            shadow-[0_0_30px_rgba(34,211,238,0.5)] hover:shadow-[0_0_40px_rgba(34,211,238,0.8)]
            overflow-hidden"

              >
                Send Message
              </button>

            </form>

          </div>

        </div>

      </div>

      {/* Animation Keyframe */}
      <style>{`
        @keyframes slideUpFade {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

    </section>
  );
}