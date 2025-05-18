import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Home = () => {
  return (
    <div
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/assets/background/home-banner.png')" }}
    >
      {/* Top Nav */}
      <Navbar />

      {/* Intro Section */}
      <section className="text-white text-center px-6 pt-10" style={{ marginTop: "20px" }}>
        <h2 className="text-4xl font-bold mb-4">Empower Your Gym Journey</h2>
        <p className="max-w-2xl mx-auto text-lg text-white/90 mb-6">
          This system is exclusively for coaches and administrators.
          Here you can track gym attendance, respond to customer assistance requests,
          and monitor member progress synced from the mobile app.
        </p>

        <p className="text-white/80 text-sm mb-2">Saturday, May 18 · Good day, Coach!</p>

        <a
          href="/dashboard"
          className="inline-block bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold px-8 py-3 rounded-full text-lg transition duration-300 shadow-lg hover:shadow-xl ring-2 ring-orange-300 hover:ring-red-400 focus:outline-none focus:ring-4 focus:ring-red-500"
          style={{ marginTop: "70px" }}
        >
          🚀 Open Dashboard
        </a>
      </section>

      {/* Navigation Tiles */}? 
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 px-6 text-white text-left">
        {/* Attendance Log */}
        <Link
          to="/"
          title="Go to Attendance Log"
          className="
            relative
            bg-white/10
            backdrop-blur-md
            p-6 lg:p-8 rounded-xl
            shadow-2xl
            border-2 border-white/30
            hover:border-white/60
            hover:scale-105
            transition duration-300
            flex flex-col items-center
            overflow-hidden
            animate-fade-in
            text-base
            group
            opacity-50 hover:opacity-100
          "
          style={{
            backgroundImage: "url('/assets/background/attendance-bg.png')",
            backgroundBlendMode: "overlay",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/5 transition duration-300 pointer-events-none rounded-xl" />
          <h4 className="relative text-lg font-extrabold mb-2 text-white drop-shadow-lg">
            📝 Attendance Log
          </h4>
          <p className="relative text-white text-sm font-medium drop-shadow">
            Record and view check-ins with date-stamped tracking.
          </p>
        </Link>

        {/* Assistance Reports */}
        <Link
          to="/"
          title="View customer assistance reports"
          className="
            relative
            bg-white/10
            backdrop-blur-md
            p-6 lg:p-8 rounded-xl
            shadow-2xl
            border-2 border-white/30
            hover:border-white/60
            hover:scale-105
            transition duration-300
            flex flex-col items-center
            overflow-hidden
            animate-fade-in
            text-base
            group
            opacity-50 hover:opacity-100
          "
          style={{
            backgroundImage: "url('/assets/background/attendance-bg.png')",
            backgroundBlendMode: "overlay",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/5 transition duration-300 pointer-events-none rounded-xl" />
          <h4 className="relative text-lg font-extrabold mb-2 text-white drop-shadow-lg">
            🆘 Assistance Reports
          </h4>
          <p className="relative text-white text-sm font-medium drop-shadow">
            View and respond to customer concerns from the mobile app.
          </p>
        </Link>

        {/* Monitor Progress */}
        <Link
          to="/"
          title="Monitor member fitness progress"
          className="
            relative
            bg-white/10
            backdrop-blur-md
            p-6 lg:p-8 rounded-xl
            shadow-2xl
            border-2 border-white/30
            hover:border-white/60
            hover:scale-105
            transition duration-300
            flex flex-col items-center
            overflow-hidden
            animate-fade-in
            text-base
            group
            opacity-50 hover:opacity-100
          "
          style={{
            backgroundImage: "url('/assets/background/attendance-bg.png')",
            backgroundBlendMode: "overlay",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/5 transition duration-300 pointer-events-none rounded-xl" />
          <h4 className="relative text-lg font-extrabold mb-2 text-white drop-shadow-lg">
            📊 Monitor Progress
          </h4>
          <p className="relative text-white text-sm font-medium drop-shadow">
            Track member performance and metrics in real-time.
          </p>
        </Link>
      </div>
      
      <div className="mt-12 text-white italic text-sm text-center max-w-xl mx-auto" style={{ marginTop: "30px" }}>
        “Since switching to FitMe, managing member progress and daily operations has been smoother than ever.”
        <br />
        <span className="italic text-white text-sm">
          — Coach TJ, LowCal Fitness Gym
        </span>
      </div>

    </div>
  );
};

export default Home;