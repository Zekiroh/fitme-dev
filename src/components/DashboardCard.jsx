import React from 'react';

const DashboardCard = ({ label, value, color }) => {
  return (
    <div className="bg-white shadow-md rounded-xl p-6 text-center">
      <h2 className={`text-2xl font-semibold ${color}`}>{value}</h2>
      <p className="text-gray-600 mt-1">{label}</p>
    </div>
  );
};

export default DashboardCard;
