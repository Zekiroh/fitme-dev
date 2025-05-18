import React from 'react';

const ActivityItem = ({ message, time }) => {
  return (
    <div className="flex items-center justify-between">
      <p className="text-sm text-white/90">{message}</p>
      <span className="text-xs text-white/60">{time}</span>
    </div>
  );
};

export default ActivityItem;