import React from 'react';
import Navbar from '../components/Navbar';
import SummaryCard from '../components/SummaryCard';
import ActivityItem from '../components/ActivityItem';

const Dashboard = () => {
  return (
    <div
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/assets/background/home-banner.png')" }}
    >
      <Navbar />

      <section className="px-6 py-10 text-white">
        {/* Greeting Block */}
        <div className="bg-white/10 p-6 rounded-xl mb-10">
          <h2 className="text-2xl font-semibold mb-2">Welcome back, Coach!</h2>
          <p className="text-white/80 text-sm">Here’s what’s happening today in your gym.</p>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Side: Summary + Insights */}
          <div className="lg:col-span-2 space-y-6">

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <SummaryCard title="Total Members" value="120" icon="🧍" />
            <SummaryCard title="Attendance Today" value="38" icon="📅" />
            <SummaryCard title="Unread Reports" value="5" icon="🆘" />
            </div>

            {/* Coach Insights */}
            <div className="bg-white/10 p-6 rounded-xl">
              <h3 className="text-lg font-semibold mb-3 text-white">Coach Insights</h3>
              <ul className="text-sm text-white/80 space-y-2">
                <li>🏃‍♂️ 12 members improved their workout streaks this week</li>
                <li>📈 Progress tracking is up 18% since last week</li>
                <li>🧍 3 members haven’t checked in for 7+ days</li>
              </ul>
            </div>
          </div>

          {/* Right Side: Recent Activity */}
          <div className="bg-white/10 p-6 rounded-xl space-y-4">
            <h3 className="text-lg font-semibold text-white">Recent Activity</h3>
            <ActivityItem message="Heart Nepacina submitted a report" time="10 min ago" />
            <ActivityItem message="Brylle Villafuerte checked out at 12:00 PM" time="1 hour ago" />
            <ActivityItem message="Jeremie Canido checked in at 9:43 AM" time="3 hours ago" />
            <ActivityItem message="JC Diaz checked in at 9:42 AM" time="3 hours ago" />
            <ActivityItem message="Aaron Lescano updated his progress" time="Yesterday" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
