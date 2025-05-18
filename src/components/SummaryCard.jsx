import React from 'react';

const SummaryCard = ({ title, value, icon }) => {
  return (
    <div className="bg-white/10 shadow-md rounded-xl p-6 flex flex-col items-start text-white">
      <div className="text-3xl mb-2">{icon}</div>
      <h4 className="text-lg font-semibold mb-1">{title}</h4>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
};

export default SummaryCard;